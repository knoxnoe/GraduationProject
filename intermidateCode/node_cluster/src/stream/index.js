const Stream = require('stream');
const fs = require('fs');
const ToReadable = require('./ToReadable');

const Readable = Stream.Readable;
const Writeable = Stream.Writable;
const Duplex = Stream.Duplex;
const Transform = Stream.Transform;

// 把一个文件创建成一个流
// fs.createReadStream('./file.txt').pipe(process.stdout)

const iterator = function(limit) {
  return {
    next: function() {
      if(limit--) {
        return { done: false, value: limit + Math.random() }
      }
      return { done: true };
    }
  }
}(1e10)

const readable = new ToReadable(iterator);

//process.stdout.write
readable.on('data', data => console.log(data));
readable.on('end', () => process.stdout.write('DONE'));