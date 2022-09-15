import { Logger } from './common';
const worker: DedicatedWorkerGlobalScope = self as any;
class Reader {
  logger;
  reader;

  constructor() {
    this.logger = new Logger('FileReader');
    this.reader = new FileReader();
  }
}

self.addEventListener('message', (event) => {
  console.log('ggggg~~~rrr', event);
  postMessage(111);
});

self.fileReader = new Reader();
