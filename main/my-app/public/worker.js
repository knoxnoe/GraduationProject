// This is a module worker, so we can use imports (in the browser too!)
// import pi from './utils/pi';
//import { PLAYER_REQUEST } from './components/player/common.ts';
self.Module = {
  onRuntimeInitialized: function () {
    onWasmLoaded();
  },
};

console.log(self);

self.importScripts('/sub_worker.js');
self.importScripts('/libffmpeg.js');

self.addEventListener('message', (event) => {
  console.log('ggggg~~~', event);
  console.log(self._initDecoder);
  postMessage(111);
});

function onWasmLoaded() {
  console.log('[ER] No decoder!');
}
