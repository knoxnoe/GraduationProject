import { message } from 'antd';
import {
  DECODER_REQUEST,
  DECODER_RESPONSE,
  Logger,
  READER_REQUEAST,
  READER_RESPONSE,
} from './common';
import { PCMPlayer } from './pcm';
import { FrameData, IDecoderRsp } from './type';
import { WebGLPlayer } from './webgl';

enum DECODER_STATE {
  decoderStateIdle = 0,
  decoderStateInitializing = 1,
  decoderStateReady = 2,
  decoderStateFinished = 3,
}

enum PLAYER_STATE {
  playerStateIdle = 0,
  playerStatePlaying = 1,
  playerStatePausing = 2,
}

const maxBufferTimeLength = 1.0;
const downloadSpeedByteRateCoef = 2.0;

class FileInfo {
  size: number;
  type: string;
  chunkSize: number;
  offset: number;

  constructor({
    size,
    type,
    chunkSize,
  }: {
    size: number;
    type: string;
    chunkSize: number;
  }) {
    this.size = size || 0;
    this.offset = 0;
    this.type = type;
    this.chunkSize = chunkSize || 65536;
  }
}

export class Player {
  fileInfo: FileInfo | null = null;
  fileReady = false;

  pcmPlayer: PCMPlayer | null = null;
  canvas: HTMLCanvasElement | null = null;
  webglPlayer: WebGLPlayer | null = null;

  callback = null;
  waitHeaderLength = 524288;
  duration = 0;
  pixFmt = 0;
  videoWidth = 0;
  videoHeight = 0;
  yLength = 0;
  uvLength = 0;
  beginTimeOffset = 0;
  decoderState = DECODER_STATE.decoderStateIdle;
  playerState = PLAYER_STATE.playerStateIdle;

  decoding = false;
  decodeInterval = 5;

  videoRendererTimer = null;
  downloadTimer: NodeJS.Timer | null = null;
  chunkInterval = 200;
  downloadSeqNo = 0;
  reading = false;
  downloadProto = 'local';

  timeLabel: HTMLSpanElement | null = null;
  timeTrack: HTMLInputElement | null = null;
  trackTimer: NodeJS.Timer | null = null;
  trackTimerInterval = 500;
  displayDuration = '00:00:00';

  audioEncoding = '';
  audioChannels = 0;
  audioSampleRate = 0;
  seeking = false; // Flag to preventing multi seek from track.
  justSeeked = false; // Flag to preventing multi seek from ffmpeg.
  urgent = false;
  seekWaitLen = 524288; // Default wait for 512K, will be updated in onVideoParam.
  seekReceivedLen = 0;
  loadingDiv = null;
  buffering = false;
  frameBuffer: FrameData[] = [];
  isStream = false;
  streamReceivedLen = 0;
  firstAudioFrame = true;
  fetchController = null;
  streamPauseParam = null;
  logger = new Logger('Player');

  reader;
  decoder;

  constructor(reader: Worker, decoder: Worker) {
    this.reader = reader;
    this.decoder = decoder;
    this.initReaderMessage();
    this.initDecoderMessage();
  }

  initReaderMessage = () => {
    this.reader.onmessage = (event) => {
      const objData = event.data;
      switch (objData.k) {
        case READER_RESPONSE.KGetFileInfoRsp:
          this.onGetFileInfo(objData.data);
          break;
        case READER_RESPONSE.KReaderFileRsp:
          this.onFileData(objData.data.raw_data);
          break;
      }
    };
  };

  // ------------------------- Reader message func start
  // 初始化文件的response消息
  onGetFileInfo = ({
    type,
    size,
    chunkSize,
  }: {
    size: number;
    type: string;
    chunkSize: number;
  }) => {
    this.fileInfo = new FileInfo({ size, type, chunkSize });
    this.fileReady = true;
    this.decoder.postMessage({
      k: DECODER_REQUEST.kInitDecoderReq,
      data: {
        size: size,
        type: type,
        chunkSize: chunkSize,
      },
    });
  };

