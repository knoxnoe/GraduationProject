import { RESOURCE_PREFIX } from '@/constants/order';
import { FFmpeg } from '@ffmpeg/ffmpeg';
import { Button } from 'antd';
import {
  Dispatch,
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
} from 'react-flow-renderer';
import { useDAGStore } from '../../states/store';
import { EditNodeTypes } from './constants';
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
  // 删除节点
  onDelete: (id: string) => void;
}

export interface IEdgeData {}

export type AtomNode = Node<INodeData>;
export type AtomEdge = Edge<IEdgeData>;

const EditManage = (props: IProps) => {
  const { ffmpegCli, setParameter, parameter, setStep } = props;

  const getNewNodeId = useDAGStore((state) => state.getNewNodeId);
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
      console.log(changes);
      setEdges((eds) => applyEdgeChanges(changes, eds));
    },
    [setEdges]
  );

  const onConnect = useCallback(
    (connection: Edge<any> | Connection) =>
      setEdges((eds) => addEdge(connection, eds)),
    [setEdges]
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onNodeDelete = (node_id?: string) => {
    const _nodes = DAGInstance?.getNodes();
    setNodes([...(_nodes?.filter((node) => node.id !== node_id) ?? [])]);
  };

  const createNode = (type, position) => {
    const unique_id = getNewNodeId();
    const newNode: AtomNode = {
      id: unique_id,
      type,
      position,
      data: {
        label: `${type} NODE`,
        resource_name: `${RESOURCE_PREFIX}${unique_id}`,
        params: {},
        command: undefined,
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

  const onEdgeUpdate = useCallback((oldEdge, newConnection) => {
    edgeUpdateSuccessful.current = true;
    console.log(oldEdge, newConnection);
    setEdges((els) => updateEdge(oldEdge, newConnection, els));
  }, []);

  const onEdgeUpdateEnd = useCallback((_, edge) => {
    if (!edgeUpdateSuccessful.current) {
      setEdges((eds) => eds.filter((e) => e.id !== edge.id));
    }
    edgeUpdateSuccessful.current = true;
  }, []);

  const coreRun = () => {};

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
              onInit={(instance) => setDAGInstance(instance)}
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
