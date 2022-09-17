// This is a module worker, so we can use imports (in the browser too!)
// import pi from './utils/pi';
//import { PLAYER_REQUEST } from './components/player/common.ts';
// import { Logger } from '../components/player/common';
// console.log(Logger);
const worker = self;
// self.importScripts('/sub_worker.js');

worker.Module = {
  onRuntimeInitialized: function () {
    onWasmLoaded();
  },
};

self.importScripts('/libffmpeg.js');

console.log(worker);

// class Decoder {
//   logger;

//   constructor() {
//     this.logger = new Logger('Decoder');
//   }

//   onWasmLoaded() {}
// }

// worker.decoder = new Decoder();

self.addEventListener('message', (event) => {
  console.log('ggggg~~~', event);
  console.log(self._initDecoder);
  postMessage(111);
});

function onWasmLoaded() {
  console.log('[ER] No decoder!');
}