  onFileData = (raw_data: ArrayBuffer) => {
    this.reading = false;

    if (!this.fileInfo) return;

    this.decoder.postMessage(
      {
        k: DECODER_REQUEST.kFeedDataReq,
        data: { raw_data: raw_data },
      },
      [raw_data]
    );

    this.fileInfo.offset += this.fileInfo.chunkSize;

    console.log(`decoder state: ${this.decoderState}`);
    switch (this.decoderState) {
      case DECODER_STATE.decoderStateIdle:
        this.onFileDataUnderDecoderIdle();
        break;
      case DECODER_STATE.decoderStateInitializing:
        this.onFileDataUnderDecoderInitializing();
        break;
      case DECODER_STATE.decoderStateReady:
        this.onFileDataUnderDecoderReady();
        break;
    }
  };

  onFileDataUnderDecoderIdle = () => {
    console.dir(this.fileInfo?.offset);
    if (
      this.fileInfo &&
      (this.fileInfo.offset >= this.waitHeaderLength ||
        (!this.isStream && this.fileInfo.offset == this.fileInfo.size))
    ) {
      this.logger.logInfo('Opening decoder.');
      this.decoderState = DECODER_STATE.decoderStateInitializing;

      this.decoder.postMessage({
        k: DECODER_REQUEST.kOpenDecoderReq,
      });
    }

    this.readerOneChunk();
  };

  onFileDataUnderDecoderInitializing = () => {
    this.readerOneChunk();
  };

  onFileDataUnderDecoderReady = () => {
    //this.readerOneChunk();
  };

  readerOneChunk = () => {
    if (this.reading || this.isStream || !this.fileInfo) {
      return;
    }

    var start = this.fileInfo.offset;
    if (start >= this.fileInfo.size) {
      this.logger.logError('Reach file end.');
      this.stopReaderTimer();
      return;
    }

    var end = this.fileInfo.offset + this.fileInfo.chunkSize - 1;
    if (end >= this.fileInfo.size) {
      end = this.fileInfo.size - 1;
    }

    var len = end - start + 1;
    if (len > this.fileInfo.chunkSize) {
      console.log(
        'Error: request len:' + len + ' > chunkSize:' + this.fileInfo.chunkSize
      );
      return;
    }

    var req = {
      k: READER_REQUEAST.KReaderFileReq,
      // u: this.fileInfo.url,
      // s: start,
      // e: end,
      // q: this.downloadSeqNo,
    };
    this.reader.postMessage(req);
    this.reading = true;
  };

  startReaderTimer = () => {
    var self = this;
    this.downloadSeqNo++;
    this.downloadTimer = setInterval(() => {
      this.readerOneChunk();
    }, this.chunkInterval);
  };

  stopReaderTimer = () => {
    if (this.downloadTimer != null) {
      clearInterval(this.downloadTimer);
      this.downloadTimer = null;
    }
    this.reading = false;
  };

  // ------------------------- Reader message func end

  initDecoderMessage = () => {
    this.decoder.onmessage = (event) => {
      const objData: {
        k: DECODER_RESPONSE;
        data: IDecoderRsp;
      } = event.data;

      switch (objData.k) {
        case DECODER_RESPONSE.kInitDecoderRsp:
          this.onInitDecoder(objData.data);
          break;
        case DECODER_RESPONSE.kOpenDecoderRsp:
          this.onOpenDecoder(objData.data);
          break;
        case DECODER_RESPONSE.kVideoFrame:
          // this.onVideoFrame(objData.data);
          this.bufferFrame({ type: objData.k, ...objData.data });
          break;
        case DECODER_RESPONSE.kAudioFrame:
          //this.onAudioFrame(objData.data);
          this.bufferFrame({ type: objData.k, ...objData.data });
          break;
        case DECODER_RESPONSE.kDecodeFinishedEvt:
          this.onDecodeFinished();
          break;
        case DECODER_RESPONSE.kRequestDataEvt:
          this.onRequestData(objData.o, objData.a);
          break;
        case DECODER_RESPONSE.kSeekToRsp:
          this.onSeekToRsp(objData.r);
          break;
      }
    };
  };

  // ---------------------Decoder message func start

  onInitDecoder({ res }: { res: number }) {
    this.logger.logInfo('Init decoder response ' + res + '.');

    if (res === 0) {
      message.success('decoder init success!');
    }
    // if (res === 0) {
    //   this.readerFileChunk();
    // } else {
    //   this.reportPlayError(objData.e);
    // }
  }

