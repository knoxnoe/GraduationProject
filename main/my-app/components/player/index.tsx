import { YoutubeOutlined } from '@ant-design/icons';
import { Upload, UploadFile } from 'antd';
import { useEffect, useRef, useState } from 'react';
import styles from './index.module.less';
import { Player } from './player';

const { Dragger } = Upload;

const MediaPlayer = () => {
  const readerWorker = useRef<Worker>();
  const decoderWorker = useRef<Worker>();
  const $palyer = useRef<any>();

  const fileReader = useRef<FileReader>();
  const [file, setFile] = useState<UploadFile<any>>();

  useEffect(() => {
    readerWorker.current = new Worker(new URL('./reader.ts', import.meta.url));
    decoderWorker.current = new Worker(
      new URL('./decoder.ts', import.meta.url)
    );
    fileReader.current = new FileReader();

    //readerWorker.current.postMessage(100000);

    // readerWorker.current.onmessage = (evt) =>
    //   console.log(`WebWorker Response => ${evt.data}`);

    return () => {
      readerWorker.current?.terminate();
      decoderWorker.current?.terminate();
      fileReader.current = undefined;
    };
  }, []);

  useEffect(() => {
    if (readerWorker.current && decoderWorker.current) {
      $palyer.current = new Player(readerWorker.current, decoderWorker.current);
    }
  }, [readerWorker, decoderWorker]);

  return (
    <div className={styles.media_player}>
      <Dragger
        maxCount={1}
        onChange={({ file, fileList }) => {
          console.log(file, fileList);
          setFile(file);
        }}
      >
        <p className={styles.upload_drag__icon}>
          <YoutubeOutlined />
        </p>
        <p className={styles.upload_text}>选取视频播放 go play</p>
      </Dragger>
    </div>
  );
};

export default MediaPlayer;
