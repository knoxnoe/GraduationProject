import { Logger, READER_REQUEAST, READER_RESPONSE } from './common';

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

function FileInfo() {
  this.size = 0;
  this.offset = 0;
  this.chunkSize = 65536;
}

export class Player {
  fileInfo = null;
  pcmPlayer = null;
  canvas = null;
  webglPlayer = null;
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
  downloadTimer = null;
  chunkInterval = 200;
  downloadSeqNo = 0;
  downloading = false;
  downloadProto = 'local';
  timeLabel = null;
  timeTrack = null;
  trackTimer = null;
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
  frameBuffer = [];
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
    this.initReader();
    //this.initDecodeWorker();
  }

  initReader = () => {
    this.reader.onmessage = (evt) => {
      console.log(`WebWorker Response => ${evt.data}`);
      var objData = evt.data;
      switch (objData.t) {
        case READER_RESPONSE.KGetFileInfoRsp:
          this.onGetFileInfo(objData.i);
          break;
        case READER_RESPONSE.KReaderFileRsp:
          this.onFileData(objData);
          break;
      }
    };
  };

  onGetFileInfo = () => {};

  onFileData = (...args) => {
    console.log(args);
  };

  play = (file) => {
    console.log(file);

    this.reader.postMessage({
      k: READER_REQUEAST.KReaderFileReq,
      data: {
        file: file,
      },
    });
  };

  // initDecodeWorker = function () {
  //   var self = this;
  //   this.decodeWorker = new Worker('decoder.js');
  //   this.decodeWorker.onmessage = function (evt) {
  //     var objData = evt.data;
  //     switch (objData.t) {
  //       case kInitDecoderRsp:
  //         self.onInitDecoder(objData);
  //         break;
  //       case kOpenDecoderRsp:
  //         self.onOpenDecoder(objData);
  //         break;
  //       case kVideoFrame:
  //         self.onVideoFrame(objData);
  //         break;
  //       case kAudioFrame:
  //         self.onAudioFrame(objData);
  //         break;
  //       case kDecodeFinishedEvt:
  //         self.onDecodeFinished(objData);
  //         break;
  //       case kRequestDataEvt:
  //         self.onRequestData(objData.o, objData.a);
  //         break;
  //       case kSeekToRsp:
  //         self.onSeekToRsp(objData.r);
  //         break;
  //     }
  //   };
  // };
}
