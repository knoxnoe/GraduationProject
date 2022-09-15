import { ORIGIN_RESOURCE_PREFIX, RESOURCE_PREFIX } from '@/constants/order';
import { Divider, Tooltip } from 'antd';
import { DragEvent } from 'react';
import { useFileStore } from 'states/store';
import { EDIT_NODE_TYPE } from './constants';
import styles from './index.module.less';

const NodeProvider = () => {
  const files = useFileStore((state) => state.files);

  const onDragStart = (
    event: DragEvent<HTMLDivElement>,
    nodeType: EDIT_NODE_TYPE,
    label: string,
    resource_name?: string
  ) => {
    event.dataTransfer.setData('node/type', nodeType);
    event.dataTransfer.setData('node/label', label);
    resource_name &&
      event.dataTransfer.setData('node/resource_name', resource_name);

    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <aside>
      <div style={{ padding: '8px 0px' }}>拖拽节点进行任务拓扑</div>
      <Divider orientation="left">输入节点</Divider>
      <div>
        {files.map((file, idx) => (
          <Tooltip title={file.name} key={idx}>
            <div
              className={`${styles.flow_node} ${styles.input_node}`}
              onDragStart={(event) =>
                onDragStart(
                  event,
                  EDIT_NODE_TYPE.Input,
                  file.name,
                  `${ORIGIN_RESOURCE_PREFIX}${idx}`
                )
              }
              draggable
            >
              {`${RESOURCE_PREFIX}${idx}`}
            </div>
          </Tooltip>
        ))}
      </div>
      <Divider orientation="left">处理节点</Divider>
      <div
        className={styles.flow_node}
        onDragStart={(event) =>
          onDragStart(event, EDIT_NODE_TYPE.Transform, 'TransForm节点')
        }
        draggable
      >
        TransForm Node
      </div>
      <div
        className={styles.flow_node}
        onDragStart={(event) =>
          onDragStart(event, EDIT_NODE_TYPE.Cut, 'Cut节点')
        }
        draggable
      >
        CUT Node
      </div>
      <div
        className={styles.flow_node}
        onDragStart={(event) =>
          onDragStart(event, EDIT_NODE_TYPE.Extract, 'Extract节点')
        }
        draggable
      >
        Extract Node
      </div>
      <div
        className={styles.flow_node}
        onDragStart={(event) =>
          onDragStart(event, EDIT_NODE_TYPE.Merge, 'Merge节点')
        }
        draggable
      >
        Merge Node
      </div>
      <div
        className={styles.flow_node}
        onDragStart={(event) =>
          onDragStart(event, EDIT_NODE_TYPE.Compress, 'Compress节点')
        }
        draggable
      >
        Compress Node
      </div>
      <Divider orientation="left">输出节点</Divider>
      <div
        className={styles.flow_node}
        onDragStart={(event) =>
          onDragStart(event, EDIT_NODE_TYPE.Output, 'Output节点')
        }
        draggable
      >
        输出节点
      </div>
    </aside>
  );
};
export default NodeProvider;
