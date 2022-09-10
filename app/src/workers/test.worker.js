// import { createFFmpeg } from '@ffmpeg/ffmpeg';
// console.log('gggg')
// const ffmpeg = createFFmpeg({ log: true });
// console.log(ffmpeg)

// importScripts('../static/index.js')

// console.log(test);
// test()

onmessage = (data) => {

  console.log(data)
  self.postMessage({
    answer: 42,
  });
};




