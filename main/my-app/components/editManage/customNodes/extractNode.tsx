import {
  Button,
  Drawer,
  Form,
  Input,
  InputNumber,
  Radio,
  Segmented,
  Select,
  TimePicker,
} from 'antd';
import { FC, useState } from 'react';
import BasicNode, { NodeWithData } from './node';

const { Item } = Form;
//ffmpeg -i input1.mp4 -i input2.mp4 -i input3.mp4 -lavfi hstack=inputs=3 output.mp4
// ffmpeg -i input.mp4 -vn -b:a 128k -ar 44k -c:a mp3 output.mp3 音频提取
// ffmpeg -i input.mp4 -an -c:a copy output.mp4 视频提取

const enum EXTRACT_TYPE {
  ExtractVideo = 'extract_audio',
  ExtractAudio = 'extract_video',
  ExtractYUV = 'extract_yuv',
  ExtractFrame = 'extract_frame',
}

const ExtracType = [
  { label: '抽取音频', value: EXTRACT_TYPE.ExtractAudio },
  { label: '抽取视频', value: EXTRACT_TYPE.ExtractVideo },
  { label: '抽取图像帧', value: EXTRACT_TYPE.ExtractFrame },
  // { label: '抽取YUV画面', value: EXTRACT_TYPE.ExtractYUV },
];

const ExtractNode: FC<NodeWithData> = (props) => {
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
      <BasicNode {...props}>
        <Button onClick={() => setVisible(true)}>{data.label}</Button>
        <Drawer
          title="抽取参数"
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
              label="抽取方式"
              name="type"
              initialValue={EXTRACT_TYPE.ExtractAudio}
              rules={[{ required: true, message: '不能为空' }]}
            >
              <Segmented options={ExtracType} />
            </Item>
            <Item shouldUpdate noStyle>
              {({ getFieldValue }) => {
                return (
                  <>
                    {getFieldValue('type') === EXTRACT_TYPE.ExtractAudio && (
                      <>
                        <Item initialValue={124} label="码率" name="kbp">
                          <InputNumber addonAfter="kbps" min={0} />
                        </Item>
                        <Item initialValue={128} label="采样频率" name="hz">
                          <InputNumber addonAfter="kHz" min={0} />
                        </Item>
                      </>
                    )}
                    {getFieldValue('type') === EXTRACT_TYPE.ExtractVideo && (
                      <>
                        <Item initialValue={128} label="码率" name="kbp">
                          <InputNumber addonAfter="kb/s" min={0} />
                        </Item>
                      </>
                    )}
                    {getFieldValue('type') === EXTRACT_TYPE.ExtractFrame && (
                      <>
                        <Item initialValue={'I帧'} label="IPB帧" name="IPB">
                          <Select
                            options={[
                              { value: 'I帧' },
                              { value: 'P帧' },
                              { value: 'B帧' },
                            ]}
                          ></Select>
                        </Item>
                        <Item
                          initialValue={'yuvj422p'}
                          label="pix_fmt"
                          name="pix_fmt"
                        >
                          <Input placeholder="yuvj422p"></Input>
                        </Item>
                        <Item initialValue={128} label="间隔" name="duration">
                          <InputNumber addonAfter="kb/s" min={0} />
                        </Item>
                        <Item label="指定帧" name="f">
                          <TimePicker size="small" />
                        </Item>
                      </>
                    )}
                  </>
                );
              }}
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

export default ExtractNode;
