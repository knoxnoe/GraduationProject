import {
  PauseCircleOutlined,
  PlayCircleOutlined,
  YoutubeOutlined,
} from '@ant-design/icons';
import { message, Spin, Upload, UploadFile } from 'antd';
import { useEffect, useRef, useState } from 'react';
import styles from './index.module.less';
import { Player } from './player';

const { Dragger } = Upload;

const MediaPlayer = () => {
  const readerWorker = useRef<Worker>();
  const decoderWorker = useRef<Worker>();
  const $player = useRef<Player>();

  const trackRef = useRef<HTMLInputElement | null>(null);
  const timeLabelRef = useRef<HTMLSpanElement | null>(null);

  const [file, setFile] = useState<UploadFile<any>>();

  const [playingState, setPlayingState] = useState(false);

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
      $player.current?.initFile(file.originFileObj);
    }
  }, [file]);

  const play = () => {
    if (!file?.originFileObj) {
      message.warn('请选择视频文件');
      return;
    }

    if (!trackRef.current || !timeLabelRef.current) {
      return;
    }

    $player.current?.play({
      file: file.originFileObj,
      
      timeTrack: trackRef.current,
      timeLabel: timeLabelRef.current,
    });

    const req = {};
  };

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

      <div className={styles.player_container}>
        <Spin tip="Loading..." spinning={true}>
          <canvas id="playCanvas" width="852" height="480"></canvas>
        </Spin>

        <div className={styles.player_sidebar}>
          <div style={{ lineHeight: 0 }}>
            <input
              className={styles.palyer_time__track}
              id="track_ref"
              ref={trackRef}
              type="range"
              step="0.1"
              defaultValue={0}
              // onInput={(event) => {
              //   console.log(1);
              // }}
              // onChange={(event) => {
              //   console.log(2);
              // }}
            />
          </div>
          <div style={{ height: 42, lineHeight: '42px' }}>
            <span style={{ marginLeft: 16, marginRight: 16, fontSize: 24 }}>
              {playingState ? (
                <PauseCircleOutlined />
              ) : (
                <PlayCircleOutlined onClick={() => play()} />
              )}
            </span>
            <span className={styles.palyer_time__label} ref={timeLabelRef}>
              00:00:00/00:00:00
            </span>
          </div>

          {/* <span class="no-padding right">
          <img src="img/fullscreen.png" class="right" id="btnFullscreen" onclick="fullscreen()" />
        </span> */}
        </div>
      </div>
    </div>
  );
};

export default MediaPlayer;
