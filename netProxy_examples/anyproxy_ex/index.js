const AnyProxy = require('anyproxy');

const options = {
  port: 8001,
  //rule: require('myRuleModule'),
  webInterface: {
    enable: true,
    webPort: 8002,
  },
  throttle: 10000,
  forceProxyHttps: false,
  wsIntercept: false, // 不开启websocket代理
  silent: false,
}
const proxyServer = new AnyProxy.ProxyServer(options)

console.log('rootca', AnyProxy.utils.certMgr.ifRootCAFileExists())
proxyServer.start()

//when finished
// proxyServer.close()
