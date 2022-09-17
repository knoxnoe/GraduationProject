import { YoutubeOutlined } from '@ant-design/icons';
import { Button, message, Upload, UploadFile } from 'antd';
import { useEffect, useRef, useState } from 'react';
import styles from './index.module.less';
import { Player } from './player';

const { Dragger } = Upload;

const MediaPlayer = () => {
  const readerWorker = useRef<Worker>();
  const decoderWorker = useRef<Worker>();
  const $player = useRef<Player>();

  const [file, setFile] = useState<UploadFile<any>>();

  useEffect(() => {
    readerWorker.current = new Worker(
      new URL('./reader.worker.ts', import.meta.url)
    );
    decoderWorker.current = new Worker(
      new URL('./decoder.worker.ts', import.meta.url)
    );

    return () => {
      readerWorker.current?.terminate();
      decoderWorker.current?.terminate();
    };
  }, []);

  useEffect(() => {
    if (readerWorker.current && decoderWorker.current) {
      $player.current = new Player(readerWorker.current, decoderWorker.current);
    }
  }, [readerWorker, decoderWorker]);

  useEffect(() => {
    if (file?.originFileObj && file.status === 'done') {
      $player.current?.initFileInfo(file.originFileObj);
    }
  }, [file]);

  return (
    <div className={styles.media_player}>
      <Dragger
        maxCount={1}
        onChange={({ file, fileList }) => {
          setFile(file);
        }}
      >
        <p className={styles.upload_drag__icon}>
          <YoutubeOutlined />
        </p>
        <p className={styles.upload_text}>选取视频播放 go play</p>
      </Dragger>
      <Button
        onClick={() => {
          if (!file?.originFileObj) {
            message.warn('请选择视频文件');
            return;
          }

          $player.current?.play(file.originFileObj);
        }}
      >
        读取文件
      </Button>
    </div>
  );
};

export default MediaPlayer;
