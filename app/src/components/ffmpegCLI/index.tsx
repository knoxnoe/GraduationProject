import { createFFmpeg } from '@ffmpeg/ffmpeg';

const ffmpegCli = createFFmpeg({ log: true });

export default ffmpegCli;
