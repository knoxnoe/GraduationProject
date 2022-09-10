import { EDIT_NODE_TYPE } from '@/components/editManage/constants';
import { UploadFile } from 'antd';
import create from 'zustand';

interface IDAGStore {
  nodes: any[];
  edges: any[];
}

export const useDAGStore = create<IDAGStore>()((set) => ({
  nodes: [],
  edges: [],
}));

//

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
