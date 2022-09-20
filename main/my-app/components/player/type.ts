export interface IDecoderRsp {
  res: number; // 正常为0
  audio: {
    sampleFmt: any;
    channels: any;
    sampleRate: any;
  };
  video: {
    duration: any;
    pixFmt: any;
    width: number;
    height: number;
  };

  timestamp: any;
  frame_data: any;
}

export type FrameData = {
  timestamp: any;
  frame_data: any;
};
