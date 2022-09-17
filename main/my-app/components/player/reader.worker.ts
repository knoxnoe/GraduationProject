import { Logger, READER_REQUEAST, READER_RESPONSE } from './common';

interface IWorker extends DedicatedWorkerGlobalScope {
  fileReader: Reader;
}

interface IData {
  file: File;
  chunk_size?: number;
}
type MessageData = {
  k: READER_REQUEAST;
  data: IData;
};

const worker: IWorker = self as any;

const ChunkSize = 65535;

class Reader {
  logger: Logger;
  reader: FileReader;

  size: number = 0;
  type: string | undefined = undefined;
  chunkArr: Blob[] = [];
  start: number = 0;
  end: number = 0;

  curChunkIdx: number = 0;

  constructor() {
    this.logger = new Logger('FileReader');
    this.reader = new FileReader();

    this.reader.addEventListener('loadend', this.handleEvent);
  }

  // 文件信息
  initFileInfo({ file, chunk_size }: IData) {
    console.log(file);

    const chunkSize = chunk_size ?? ChunkSize;

    this.size = file.size;
    this.type = file.type;

    this.start = 0;
    this.end = chunkSize;

    while (this.start < this.size) {
      let blob = file.slice(this.start, this.end);
      this.chunkArr.push(blob);
      this.start = this.end;
      this.end = this.end + chunkSize;
    }
  }

  transferData(data: ArrayBuffer) {
    worker.postMessage(
      {
        k: READER_RESPONSE.KReaderFileRsp,
        data: {
          raw_data: data,
        },
      },
      [data]
    );
  }

  // 读取文件
  readerFileByChunk({ file }: IData) {
    this.reader.readAsArrayBuffer(this.chunkArr[this.curChunkIdx]);
  }

  makeFileChunks(file) {}

  handleEvent = (event) => {
    console.log(event);
    console.log(this.reader.result);
    this.transferData(this.reader.result as ArrayBuffer);
  };
}

worker.fileReader = new Reader();

worker.addEventListener('message', (event) => {
  if (!worker.fileReader) {
    console.log('[Error] File Reader not initialized!');
    return;
  }

  const fileReader = worker.fileReader;

  const objData: MessageData = event.data;
  console.log(objData);
  switch (objData.k) {
    case READER_REQUEAST.kGetFileInfoReq:
      fileReader.initFileInfo(objData.data);
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
