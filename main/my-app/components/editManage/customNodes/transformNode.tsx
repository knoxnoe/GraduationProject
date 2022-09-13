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
import BasicNode, { NodeWithData } from './node';

const { Item } = Form;

const enum TRANSFORM_TYPE {
  Format = 'format',
  Compress = 'compress',
}

const TansformType = [
  { label: '压缩转换', value: TRANSFORM_TYPE.Compress },
  { label: '格式转换', value: TRANSFORM_TYPE.Format },
];

const TransformNode: FC<NodeWithData> = (props) => {
  const { data } = props;
  const [$form] = Form.useForm();
  const [visible, setVisible] = useState(false);

  const [flags, setFlags] = useState({
    time_range: false,
    screen_params: false,
  });

  const handleProcessParams = (values: any) => {
    console.log('Success:', values);
    data.params = values;
  };

  return (
    <>
      <BasicNode {...props}>
        <Button onClick={() => setVisible(true)}>{data.label}</Button>
        <Drawer
          title="转换参数"
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
              label="转换类型"
              name="type"
              initialValue={TRANSFORM_TYPE.Compress}
              rules={[{ required: true, message: '不能为空' }]}
            >
              <Segmented options={TansformType} />
            </Item>
            {
              <Item noStyle shouldUpdate>
                {({ getFieldValue }) => {
                  return (
                    <>
                      {getFieldValue('type') === TRANSFORM_TYPE.Compress && (
                        <>
                          <Item initialValue={128} label="码率" name="kbp">
                            <InputNumber addonAfter="kb/s" min={0} />
                          </Item>
                        </>
                      )}
                      {getFieldValue('type') === TRANSFORM_TYPE.Format && (
                        <>
                          <Item initialValue={128} label="码率" name="kbp">
                            <InputNumber addonAfter="kb/s" min={0} />
                          </Item>
                        </>
                      )}
                    </>
                  );
                }}
              </Item>
            }
            <Item label="时间截取">
              <Radio.Group
                value={flags.time_range}
                buttonStyle="solid"
                size="small"
                onChange={(e) =>
                  setFlags({ ...flags, time_range: Boolean(e.target.value) })
                }
              >
                <Radio.Button value={false}>关闭</Radio.Button>
                <Radio.Button value={true}>开启</Radio.Button>
              </Radio.Group>
            </Item>
            {flags.time_range && (
              <Item
                label="范围选择"
                name="range"
                rules={[{ required: true, message: '不能为空' }]}
              >
                <TimePicker.RangePicker />
              </Item>
            )}
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

export default TransformNode;
