import { DECODER_REQUEST, DECODER_RESPONSE, Logger } from './common';

interface IWorker extends DedicatedWorkerGlobalScope {
  decoder: Decoder;
  Module: any;
}

interface IData {
  raw_data: ArrayBuffer;

  size: number;
  type: string;
  chunkSize: number;
}
type MessageData = {
  k: DECODER_REQUEST;
  data: IData;
};

const worker: IWorker = self as any;

worker.Module = {
  onRuntimeInitialized: function () {
    onWasmLoaded();
  },
};

worker.importScripts('./libffmpeg.js');

console.log(worker);

class Decoder {
  logger: Logger;
  coreLogLevel = 1;

  wasmLoaded = false;
  tmpReqQueue: MessageData[] = [];
  cacheBuffer = null;

  videoCallback = null;
  audioCallback = null;
  requestCallback = null;

  decodeTimer: NodeJS.Timer | null = null;

  constructor() {
    this.logger = new Logger('Decoder');
  }

  onWasmLoaded() {
    this.logger.logInfo('wasm loaded!');
    this.wasmLoaded = true;

    this.videoCallback = worker.Module.addFunction(function (
      buff,
      size,
      timestamp
    ) {
      console.log(
        `[video callback] buff: ${buff}, size: ${size}, timestamp: ${timestamp}`
      );
      var outArray = worker.Module.HEAPU8.subarray(buff, buff + size);
      var data = new Uint8Array(outArray);
      var objData = {
        k: DECODER_RESPONSE.kVideoFrame,
        data: {
          timestamp: timestamp,
          frame_data: data,
        },
      };

      worker.postMessage(objData, [objData.data.frame_data.buffer]);
    },
    'viid');

    this.audioCallback = worker.Module.addFunction(function (
      buff,
      size,
      timestamp
    ) {
      var outArray = worker.Module.HEAPU8.subarray(buff, buff + size);
      var data = new Uint8Array(outArray);
      var objData = {
        k: DECODER_RESPONSE.kAudioFrame,
        data: {
          timestamp: timestamp,
          frame_data: data,
        },
      };
      self.postMessage(objData, [objData.data.frame_data.buffer]);
    },
    'viid');

    this.requestCallback = worker.Module.addFunction(function (
      offset,
      availble
    ) {
      var objData = {
        t: DECODER_RESPONSE.kRequestDataEvt,
        o: offset,
        a: availble,
      };
      self.postMessage(objData);
    },
    'vii');

    while (this.tmpReqQueue.length > 0) {
      const req = this.tmpReqQueue.shift();
      if (req) {
        this.processReq(req);
      }
    }
  }

  cacheReq(req: MessageData) {
    if (req) {
      this.tmpReqQueue.push(req);
    }
  }

  // 初始化decoder
  initDecoder({
    type,
    size,
    chunkSize,
  }: {
    size: number;
    type: string;
    chunkSize: number;
  }) {
    const ret = worker.Module._initDecoder(size, this.coreLogLevel);
    this.logger.logInfo('initDecoder return ' + ret + '.');
    if (ret === 0) {
      this.cacheBuffer = worker.Module._malloc(chunkSize);
    }

    worker.postMessage({
      k: DECODER_RESPONSE.kInitDecoderRsp,
      data: { res: ret },
    });
  }

  uninitDecoder() {
    const ret = worker.Module._uninitDecoder();
    this.logger.logInfo('Uninit ffmpeg decoder return ' + ret + '.');
    if (this.cacheBuffer != null) {
      worker.Module._free(this.cacheBuffer);
      this.cacheBuffer = null;
    }
  }

