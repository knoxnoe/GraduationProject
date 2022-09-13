import { DeleteOutlined } from '@ant-design/icons';
import { FC, ReactNode } from 'react';
import { Handle, NodeProps, Position } from 'react-flow-renderer';
import { INodeData } from '..';
import styles from './node.module.less';

export type NodeWithData = NodeProps<INodeData>;
interface IProps extends NodeWithData {
  children: ReactNode;
  targetHandle?: boolean;
  sourceHandle?: boolean;
}

const BasicNode: FC<IProps> = (props) => {
  const { children, targetHandle = true, sourceHandle = true, data } = props;
  return (
    <>
      {targetHandle && (
        <Handle type="target" position={Position.Left} style={{ top: 42 }} />
      )}
      {sourceHandle && (
        <Handle type="source" position={Position.Right} style={{ top: 42 }} />
      )}
      <div className={styles.custom_node__wrapper}>
        <div className={styles.custom_node__delete}>
          <DeleteOutlined color="red" onClick={() => data.onDelete(props.id)} />
        </div>
        {children}
      </div>
    </>
  );
};

export default BasicNode;
