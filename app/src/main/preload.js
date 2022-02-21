const { contextBridge, ipcRenderer } = require('electron');
const { proxy } = require('./proxy/index');

contextBridge.exposeInMainWorld('electron', {
  ipc: {
    myPing() {
      ipcRenderer.send('ipc-example', 'ping');
    },
    on(channel, func) {
      const validChannels = ['ipc-example'];
      if (validChannels.includes(channel)) {
        // Deliberately strip event as it includes `sender`
        ipcRenderer.on(channel, (event, ...args) => func(...args));
      }
    },
    once(channel, func) {
      const validChannels = ['ipc-example'];
      if (validChannels.includes(channel)) {
        // Deliberately strip event as it includes `sender`
        ipcRenderer.once(channel, (event, ...args) => func(...args));
      }
    },
  },
  proxy: {
    start(callback) {
      console.log('gggg');
      ipcRenderer.send('proxy', callback);
    },
    stop() {
      proxy.initNetwork('stop', {});
    },
  },
});
