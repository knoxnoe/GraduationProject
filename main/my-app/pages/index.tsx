import type { NextPage } from 'next';
import { useCallback, useRef } from 'react';

const Home: NextPage = () => {
  const workerRef = useRef<Worker>({} as Worker);

  // useEffect(() => {
  //   workerRef.current = new Worker(
  //     new URL('../public/worker.js', import.meta.url)
  //   );
  //   workerRef.current.onmessage = (evt) =>
  //     console.log(`WebWorker Response => ${evt.data}`);

  //   return () => {
  //     workerRef.current.terminate();
  //   };
  // }, []);

  const handleWork = useCallback(async () => {
    workerRef.current.postMessage(100000);
  }, []);

  return (
    <div>
      <p>Do work in a WebWorker!</p>
      <button onClick={handleWork}>Calculate PI</button>
    </div>
  );
};

export default Home;
