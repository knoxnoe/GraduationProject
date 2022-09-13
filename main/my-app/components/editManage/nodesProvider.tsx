import { RESOURCE_PREFIX } from '@/constants/order';
import { Divider } from 'antd';
import { DragEvent } from 'react';
import { useFileStore } from 'states/store';
import { EDIT_NODE_TYPE } from './constants';
import styles from './index.module.less';

const NodeProvider = () => {
  const files = useFileStore((state) => state.files);

  const onDragStart = (
    event: DragEvent<HTMLDivElement>,
    nodeType: EDIT_NODE_TYPE
  ) => {
    event.dataTransfer.setData('node/type', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <aside>
      <div style={{ padding: '8px 0px' }}>拖拽节点进行任务拓扑</div>
      <Divider orientation="left">输入节点</Divider>
      <div>
        {files.map((_, idx) => (
          <div
            key={idx}
            className={`${styles.flow_node} ${styles.input_node}`}
            onDragStart={(event) => onDragStart(event, EDIT_NODE_TYPE.Input)}
            draggable
          >
            {`${RESOURCE_PREFIX}${idx}`}
          </div>
        ))}
      </div>
      <Divider orientation="left">处理节点</Divider>
      <div
        className={styles.flow_node}
        onDragStart={(event) => onDragStart(event, EDIT_NODE_TYPE.Transform)}
        draggable
      >
        TransForm Node
      </div>
      <div
        className={styles.flow_node}
        onDragStart={(event) => onDragStart(event, EDIT_NODE_TYPE.Cut)}
        draggable
      >
        CUT Node
      </div>
      <div
        className={styles.flow_node}
        onDragStart={(event) => onDragStart(event, EDIT_NODE_TYPE.Extract)}
        draggable
      >
        Extract Node
      </div>
      <div
        className={styles.flow_node}
        onDragStart={(event) => onDragStart(event, EDIT_NODE_TYPE.Merge)}
        draggable
      >
        Merge Node
      </div>
      <Divider orientation="left">输出节点</Divider>
      <div
        className={styles.flow_node}
        onDragStart={(event) => onDragStart(event, EDIT_NODE_TYPE.Output)}
        draggable
      >
        输出节点
      </div>
    </aside>
  );
};
export default NodeProvider;
