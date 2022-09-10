import {
  Button,
  Drawer,
  Form,
  InputNumber,
  Radio,
  Segmented,
  TimePicker,
} from 'antd';
import { FC, useState } from 'react';
import { NodeProps } from 'react-flow-renderer';
import BasicNode from './node';

const { Item } = Form;
//ffmpeg -i input1.mp4 -i input2.mp4 -i input3.mp4 -lavfi hstack=inputs=3 output.mp4

const merge_type = [
  { label: '音频视频合并', value: 'av_merge' },
  { label: '画面横向', value: 'horizontal_merge' },
  { label: '画面纵向', value: 'vertical_merge' },
  { label: '网格合并', value: 'grid_merge' },
];

const MergeNode: FC<NodeProps> = (props) => {
  const { data } = props;
  const [$form] = Form.useForm();
  const [visible, setVisible] = useState(false);

  const [flags, setFlags] = useState({
    time_range: false,
    screen_params: false,
  });

  const handleProcessParams = (values: any) => {
    console.log('Success:', values);
  };

  return (
    <>
      <BasicNode>
        <Button onClick={() => setVisible(true)}>{data.label}</Button>
        <Drawer
          title="合并参数"
          placement="right"
          size="large"
          onClose={() => setVisible(false)}
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
              label="合并方式"
              name="type"
              initialValue={'av_merge'}
              rules={[{ required: true, message: '不能为空' }]}
            >
              <Segmented options={merge_type} />
            </Item>
            <Item label="画面截取">
              <Radio.Group
                value={flags.screen_params}
                buttonStyle="solid"
                size="small"
                onChange={(e) =>
                  setFlags({ ...flags, screen_params: Boolean(e.target.value) })
                }
              >
                <Radio.Button value={false}>关闭</Radio.Button>
                <Radio.Button value={true}>开启</Radio.Button>
              </Radio.Group>
            </Item>
            {flags.screen_params && (
              <>
                <Item
                  label="宽度"
                  initialValue={1}
                  name="w"
                  rules={[{ required: true, message: '不能为空' }]}
                >
                  <InputNumber min={0} />
                </Item>
                <Item
                  label="高度"
                  name="h"
                  initialValue={0}
                  rules={[{ required: true, message: '不能为空' }]}
                >
                  <InputNumber min={0} />
                </Item>
                <Item
                  label="x距"
                  name="x"
                  initialValue={0}
                  rules={[{ required: true, message: '不能为空' }]}
                >
                  <InputNumber min={0} />
                </Item>
                <Item
                  label="y距"
                  name="y"
                  initialValue={0}
                  rules={[{ required: true, message: '不能为空' }]}
                >
                  <InputNumber min={0} />
                </Item>
              </>
            )}
          </Form>
        </Drawer>
      </BasicNode>
    </>
  );
};

export default MergeNode;
