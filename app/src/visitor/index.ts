// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
import Worker from '../workers/test.worker';
// import Worker from "worker-loader!../workers/test.worker";

// const worker = new Worker(
//   new URL('../workers/test.worker.ts', import.meta.url),
// );
const worker = new Worker();
console.log(worker);

worker.onmessage = ({ data: { answer } }) => {
  console.log(answer);
};

class TransData {
  getData() {
    console.log('get data');
    return 'dd';
  }
}
const trans = new TransData();

export default {
  init: () => {
    console.log('init');
    worker.postMessage(trans)
  },
  msg: () => {
  console.log('post msg')
  worker.postMessage('gggg')
  // console.log(worker)
}}
