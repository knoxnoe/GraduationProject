import { FFmpeg } from '@ffmpeg/ffmpeg';
import { Button } from 'antd';
import {
  useState,
  useEffect,
  SetStateAction,
  Dispatch,
  forwardRef,
  useImperativeHandle,
  useCallback,
  useRef,
} from 'react';
import ReactFlow, {
  ReactFlowProvider,
  MiniMap,
  Controls,
  applyNodeChanges,
  applyEdgeChanges,
  addEdge,
  Background,
  updateEdge,
  MarkerType,
  ReactFlowInstance,
} from 'react-flow-renderer';
import NodeProvider from './nodesProvider';
import styles from './index.module.less';
import { EditNodeTypes, EditNodeType } from './constants';

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

type IData = {
  // 节点显示名称
  label: string;
  // 节点参数信息 form.getFieldsValue
  params: any;
  // 节点构造出来的命令
  command: string;
  // 临时文件名
  temp_name: string;
};

const initialNodes = Object.entries(EditNodeType).map(([k, v], idx) => ({
  id: `${idx}`,
  type: k,
  data: { label: v.label },
  position: { x: 200 * idx, y: 350 },
}));

const initialEdges = [
  {
    id: 'e1-2',
    source: '1',
    target: '2',
    label: 'styled label',
    labelStyle: { fill: 'red', fontWeight: 700 },
    markerEnd: {
      type: MarkerType.ArrowClosed,
    },
  },
  { id: 'e2-3', source: '2', target: '3', animated: true },
];

let id = 0;
const getId = () => `dndnode_${id++}`;

const EditManage = forwardRef((props: IProps, ref) => {
  const { ffmpegCli, setParameter, parameter, setStep } = props;

  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState([]);
  const instanceWrapper = useRef<HTMLDivElement | null>(null);
  const [DAGInstance, setReactFlowInstance] =
    useState<ReactFlowInstance<any, any>>();
  const edgeUpdateSuccessful = useRef(true);

  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [setNodes]
  );
  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    [setEdges]
  );

  const onConnect = useCallback(
    (connection) => setEdges((eds) => addEdge(connection, eds)),
    [setEdges]
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event: {
      preventDefault: () => void;
      dataTransfer: { getData: (arg0: string) => any };
      clientX: number;
      clientY: number;
    }) => {
      event.preventDefault();

      if (DAGInstance) {
        const reactFlowBounds =
          instanceWrapper?.current?.getBoundingClientRect();
        const type = event.dataTransfer.getData('node/type');
        const name = event.dataTransfer.getData('node/name');

        // check if the dropped element is valid
        if (typeof type === 'undefined' || !type) {
          return;
        }

        const position = DAGInstance.project({
          x: event.clientX - (reactFlowBounds?.left ?? 0),
          y: event.clientY - (reactFlowBounds?.top ?? 0),
        });
        const newNode = {
          id: getId(),
          type,
          position,
          data: { label: `${type} node`, name: name },
        };

        setNodes((nds) => nds.concat(newNode));
      }
    },
    [DAGInstance]
  );

  const onEdgeUpdateStart = useCallback(() => {
    edgeUpdateSuccessful.current = false;
  }, []);

  const onEdgeUpdate = useCallback((oldEdge, newConnection) => {
    edgeUpdateSuccessful.current = true;
    setEdges((els) => updateEdge(oldEdge, newConnection, els));
  }, []);

  const onEdgeUpdateEnd = useCallback((_, edge) => {
    if (!edgeUpdateSuccessful.current) {
      setEdges((eds) => eds.filter((e) => e.id !== edge.id));
    }

    edgeUpdateSuccessful.current = true;
  }, []);

  return (
    <>
      <div className={styles.edit_manage}>
        <ReactFlowProvider>
          <div className={styles.flow_wrapper} ref={instanceWrapper}>
            <ReactFlow
              nodes={nodes}
              edges={edges}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              onEdgeUpdate={onEdgeUpdate}
              onEdgeUpdateStart={onEdgeUpdateStart}
              onEdgeUpdateEnd={onEdgeUpdateEnd}
              onConnect={onConnect}
              onInit={(instance) => setReactFlowInstance(instance)}
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
        <Button type="primary" onClick={() => {}}>
          处理
        </Button>
      </div>
    </>
  );
});

export default EditManage;
