import { Button, FormInstance, Steps, UploadFile } from 'antd';
import { useState, useEffect, useRef } from 'react';
import FileReader from '@/components/fileReader';
import { createFFmpeg, fetchFile, FFmpeg } from '@ffmpeg/ffmpeg';
import EditManage from '@/components/editManage';
import Result from '@/components/result';

const { Step } = Steps;

const Edit = () => {
  const [curStep, setCurStep] = useState(1);
  const [fileList, setFileList] = useState<UploadFile<any>[]>();

  const paramsRef = useRef<{ parameterForm: FormInstance<any> }>();
  const [parameter, setParameter] = useState<any>();

  const [loadedFFmpeg, setLoadedFFmpeg] = useState(false);
  const ffmpegCli = useRef<FFmpeg | null>(null);

  useEffect(() => {
    loadFFmpeg();
  }, []);

  const loadFFmpeg = async () => {
    if (!ffmpegCli.current) {
      ffmpegCli.current = createFFmpeg({
        corePath: 'https://unpkg.com/@ffmpeg/core@0.11.0/dist/ffmpeg-core.js',
        log: true,
      });
    }

    if (!ffmpegCli.current.isLoaded()) {
      await ffmpegCli.current.load();
    }
    console.log('loaded');
    setLoadedFFmpeg(true);
  };

  // 2、参数执行
  const process = () => {
    if (paramsRef.current) {
      const { parameterForm } = paramsRef.current;
      const params = parameterForm.getFieldsValue(true);
      setParameter(params);
      _xxxx();
    }
  };

  const _xxxx = async () => {
    if (ffmpegCli.current) {
      //ffmpeg –i test.avi –f flv test1.flv
      await ffmpegCli.current.run(
        '-i',
        'media0',
        '-f',
        `${parameter?.type}`,
        `output.${parameter?.type}`
      );

      const data = ffmpegCli.current.FS(
        'readFile',
        `output.${parameter?.type}`
      );

      const url = URL.createObjectURL(
        new Blob([data.buffer], { type: 'video/x-flv' })
      );

      let a = document.createElement('a');
      a.download = 'xxxx';
      a.style.display = 'none';
      a.href = url;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  };
  // 3、
  // const [gif, setGif] = useState<string>()
  // const convertToGif = async () => {
  //   // Write the file to memory
  //   if (ffmpegCli.current && fileList?.[0]) {
  //     console.log(fileList[0])
  //     ffmpegCli.current.FS('writeFile', 'test.mp4', await fetchFile(fileList?.[0].originFileObj as File))

  //     // Run the FFMpeg command
  //     await ffmpegCli.current.run('-i', 'test.mp4', '-t', '2.5', '-ss', '2.0', '-f', 'gif', 'out.gif')

  //     // Read the result
  //     const data = ffmpegCli.current.FS('readFile', 'out.gif')

  //     // Create a URL
  //     const url = URL.createObjectURL(new Blob([data.buffer], { type: 'image/gif' }))
  //     setGif(url)
  //   }
  // }

  const steps = [
    {
      title: '选择源视频',
      content: (
        <FileReader
          isLoadedFFmpeg={loadedFFmpeg}
          ffmpegCli={ffmpegCli}
          setStep={setCurStep}
        ></FileReader>
      ),
    },
    {
      title: '编辑任务DAG',
      content: (
        <EditManage
          ffmpegCli={ffmpegCli.current}
          parameter={parameter}
          setParameter={setParameter}
          // ref={paramsRef}
          setStep={setCurStep}
        ></EditManage>
      ),
    },
    {
      title: '处理结果',
      content: <Result setStep={setCurStep}></Result>,
    },
  ];

  return (
    <div id="edit" style={{ padding: '16px 24px' }}>
      <Steps
        current={curStep}
        percent={60}
        // onChange={(step) => setCurStep(step)}
        size="small"
      >
        {steps.map((item) => (
          <Step key={item.title} title={item.title} />
        ))}
      </Steps>
      <div
        style={{
          padding: '8px 0px',
          height: 'calc(100vh - 170px)',
          minHeight: 650,
        }}
      >
        {steps[curStep].content}
      </div>
    </div>
  );
};

export default Edit;
