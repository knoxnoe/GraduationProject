import {
  AtomEdge,
  AtomNode,
  IEdgeData,
  INodeData
} from '@/components/editManage/index';
import { FFmpeg } from '@ffmpeg/ffmpeg';
import { UploadFile } from 'antd';
import { ReactFlowInstance } from 'react-flow-renderer';
import create from 'zustand';

interface IDAGStore {
  nodeId: number;
  $DAG: ReactFlowInstance<INodeData, IEdgeData> | null;
  nodes: AtomNode[];
  edges: AtomEdge[];
  init$DAG: (instance: ReactFlowInstance<INodeData, IEdgeData>) => void;
  createUniqueNodeID: () => string;
}

export const useDAGStore = create<IDAGStore>()((set, get) => ({
  nodeId: -1,
  $DAG: null,
  nodes: [],
  edges: [],
  init$DAG: (instance) => set((state) => ({ $DAG: instance })),
  // 创建一个唯一的node id
  createUniqueNodeID: () => {
    set((state) => ({ nodeId: state.nodeId + 1 }));
    return `${get().nodeId}`;
  },
}));


// File global store
interface IFileStore {
  files: UploadFile<any>[];
  updateFiles: (files: UploadFile<any>[]) => void;
  count: number;
  addCount: () => void;
}

export const useFileStore = create<IFileStore>()((set) => ({
  files: [],
  count: 0,
  updateFiles: (files) => set((state) => ({ files: [...files] })),
  addCount: () => set((state) => ({ count: state.count + 1 })),
}));


// FFmpeg store
interface IFFmpegStore {
  $FFmpeg: FFmpeg | null,
  init$FFmpeg: (instance: FFmpeg) => void;
}

export const useFFmpeg = create<IFFmpegStore>()((set) => ({
  $FFmpeg: null,
  init$FFmpeg: (instance) => set((state) => ({$FFmpeg: instance})) 
}));