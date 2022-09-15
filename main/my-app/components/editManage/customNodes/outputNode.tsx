import { Button, Drawer, Form, Input } from 'antd';
import { FC, useState } from 'react';
import BasicNode, { NodeWithData } from './node';

const { Item } = Form;

const OutputNode: FC<NodeWithData> = (props) => {
  const { data } = props;
  const { label } = data;
  const [visible, setVisible] = useState(false);
  const [$form] = Form.useForm();

  const handleProcessParams = (values: any) => {
    console.log('Success:', values);
    data.params = values;
  };

  const downloadOutput = () => {
    // const data = ffmpegCli.current.FS('readFile', `output.${parameter?.type}`);
    // const url = URL.createObjectURL(
    //   new Blob([data.buffer], { type: 'video/x-flv' })
    // );
    // let a = document.createElement('a');
    // a.download = 'xxxx';
    // a.style.display = 'none';
    // a.href = url;
    // document.body.appendChild(a);
    // a.click();
    // document.body.removeChild(a);
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
