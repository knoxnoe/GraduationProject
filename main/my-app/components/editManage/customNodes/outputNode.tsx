import { RESOURCE_PREFIX } from '@/constants/order';
import { Button, Drawer, Form, Input, message } from 'antd';
import { FC, useState } from 'react';
import { useFFmpeg } from 'states/store';
import BasicNode, { NodeWithData } from './node';

const { Item } = Form;

const OutputNode: FC<NodeWithData> = (props) => {
  const { data } = props;
  const { label } = data;
  const [visible, setVisible] = useState(false);
  const [$form] = Form.useForm();
  const FFmpeg = useFFmpeg((state) => state.$FFmpeg)

  const handleProcessParams = (values: any) => {
    data.params = values;
    setVisible(false);
  };

  const downloadOutput = () => {

    const prevId = data.prevIds?.[0];
    if(prevId === undefined) {
      message.warn("请连接输出节点");
      return;
    }

    const output = FFmpeg?.FS('readFile', `${RESOURCE_PREFIX}${prevId}.mp4`);
    if(!output) {
      message.error("文件输出失败！！！")
      return;
    }
    
    const url = URL.createObjectURL(
      new Blob([output.buffer])
    );
    let a = document.createElement('a');
    a.download = `${data.params.type}.mp4`;
    a.style.display = 'none';
    a.href = url;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <>
      <BasicNode sourceHandle={false} {...props}>
        <Button onClick={() => setVisible(true)}>{label}</Button>
        <Drawer
          title="资源文件输出定义"
          placement="right"
          onClose={() => setVisible(false)}
          size="large"
          visible={visible}
          extra={
            <Button type="primary" onClick={() => $form.submit()}>
              确认
            </Button>
          }
        >
          <Form
            name="basic"
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 20 }}
            onFinish={handleProcessParams}
            form={$form}
          >
            <Item
              label="文件名称"
              name="type"
              initialValue={'av_merge'}
              rules={[{ required: true, message: '不能为空' }]}
            >
              <Input></Input>
            </Item>
          </Form>
          <Button onClick={() => downloadOutput()}>下载</Button>
        </Drawer>
      </BasicNode>
    </>
  );
};

export default OutputNode;
