import { RESOURCE_PREFIX } from '@/constants/order';
import { FFmpeg } from '@ffmpeg/ffmpeg';
import { Button, message } from 'antd';
import {
  Dispatch,
  DragEvent,
  MouseEvent,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import ReactFlow, {
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  Background,
  Connection,
  Controls,
  Edge,
  EdgeChange,
  MiniMap,
  Node,
  NodeChange,
  ReactFlowInstance,
  ReactFlowProvider,
  updateEdge,
  XYPosition,
} from 'react-flow-renderer';
import { useDAGStore } from '../../states/store';
import { EditNodeTypes, EDIT_NODE_TYPE } from './constants';
import styles from './index.module.less';
import NodeProvider from './nodesProvider';

interface IProps {
  ffmpegCli: FFmpeg | null;
  parameter: any;
  setParameter: Dispatch<SetStateAction<any>>;
  setStep: Dispatch<SetStateAction<number>>;
}

interface Option {
  value: string | number;
  label: string;
  children?: Option[];
}

export interface INodeData {
  // 节点显示名称
  label: string;
  // 节点参数信息 form.getFieldsValue
  params: Record<string, any>;
  // 节点构造出来的命令
  command: string | undefined;
  // 资源名称
  resource_name: string;
  // next 节点
  nextIds: string[] | null;
  // prev 节点
  prevIds: string[] | null;
  // 删除节点
  onDelete: (id: string) => void;
}

export interface IEdgeData {}

export type AtomNode = Node<INodeData>;
export type AtomEdge = Edge<IEdgeData>;

const EditManage = (props: IProps) => {
  const { ffmpegCli, setParameter, parameter, setStep } = props;

  const createUniqueNodeID = useDAGStore((state) => state.createUniqueNodeID);
  const init$DAG = useDAGStore((state) => state.init$DAG);

  const [nodes, setNodes] = useState<AtomNode[]>([]);
  const [edges, setEdges] = useState<AtomEdge[]>([]);
  const instanceWrapper = useRef<HTMLDivElement | null>(null);
  const [DAGInstance, setDAGInstance] =
    useState<ReactFlowInstance<INodeData, IEdgeData>>();
  const edgeUpdateSuccessful = useRef(true);

  useEffect(() => {
    if (DAGInstance) {
      init$DAG(DAGInstance);
    }
  }, [DAGInstance]);

  const onNodesChange = useCallback(
    (changes: NodeChange[]) =>
      setNodes((nds) => applyNodeChanges(changes, nds)),
    [setNodes]
  );
  const onEdgesChange = useCallback(
    (changes: EdgeChange[]) => {
      setEdges((eds) => applyEdgeChanges(changes, eds));
    },
    [setEdges]
  );

  const onConnect = useCallback(
    (connection: Edge<any> | Connection) => {
      console.log(connection);
      updateNodeNextWithPrev(connection.source, connection.target);
      setEdges((eds) => addEdge(connection, eds));
    },
    [setEdges, DAGInstance]
  );

  const updateNodeNextWithPrev = (
    sourceId: string | null,
    targetId: string | null,
    add: boolean = true
  ) => {
    if (targetId && sourceId) {
      let sourceData = DAGInstance?.getNode(sourceId)?.data;
      let targetData = DAGInstance?.getNode(targetId)?.data;
      console.log(sourceData, targetData);
      if (sourceData && targetData) {
        if (add) {
          sourceData.nextIds?.push(targetId);
          targetData.prevIds?.push(sourceId);
        } else {
          sourceData.nextIds =
            sourceData.nextIds?.filter((id) => id !== targetId) ?? null;
          targetData.prevIds =
            targetData.prevIds?.filter((id) => id !== sourceId) ?? null;
        }
      }
    }
  };

  const onDragOver = useCallback((event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onNodeDelete = (node_id?: string) => {
    const _nodes = DAGInstance?.getNodes();
    setNodes([...(_nodes?.filter((node) => node.id !== node_id) ?? [])]);
  };

  const createNode = (type: EDIT_NODE_TYPE, position: XYPosition) => {
    const unique_id = createUniqueNodeID();
    const newNode: AtomNode = {
      id: unique_id,
      type,
      position,
      data: {
        label: `${type} node`,
        resource_name: `${RESOURCE_PREFIX}${unique_id}`,
        params: {},
        command: undefined,
        nextIds: type === EDIT_NODE_TYPE.Output ? null : [],
        prevIds: type === EDIT_NODE_TYPE.Input ? null : [],
        onDelete: onNodeDelete,
      },
    };
    setNodes((nds) => nds.concat(newNode));
  };

  const onDrop = (event: {
    preventDefault: () => void;
    dataTransfer: { getData: (arg0: string) => any };
    clientX: number;
    clientY: number;
  }) => {
    event.preventDefault();

    if (DAGInstance) {
      const reactFlowBounds = instanceWrapper?.current?.getBoundingClientRect();
      const type = event.dataTransfer.getData('node/type');

      // check if the dropped element is valid
      if (typeof type === 'undefined' || !type) {
        return;
      }

      const position = DAGInstance.project({
        x: event.clientX - (reactFlowBounds?.left ?? 0),
        y: event.clientY - (reactFlowBounds?.top ?? 0),
      });
      createNode(type, position);
    }
  };

  const onEdgeUpdateStart = useCallback(() => {
    edgeUpdateSuccessful.current = false;
  }, []);

  const onEdgeUpdate = useCallback(
    (oldEdge: Edge, newConnection: Connection) => {
      edgeUpdateSuccessful.current = true;
      console.log(oldEdge, newConnection);
      setEdges((els) => updateEdge(oldEdge, newConnection, els));
    },
    []
  );

  const onEdgeUpdateEnd = useCallback(
    (_: MouseEvent, edge: Edge) => {
      if (!edgeUpdateSuccessful.current) {
        console.log(edge);
        updateNodeNextWithPrev(edge.source, edge.target, false);
        setEdges((eds) => eds.filter((e) => e.id !== edge.id));
      }
      edgeUpdateSuccessful.current = true;
    },
    [DAGInstance]
  );

  const coreRun = () => {
    const nodes = DAGInstance?.getNodes();
    const edges = DAGInstance?.getEdges();

    // 是否有输出和输入
    let inId: string[] = [],
      outId: string[] = [];
    nodes?.forEach((n) => {
      if (n.type === EDIT_NODE_TYPE.Input) {
        inId.push(n.id);
      }
      if (n.type === EDIT_NODE_TYPE.Output) {
        outId.push(n.id);
      }
    });
    if (!inId.length || !outId.length) {
      message.warn('检测任务图中是否存在输入、输出节点!');
    }

    //
  };

  return (
    <>
      <div className={styles.edit_manage}>
        <Button
          onClick={() => {
            console.log(DAGInstance?.getEdges());
            console.log(DAGInstance?.getNodes());
          }}
        >
          get All
        </Button>
        <ReactFlowProvider>
          <div className={styles.flow_wrapper} ref={instanceWrapper}>
            <ReactFlow
              nodes={nodes}
              edges={edges}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              onNodesDelete={(nodes) => console.log('onNodesDelete', nodes)}
              onEdgeUpdate={onEdgeUpdate}
              onEdgeUpdateStart={onEdgeUpdateStart}
              onEdgeUpdateEnd={onEdgeUpdateEnd}
              onConnect={onConnect}
              onInit={(instance) => {
                console.log('cccc----------');
                setDAGInstance(instance);
              }}
              onDrop={onDrop}
              onDragOver={onDragOver}
              nodeTypes={EditNodeTypes}
            >
              <Background />
              <MiniMap />
              <Controls />
            </ReactFlow>
          </div>
          <div className={styles.node_provider}>
            <NodeProvider></NodeProvider>
          </div>
        </ReactFlowProvider>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Button style={{ margin: '8px 8px' }} onClick={() => setStep(0)}>
          上一步
        </Button>
        <Button type="primary" onClick={() => coreRun()}>
          处理
        </Button>
      </div>
    </>
  );
};

export default EditManage;
