const Stream = require('stream');

const Readable = Stream.Readable;

class ToReadable extends Readable {
  constructor(iterator) {
    super();
    this.iterator = iterator;
  }

  // 子类需要实现该方法
  _read() {
    const res = this.iterator.next();
    if(res.done) {
      return this.push(null);
    }
    setTimeout(() => {
      this.push(res.value + '\n');
    }, 0)
  }
}

module.exports = ToReadable;