  openDecoder() {
    var paramCount = 7,
      paramSize = 4;
    var paramByteBuffer = worker.Module._malloc(paramCount * paramSize);
    var ret = worker.Module._openDecoder(
      paramByteBuffer,
      paramCount,
      this.videoCallback,
      this.audioCallback,
      this.requestCallback
    );
    this.logger.logInfo('openDecoder return ' + ret);
    if (ret == 0) {
      var paramIntBuff = paramByteBuffer >> 2;
      var paramArray = worker.Module.HEAP32.subarray(
        paramIntBuff,
        paramIntBuff + paramCount
      );
      var duration = paramArray[0];
      var videoPixFmt = paramArray[1];
      var videoWidth = paramArray[2];
      var videoHeight = paramArray[3];
      var audioSampleFmt = paramArray[4];
      var audioChannels = paramArray[5];
      var audioSampleRate = paramArray[6];

      var objData = {
        k: DECODER_RESPONSE.kOpenDecoderRsp,
        data: {
          res: ret,
          audio: {
            sampleFmt: audioSampleFmt,
            channels: audioChannels,
            sampleRate: audioSampleRate,
          },
          video: {
            duration: duration,
            pixFmt: videoPixFmt,
            width: videoWidth,
            height: videoHeight,
          },
        },
      };
      self.postMessage(objData);
    } else {
      self.postMessage({
        k: DECODER_RESPONSE.kOpenDecoderRsp,
        data: {
          res: ret,
        },
      });
    }
    worker.Module._free(paramByteBuffer);
  }

  closeDecoder() {
    this.logger.logInfo('closeDecoder.');
    if (this.decodeTimer) {
      clearInterval(this.decodeTimer);
      this.decodeTimer = null;
      this.logger.logInfo('Decode timer stopped.');
    }

    var ret = worker.Module._closeDecoder();
    this.logger.logInfo('Close ffmpeg decoder return ' + ret + '.');

    self.postMessage({
      k: DECODER_RESPONSE.kCloseDecoderRsp,
      data: {
        res: 0,
      },
    });
  }

  startDecoding(interval: number = 5) {
    if (this.decodeTimer) {
      clearInterval(this.decodeTimer);
    }
    this.decodeTimer = setInterval(this.decode, interval);
  }

  decode = function () {
    var ret = worker.Module._decodeOnePacket();
    if (ret == 7) {
      worker.decoder.logger.logInfo(`Start finish.${performance.now()}`);
      worker.decoder.pauseDecoding();
      self.postMessage({ k: DECODER_RESPONSE.kDecodeFinishedEvt });
    }

    while (ret == 9) {
      //self.decoder.logger.logInfo("One old frame");
      ret = worker.Module._decodeOnePacket();
    }
  };

  pauseDecoding() {
    if (this.decodeTimer) {
      clearInterval(this.decodeTimer);
      this.decodeTimer = null;
    }
  }

  sendData(raw_data: ArrayBuffer) {
    const typedArray = new Uint8Array(raw_data);
    worker.Module.HEAPU8.set(typedArray, this.cacheBuffer);
    worker.Module._sendData(this.cacheBuffer, typedArray.length);
  }

  seekTo() {}

  processReq(messageObj: MessageData) {
    switch (messageObj.k) {
      case DECODER_REQUEST.kInitDecoderReq:
        this.initDecoder(messageObj.data);
        break;
      case DECODER_REQUEST.kUninitDecoderReq:
        this.uninitDecoder();
        break;
      case DECODER_REQUEST.kOpenDecoderReq:
        this.openDecoder();
        break;
      case DECODER_REQUEST.kCloseDecoderReq:
        this.closeDecoder();
        break;
      case DECODER_REQUEST.kStartDecodingReq:
        this.startDecoding();
      case DECODER_REQUEST.kPauseDecodingReq:
        this.pauseDecoding();
        break;
      case DECODER_REQUEST.kFeedDataReq:
        this.sendData(messageObj.data.raw_data);
        break;
      case DECODER_REQUEST.kSeekToReq:
        this.seekTo();
        break;
      default:
        this.logger.logError(`Unsupport messsage ${messageObj.k}`);
    }
  }
}

worker.decoder = new Decoder();
worker.addEventListener('message', (event) => {
  console.log(event);
  if (!worker.decoder) {
    console.log('[Error] Decoder not initialized!');
    return;
  }

  //const raw_data = event.data.data.raw_data;
  if (!worker.decoder.wasmLoaded) {
    worker.decoder.cacheReq(event.data);
    worker.decoder.logger.logInfo('wasm is not loaded, cache data pirority');
    return;
  }

  worker.decoder.processReq(event.data);
});

function onWasmLoaded() {
  if (worker.decoder) {
    worker.decoder.onWasmLoaded();
  } else {
    console.log('[ER] No decoder!');
  }
}
