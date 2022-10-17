import { Button, Drawer, Form, InputNumber, Radio, TimePicker } from 'antd';
import moment from 'moment';
import { FC, useState } from 'react';
import { useDAGStore } from 'states/store';
import BasicNode, { NodeWithData } from './node';

const { Item } = Form;
// ffmpeg -i "input.mp4" -vcodec copy -acodec copy -ss 00:00:00 -t 00:06:33  "output.mp4"
// ffmpeg -ss 00:00:03 -i inputVideo.mp4 -to 00:00:08 -c:v copy -c:a copy  trim_ipseek_copy.mp4

const CutNode: FC<NodeWithData> = (props) => {
  const { data } = props;
  const [$form] = Form.useForm();
  const [visible, setVisible] = useState(false);
  const $DAG = useDAGStore((state) => state.$DAG);

  const [flags, setFlags] = useState({
    time_range: false,
    screen_params: false,
  });

  const handleProcessParams = (values: any) => {
    data.params = values;

    if (values.range) {
      let start = moment(values.range[0]).format('HH:mm:ss');
      let end = moment(values.range[1]).format('HH:mm:ss');

      const prevNode = $DAG?.getNode(data.prevIds?.[0] as string);

      data.command = `ffmpegCli.run('-ss', '${start}', '-i', '${prevNode?.data.resource_name}', '-to', '${end}', '-c:v', 'copy', '-c:a', 'copy', '${data.resource_name}.mp4')`;
      
      setVisible(false)
    }

  };

  return (
    <>
      <BasicNode {...props}>
        <Button onClick={() => setVisible(true)}>{data.label}</Button>
        <Drawer
          title="裁剪参数"
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

export default CutNode;
