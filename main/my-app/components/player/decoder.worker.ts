self.addEventListener('message', (event) => {
  console.log('ggggg~~~ddddd', event);
  postMessage(111);
});
