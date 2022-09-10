const net = require('net');

for(let i = 0; i < 10; i++) {
  net.connect({port: 11111});
}