  onOpenDecoder(objData: IDecoderRsp) {
    if (this.playerState == PLAYER_STATE.playerStateIdle) {
      return;
    }

    this.logger.logInfo('Open decoder response ' + objData.res + '.');
    if (objData.res == 0) {
      this.onVideoParam(objData.video);
      this.onAudioParam(objData.audio);
      this.decoderState = DECODER_STATE.decoderStateReady;
      this.logger.logInfo('Decoder ready now.');
      this.startDecoding();
    } else {
      this.reportPlayError(objData.res);
    }
  }

  onDecodeFinished() {
    this.pauseDecoding();
    this.decoderState = DECODER_STATE.decoderStateFinished;
  }
  onRequestData() {}
  onSeekToRsp() {}

  readerFileChunk = () => {
    this.reader.postMessage({
      k: READER_REQUEAST.KReaderFileReq,
    });
  };

  // ---------------------Decoder message func end

  // 初始化文件信息
  initFile = (file: File) => {
    this.logger.logInfo('init file ~~~~');
    this.reader.postMessage({
      k: READER_REQUEAST.kGetFileInfoReq,
      data: {
        file: file,
      },
    });
  };

  // 初始化 track
  initTrack = (timeTrack: HTMLInputElement, timeLabel: HTMLSpanElement) => {
    !this.timeTrack && (this.timeTrack = timeTrack);
    !this.timeLabel && (this.timeLabel = timeLabel);
    // timeTrack.current.min = '0';
    // timeTrack.current.max = '99';
    // timeTrack.current.value = '10';
    // timeTrack.current.step = '1';
  };

  onVideoParam = (v: IDecoderRsp['video']) => {
    console.log('video param');
    if (this.playerState == PLAYER_STATE.playerStateIdle) {
      return;
    }

    if (!this.fileInfo) {
      return;
    }

    this.logger.logInfo(
      'Video param duation:' +
        v.duration +
        ' pixFmt:' +
        v.pixFmt +
        ' width:' +
        v.width +
        ' height:' +
        v.height +
        '.'
    );
    this.duration = v.duration;
    this.pixFmt = v.pixFmt;
    //this.canvas.width = v.w;
    //this.canvas.height = v.h;
    this.videoWidth = v.width;
    this.videoHeight = v.height;
    this.yLength = this.videoWidth * this.videoHeight;
    this.uvLength = (this.videoWidth / 2) * (this.videoHeight / 2);

    //var playCanvasContext = playCanvas.getContext("2d"); //If get 2d, webgl will be disabled.
    this.webglPlayer = new WebGLPlayer(this.canvas, {
      preserveDrawingBuffer: false,
    });

    if (this.timeTrack) {
      this.timeTrack.min = '0';
      this.timeTrack.max = `${this.duration}`;
      this.timeTrack.value = '0';
      this.displayDuration = this.formatTime(this.duration / 1000);
    }

    var byteRate = (1000 * this.fileInfo.size) / this.duration;
    var targetSpeed = downloadSpeedByteRateCoef * byteRate;
    var chunkPerSecond = targetSpeed / this.fileInfo.chunkSize;
    this.chunkInterval = 1000 / chunkPerSecond;
    this.seekWaitLen = byteRate * maxBufferTimeLength * 2;
    this.logger.logInfo('Seek wait len ' + this.seekWaitLen);

    if (!this.isStream) {
      this.startReaderTimer();
    }

    this.logger.logInfo(
      'Byte rate:' +
        byteRate +
        ' target speed:' +
        targetSpeed +
        ' chunk interval:' +
        this.chunkInterval +
        '.'
    );
  };

