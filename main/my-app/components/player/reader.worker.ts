import { Logger, READER_REQUEAST } from './common';

interface IWorker extends DedicatedWorkerGlobalScope {
  fileReader: Reader;
}

const worker: IWorker = self as any;

class Reader {
  logger: Logger;
  reader: FileReader;

  constructor() {
    this.logger = new Logger('FileReader');
    this.reader = new FileReader();

    this.reader.addEventListener('loadend', this.handleEvent);
    this.reader.onload = function () {
      console.log(this.result);
    };
  }

  // 获取文件信息
  getFileInfo() {}

  // 读取文件
  readerFileByChunk(data: any) {
    console.log(data);

    this.reader.readAsArrayBuffer(data.file);
  }

  handleEvent = (event) => {
    console.log(event);
    console.log(this.reader.result);
  };
}

worker.fileReader = new Reader();

worker.addEventListener('message', (event) => {
  if (!worker.fileReader) {
    console.log('[Error] File Reader not initialized!');
    return;
  }

  const fileReader = worker.fileReader;

  const objData: { k: READER_REQUEAST; data: any } = event.data;

  console.log('ggg');

  switch (objData.k) {
    case READER_REQUEAST.kGetFileInfoReq:
      fileReader.getFileInfo();
      break;

    case READER_REQUEAST.KReaderFileReq:
      fileReader.readerFileByChunk(objData.data);
      break;

    case READER_REQUEAST.KCloseReaderReq:
      break;
    default:
      fileReader.logger.logError(`[Error] unsupport messge ${objData.k}`);
  }
});
