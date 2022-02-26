const childProcess = require('child_process');
const net = require('net');

const workers = [];
const workerNum = 10;
let index = 0;
for(let i = 0; i < workerNum; i++) {
  workers.push(childProcess.fork('./src/cluster/child.js', { env: { index: i}}));
}

const server = net.createServer((client) => {
  workers[index].send(null, client);
  console.log('dispatch to', index);
  index = (index + 1) % workerNum;
});

server.listen(11111);