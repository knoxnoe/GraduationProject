import { Button, Descriptions, Drawer } from 'antd';
import { FC, useCallback, useMemo, useState } from 'react';
import { Handle, HandleProps, NodeProps, Position } from 'react-flow-renderer';
import { useFileStore } from 'states/store';
import BasicNode from './node';

const InputNode: FC<NodeProps> = (props) => {
  const { data } = props;
  const [visible, setVisible] = useState(false);
  const files = useFileStore((state) => state.files);

  const idx = useMemo(() => Number(data?.name?.split('_')[1] ?? 0), [data]);
  const curFile = useMemo(() => files?.[idx], [files, idx]);

  const showDrawer = () => {
    setVisible(true);
    console.log(idx);
    console.log(files);
  };

  const onClose = () => {
    setVisible(false);
  };

  return (
    <>
      <BasicNode targetHandle={false}>
        <Button onClick={() => showDrawer()}>{data.name ?? data.label}</Button>
        <Drawer
          title="输入信息"
          size="large"
          placement="right"
          onClose={onClose}
          visible={visible}
        >
          <Descriptions
            bordered
            title="资源元信息"
            size="small"
            layout="horizontal"
            column={1}
          >
            <Descriptions.Item label="文件名称">
              {curFile?.name}
            </Descriptions.Item>
            <Descriptions.Item label="大小">{`${curFile?.size} Byte`}</Descriptions.Item>
            <Descriptions.Item label="资源类型">
              {curFile?.type}
            </Descriptions.Item>
          </Descriptions>
        </Drawer>
      </BasicNode>
    </>
  );
};

export default InputNode;