  onAudioParam = (a: IDecoderRsp['audio']) => {
    if (this.playerState == PLAYER_STATE.playerStateIdle) {
      return;
    }

    this.logger.logInfo(
      'Audio param sampleFmt:' +
        a.sampleFmt +
        ' channels:' +
        a.channels +
        ' sampleRate:' +
        a.sampleRate +
        '.'
    );

    var sampleFmt = a.sampleFmt;
    var channels = a.channels;
    var sampleRate = a.sampleRate;

    var encoding = '16bitInt';
    switch (sampleFmt) {
      case 0:
        encoding = '8bitInt';
        break;
      case 1:
        encoding = '16bitInt';
        break;
      case 2:
        encoding = '32bitInt';
        break;
      case 3:
        encoding = '32bitFloat';
        break;
      default:
        this.logger.logError('Unsupported audio sampleFmt ' + sampleFmt + '!');
    }
    this.logger.logInfo('Audio encoding ' + encoding + '.');

    this.pcmPlayer = new PCMPlayer({
      encoding: encoding,
      channels: channels,
      sampleRate: sampleRate,
      flushingTime: 5000,
    });

    this.audioEncoding = encoding;
    this.audioChannels = channels;
    this.audioSampleRate = sampleRate;
  };

  bufferFrame = (frame: FrameData) => {
    // If not decoding, it may be frame before seeking, should be discarded.
    if (!this.decoding) {
      return;
    }
    this.frameBuffer.push(frame);
    //this.logger.logInfo("bufferFrame " + frame.s + ", seq " + frame.q);
    if (
      this.getBufferTimerLength() >= maxBufferTimeLength ||
      this.decoderState == DECODER_STATE.decoderStateFinished
    ) {
      if (this.decoding) {
        //this.logger.logInfo("Frame buffer time length >= " + maxBufferTimeLength + ", pause decoding.");
        this.pauseDecoding();
      }
      if (this.buffering) {
        this.stopBuffering();
      }
    }
  };

  startBuffering = () => {
    this.buffering = true;
    // this.showLoading();
    // this.pause();
  };

  stopBuffering = () => {
    this.buffering = false;
    // this.hideLoading();
    // this.resume();
  };

  restartAudio = () => {
    if (this.pcmPlayer) {
      this.pcmPlayer.destroy();
      this.pcmPlayer = null;
    }

    this.pcmPlayer = new PCMPlayer({
      encoding: this.audioEncoding,
      channels: this.audioChannels,
      sampleRate: this.audioSampleRate,
      flushingTime: 5000,
    });
  };

  displayAudioFrame = (frame: FrameData) => {
    if (this.playerState != PLAYER_STATE.playerStatePlaying) {
      return false;
    }

    if (this.seeking) {
      this.restartAudio();
      this.startTrackTimer();
      //this.hideLoading();
      this.seeking = false;
      this.urgent = false;
    }

    if (this.isStream && this.firstAudioFrame) {
      this.firstAudioFrame = false;
      this.beginTimeOffset = frame.timestamp;
    }

    this.pcmPlayer?.play(new Uint8Array(frame.frame_data));
    return true;
  };

  displayVideoFrame = (frame: FrameData) => {
    if (this.playerState != PLAYER_STATE.playerStatePlaying) {
      return false;
    }

    if (this.seeking) {
      this.restartAudio();
      this.startTrackTimer();
      //this.hideLoading();
      this.seeking = false;
      this.urgent = false;
    }

    var audioCurTs = this.pcmPlayer?.getTimestamp();
    var audioTimestamp = audioCurTs + this.beginTimeOffset;
    var delay = frame.timestamp - audioTimestamp;

    //this.logger.logInfo("displayVideoFrame delay=" + delay + "=" + " " + frame.s  + " - (" + audioCurTs  + " + " + this.beginTimeOffset + ")" + "->" + audioTimestamp);

    if (audioTimestamp <= 0 || delay <= 0) {
      var data = new Uint8Array(frame.frame_data);
      this.renderVideoFrame(data);
      return true;
    }
    return false;
  };

  renderVideoFrame = (data: Uint8Array) => {
    if (!this.webglPlayer) {
      return;
    }
    this.webglPlayer.renderFrame(
      data,
      this.videoWidth,
      this.videoHeight,
      this.yLength,
      this.uvLength
    );
  };

  play = ({
    file,
    canvas,
    waitHeaderLength,
    timeTrack,
    timeLabel,
  }: {
    file: File;
    canvas: HTMLCanvasElement;
    waitHeaderLength: number;
    timeTrack: HTMLInputElement;
    timeLabel: HTMLSpanElement;
  }) => {
    this.readerOneChunk();

    this.canvas = canvas;
    this.waitHeaderLength = waitHeaderLength || this.waitHeaderLength;
    this.initTrack(timeTrack, timeLabel);
    this.startTrackTimer();
    this.displayLoop();
  };

