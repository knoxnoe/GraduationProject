import CompressNode from './customNodes/compressNode';
import CutNode from './customNodes/cutNode';
import ExtractNode from './customNodes/extractNode';
import InputNode from './customNodes/inputNode';
import MergeNode from './customNodes/mergeNode';
import OutputNode from './customNodes/outputNode';
import TransformNode from './customNodes/transformNode';

export enum EDIT_NODE_TYPE {
  Transform = 'transform',
  Cut = 'cut',
  Merge = 'merge',
  Extract = 'extract',
  Compress = 'compress',
  Output = 'out',
  Input = 'in',
}

export const EditNodeType = {
  [EDIT_NODE_TYPE.Input]: {
    value: EDIT_NODE_TYPE.Input,
    label: '输入节点',
    render: InputNode,
  },
  [EDIT_NODE_TYPE.Extract]: {
    value: EDIT_NODE_TYPE.Extract,
    label: '抽取节点',
    render: ExtractNode,
  },
  [EDIT_NODE_TYPE.Cut]: {
    value: EDIT_NODE_TYPE.Cut,
    label: '裁剪节点',
    render: CutNode,
  },
  [EDIT_NODE_TYPE.Merge]: {
    value: EDIT_NODE_TYPE.Merge,
    label: '合并节点',
    render: MergeNode,
  },
  [EDIT_NODE_TYPE.Compress]: {
    value: EDIT_NODE_TYPE.Compress,
    label: '合并节点',
    render: CompressNode,
  },
  [EDIT_NODE_TYPE.Transform]: {
    value: EDIT_NODE_TYPE.Transform,
    label: '转换节点',
    render: TransformNode,
  },
  [EDIT_NODE_TYPE.Output]: {
    value: EDIT_NODE_TYPE.Output,
    label: '输出节点',
    render: OutputNode,
  },
};

export const EditNodeTypes = {
  [EDIT_NODE_TYPE.Cut]: CutNode,
  [EDIT_NODE_TYPE.Merge]: MergeNode,
  [EDIT_NODE_TYPE.Transform]: TransformNode,
  [EDIT_NODE_TYPE.Extract]: ExtractNode,
  [EDIT_NODE_TYPE.Compress]: CompressNode,
  [EDIT_NODE_TYPE.Input]: InputNode,
  [EDIT_NODE_TYPE.Output]: OutputNode,
};
