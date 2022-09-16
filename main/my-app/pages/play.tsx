import MediaPlayer from '@/components/player';
import { useRef } from 'react';

const Play = () => {
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

  return (
    <>
      <MediaPlayer></MediaPlayer>
    </>
  );
};

export default Play;