  startTrackTimer = () => {
    this.trackTimer = setInterval(() => {
      this.updateTrackTime();
    }, this.trackTimerInterval);
  };

  stopTrackTimer = () => {
    if (this.trackTimer != null) {
      clearInterval(this.trackTimer);
      this.trackTimer = null;
    }
  };

  updateTrackTime = () => {
    if (this.playerState == PLAYER_STATE.playerStatePlaying && this.pcmPlayer) {
      var currentPlayTime =
        this.pcmPlayer.getTimestamp() + this.beginTimeOffset;
      if (this.timeTrack) {
        this.timeTrack.value = `${1000 * currentPlayTime}`;
      }

      if (this.timeLabel) {
        this.timeLabel.innerHTML =
          this.formatTime(currentPlayTime) + '/' + this.displayDuration;
      }
    }
  };

  displayLoop = () => {
    if (this.playerState !== PLAYER_STATE.playerStateIdle) {
      requestAnimationFrame(this.displayLoop.bind(this));
    }
    if (this.playerState !== PLAYER_STATE.playerStatePlaying) {
      return;
    }

    if (this.frameBuffer.length == 0) {
      return;
    }

    if (this.buffering) {
      return;
    }

    // requestAnimationFrame may be 60fps, if stream fps too large,
    // we need to render more frames in one loop, otherwise display
    // fps won't catch up with source fps, leads to memory increasing,
    // set to 2 now.
    for (let i = 0; i < 2; ++i) {
      var frame = this.frameBuffer[0];
      switch (frame.type) {
        case DECODER_RESPONSE.kAudioFrame:
          if (this.displayAudioFrame(frame)) {
            this.frameBuffer.shift();
          }
          break;
        case DECODER_RESPONSE.kVideoFrame:
          if (this.displayVideoFrame(frame)) {
            this.frameBuffer.shift();
          }
          break;
        default:
          return;
      }

      if (this.frameBuffer.length == 0) {
        break;
      }
    }

    if (this.getBufferTimerLength() < maxBufferTimeLength / 2) {
      if (!this.decoding) {
        //this.logger.logInfo("Buffer time length < " + maxBufferTimeLength / 2 + ", restart decoding.");
        this.startDecoding();
      }
    }

    // if (this.bufferFrame.length == 0) {
    //   if (this.decoderState == decoderStateFinished) {
    //     this.reportPlayError(1, 0, 'Finished');
    //     this.stop();
    //   } else {
    //     this.startBuffering();
    //   }
    // }
  };

  startDecoding = () => {
    this.decoder.postMessage({
      k: DECODER_REQUEST.kStartDecodingReq,
      data: {
        interval: this.urgent ? 0 : this.decodeInterval,
      },
    });
    this.decoding = true;
  };

  pauseDecoding = () => {
    this.decoder.postMessage({
      k: DECODER_REQUEST.kPauseDecodingReq,
    });
    this.decoding = false;
  };

  getBufferTimerLength = () => {
    if (!this.frameBuffer || this.frameBuffer.length == 0) {
      return 0;
    }

    let oldest = this.frameBuffer[0];
    let newest = this.frameBuffer[this.frameBuffer.length - 1];
    return newest.timestamp - oldest.timestamp;
  };

  formatTime = (s: number) => {
    const hh =
      Math.floor(s / 3600) < 10
        ? '0' + Math.floor(s / 3600)
        : Math.floor(s / 3600);
    const mm =
      Math.floor((s / 60) % 60) < 10
        ? '0' + Math.floor((s / 60) % 60)
        : Math.floor((s / 60) % 60);
    const ss =
      Math.floor(s % 60) < 10 ? '0' + Math.floor(s % 60) : Math.floor(s % 60);
    return `${hh} + ':' + ${mm} + ':' + ${ss}`;
  };

  reportPlayError = (error, status?, message?) => {
    var e = {
      error: error || 0,
      status: status || 0,
      message: message,
    };

    // if (this.callback) {
    //   this.callback(e);
    // }
  };
}
