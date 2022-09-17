import { Logger } from './common';

const worker = self as any;

worker.Module = {
  onRuntimeInitialized: function () {
    onWasmLoaded();
  },
};

worker.importScripts('./libffmpeg.js');

console.log(worker);

class Decoder {
  logger: Logger;

  constructor() {
    this.logger = new Logger('Decoder');
  }

  onWasmLoaded() {}
}

worker.decoder = new Decoder();

worker.addEventListener('message', (event) => {
  console.log(event);
});

function onWasmLoaded() {
  if (worker.decoder) {
    worker.decoder.onWasmLoaded();
  } else {
    console.log('[ER] No decoder!');
  }
}
