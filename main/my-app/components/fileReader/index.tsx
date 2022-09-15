import { ORIGIN_RESOURCE_PREFIX, RESOURCE_PREFIX } from '@/constants/order';
import { InboxOutlined } from '@ant-design/icons';
import { fetchFile, FFmpeg } from '@ffmpeg/ffmpeg';
import { Button, message, Spin, Tag, Tooltip, Upload, UploadFile } from 'antd';
import {
  Dispatch,
  FC,
  MutableRefObject,
  SetStateAction,
  useEffect,
  useState,
} from 'react';
import { useFileStore } from 'states/store';

const { Dragger } = Upload;
interface IProps {
  setStep: Dispatch<SetStateAction<number>>;
  isLoadedFFmpeg: boolean;
  ffmpegCli: MutableRefObject<FFmpeg | null>;
}

const FileReader: FC<IProps> = (props) => {
  const { isLoadedFFmpeg, ffmpegCli, setStep } = props;
  const files = useFileStore((state) => state.files);
  const updateFiles = useFileStore((state) => state.updateFiles);

  const [fileList, setFileList] = useState<UploadFile<any>[]>([...files]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isLoadedFFmpeg && loading) {
      registerFiles();
    }
  }, [isLoadedFFmpeg, loading]);

  // 文件预览
  const previewFile = (file): Promise<any> => {
    console.log(file);
    return Promise.resolve();
  };

  const initFiles = () => {
    if (!isLoadedFFmpeg) {
      message.warning('请耐心等待！文件初始化中....');
      setLoading(true);
      return;
    }

    registerFiles();
  };

  const registerFiles = async () => {
    updateFiles([...fileList]);
    fileList?.forEach(async (file, idx) => {
      ffmpegCli.current?.FS(
        'writeFile',
        `${ORIGIN_RESOURCE_PREFIX}${idx}`,
        await fetchFile(file.originFileObj as File)
      );
    });
    setStep(1);
  };

  const FileItem = ({ originNode, file, fileList }) => {
    const index = fileList.indexOf(file);

    const errorNode = (
      <Tooltip title="Upload Error">{originNode.props.children}</Tooltip>
    );
    return (
      <div
        style={{
          cursor: 'pointer',
          marginTop: 8,
          border: '1px solid #ddd',
        }}
      >
        <div
          style={{
            height: 20,
            textAlign: 'center',
            marginTop: 8,
            marginBottom: 4,
          }}
        >
          <span>
            {`文件标识符：`}
            <Tag color="#87d068">{`${RESOURCE_PREFIX}${index}`}</Tag>
          </span>
        </div>
        {file.status === 'error' ? errorNode : originNode}
      </div>
    );
  };

  return (
    <Spin tip="解析文件..." spinning={loading}>
      <Dragger
        multiple={true}
        previewFile={(file) => previewFile(file)}
        onChange={({ file, fileList }) => setFileList([...fileList])}
        fileList={fileList}
        progress={{
          strokeColor: {
            '0%': '#108ee9',
            '100%': '#87d068',
          },
          strokeWidth: 3,
          format: (percent) => percent && `${parseFloat(percent.toFixed(2))}%`,
        }}
        //listType="picture-card"
        itemRender={(
          originNode,
          file,
          fileList,
          { download, preview, remove }
        ) => (
          <FileItem originNode={originNode} file={file} fileList={fileList} />
        )}
      >
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">
          Click or drag file to this area to Select
        </p>
        <p className="ant-upload-hint">Support for a single or bulk Select.</p>
      </Dragger>
      <div style={{ textAlign: 'center' }}>
        <Button
          style={{ marginTop: 24 }}
          type="primary"
          onClick={() => initFiles()}
        >
          初始化文件
        </Button>
      </div>
    </Spin>
  );
};

export default FileReader;
