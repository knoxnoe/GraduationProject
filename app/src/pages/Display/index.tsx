// import ffmpegCli from '@/components/ffmpegCLI';
import { InboxOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';
import { message, Upload, Button } from 'antd';
import React, { useEffect, useState } from 'react';
import { createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg';
// import Demo from '../../visitor/index';

const { Dragger } = Upload;
const ffmpegCli = createFFmpeg({
  log: true,
});

const Display = () => {
  const [ready, setReady] = useState(false);
  const [video, setVideo] = useState();
  const [gif, setGif] = useState<string>();

  const [count, setCount] = useState(0);

  const loadFFmpeg = async () => {
    await ffmpegCli.load();
    setReady(true);
  };
  useEffect(() => {
    loadFFmpeg();
    console.log('load');
  }, []);

  const convertToGif = async () => {
    // Write the file to memory
    ffmpegCli.FS('writeFile', 'test.mp4', await fetchFile(video));

    // Run the FFMpeg command
    await ffmpegCli.run(
      '-i',
      'test.mp4',
      '-t',
      '2.5',
      '-ss',
      '2.0',
      '-f',
      'gif',
      'out.gif',
    );

    // Read the result
    const data = ffmpegCli.FS('readFile', 'out.gif');

    // Create a URL
    const url = URL.createObjectURL(
      new Blob([data.buffer], { type: 'image/gif' }),
    );
    setGif(url);
  };

  const props: UploadProps = {
    name: 'file',
    multiple: true,
    onChange(info) {
      const { status } = info.file;
      if (status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (status === 'done') {
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e) {
      console.log('Dropped files', e);
    },
    customRequest(a) {
      console.log('-----');
      console.log(a);
      const reader = new FileReader();
      reader.onload = function (evt) {
        console.log('------');
        console.log(evt.target.result);
      };
      reader.readAsArrayBuffer(a.file);
      console.log('ggggg');
    },
  };

  return (
    <div>
      <h4>{count}</h4>
      <Button onClick={() => setCount(count + 1)}>click</Button>
      <Dragger {...props}>
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">
          Click or drag file to this area to upload
        </p>
        <p className="ant-upload-hint">
          Support for a single or bulk upload. Strictly prohibit from uploading
          company data or other band files
        </p>
      </Dragger>
      {/* <Button type="primary" onClick={() => Demo.init()}>
        发送消息
      </Button> */}
      {ready ? (
        <div className="App">
          {video && (
            <video
              controls
              width="250"
              src={URL.createObjectURL(video)}
            ></video>
          )}

          <input
            type="file"
            onChange={(e) => setVideo(e.target.files?.item(0))}
          />

          <h3>Result</h3>

          <button onClick={convertToGif}>Convert</button>

          {gif && <img src={gif} width="250" />}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Display;
