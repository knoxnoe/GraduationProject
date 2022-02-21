const AnyProxy = require('anyproxy');
const os = require('os');
const { exec } = require('child_process');
const path = require('path');

const options = {
  port: 8001,
  webInterface: {
    enable: true,
    webPort: 8002,
  },
  forceProxyHttps: true,
  wsIntercept: false, // 不开启websocket代理
  silent: true,
};

class Network {
  constructor() {
    this.mockList = [];
    this.proxyServer = null;
    this.ipAddress = null;
  }

  checkCA() {
    if (!AnyProxy.utils.certMgr.ifRootCAFileExists()) {
      AnyProxy.utils.certMgr.generateRootCA((error, keyPath) => {
        // let users to trust this CA before using proxy
        if (!error) {
          const certDir = path.dirname(keyPath);
          console.log('The cert is generated at', certDir);
          const isWin = /^win/.test(process.platform);
          if (isWin) {
            exec('start .', { cwd: certDir });
          } else {
            exec('open .', { cwd: certDir });
          }
        } else {
          console.error('error when generating rootCA', error);
        }
      });
    }
  }

  initNetwork(
    op,
    { beforeSendRequest, beforeSendResponse, success, onRecord }
  ) {
    if (op === 'start') {
      if (!this.proxyServer || !this.proxyServer.recorder) {
        // const _this = this;
        console.log('anyproxy')
        options.rule = {
          *beforeSendRequest(requestDetail) {
            if (beforeSendRequest) {
              return beforeSendRequest(requestDetail);
            }
            return requestDetail;
          },
          *beforeSendResponse(requestDetail, responseDetail) {
            if (beforeSendResponse) {
              return beforeSendResponse(requestDetail, responseDetail);
            }
            return responseDetail;
          },
        };
        this.proxyServer = new AnyProxy.ProxyServer(options);
        AnyProxy.utils.systemProxyMgr.enableGlobalProxy('127.0.0.1', '8001');
        this.proxyServer.once('ready', () => {
          console.log('启动完成');
          success?.(this.proxyServer);
        });
      }
      this.proxyServer.start();
    } else {
      AnyProxy.utils.systemProxyMgr.disableGlobalProxy('http');
      AnyProxy.utils.systemProxyMgr.disableGlobalProxy('https');
      this.proxyServer.close();
      success?.();
    }
  }

  getIPAddress() {
    const interfaces = os.networkInterfaces();
    console.log('interfaces', interfaces);
    // for (const devName in interfaces) {
    //   const iface = interfaces[devName];
    //   for (let i = 0; i < iface.length; i++) {
    //     const alias = iface[i];
    //     if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
    //       this.ipAddress = alias.address;
    //     }
    //   }
    // }
    this.ipAddress = '127.0.0.1';
  }
}

const proxy = new Network();
exports.proxy = proxy;
