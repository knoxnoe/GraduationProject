//Player request.
export enum PLAYER_REQUEST {
  kPlayVideoReq,
  kPauseVideoReq,
  kStopVideoReq,
}

//Player response.
export enum PLAYER_RESPONSE {
  kPlayVideoRsp,
  kAudioInfo,
  kVideoInfo,
  kAudioData,
  kVideoData,
}

// Reader
export enum READER_REQUEAST {
  kGetFileInfoReq,
  KReaderFileReq,
  KCloseReaderReq,
}

export enum READER_RESPONSE {
  KGetFileInfoRsp,
  KReaderFileRsp,
  KCloseReaderRsp,
}

//Downloader request.
const kGetFileInfoReq = 0;
const kDownloadFileReq = 1;
const kCloseDownloaderReq = 2;

//Downloader response.
const kGetFileInfoRsp = 0;
const kFileData = 1;

//Downloader Protocol.
const kProtoHttp = 0;
const kProtoWebsocket = 1;

//Decoder request.
export enum DECODER_REQUEST {
  kInitDecoderReq,
  kUninitDecoderReq,
  kOpenDecoderReq,
  kCloseDecoderReq,
  kFeedDataReq,
  kStartDecodingReq,
  kPauseDecodingReq,
  kSeekToReq,
}

//Decoder response.
export enum DECODER_RESPONSE {
  kInitDecoderRsp,
  kUninitDecoderRsp,
  kOpenDecoderRsp,
  kCloseDecoderRsp,
  kVideoFrame,
  kAudioFrame,
  kStartDecodingRsp,
  kPauseDecodingRsp,
  kDecodeFinishedEvt,
  kRequestDataEvt,
  kSeekToRsp,
}

export class Logger {
  module: any;
  constructor(module: any) {
    this.module = module;
  }

  currentTimeStr = function () {
    var now = new Date(Date.now());
    var year = now.getFullYear();
    var month = now.getMonth() + 1;
    var day = now.getDate();
    var hour = now.getHours();
    var min = now.getMinutes();
    var sec = now.getSeconds();
    var ms = now.getMilliseconds();
    return (
      year +
      '-' +
      month +
      '-' +
      day +
      ' ' +
      hour +
      ':' +
      min +
      ':' +
      sec +
      ':' +
      ms
    );
  };

  log = function (line: string) {
    console.log('[' + this.currentTimeStr() + '][' + this.module + ']' + line);
  };

  logError = function (line: string) {
    console.log(
      '[' + this.currentTimeStr() + '][' + this.module + '][ER] ' + line
    );
  };

  logInfo = function (line: string) {
    console.log(
      '[' + this.currentTimeStr() + '][' + this.module + '][IF] ' + line
    );
  };

  logDebug = function (line: string) {
    console.log(
      '[' + this.currentTimeStr() + '][' + this.module + '][DT] ' + line
    );
  };
}
