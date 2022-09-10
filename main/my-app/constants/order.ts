export enum VIDEO_TYPE {
  MP4 = 'mp4',
  MOV = 'mov',
  FLV = 'flv',
  AVI = 'avi',
  MPG = 'mpg',
}

export const videoType = [
  { value: VIDEO_TYPE.MP4, label: VIDEO_TYPE.MP4 },
  { value: VIDEO_TYPE.MOV, label: VIDEO_TYPE.MOV },
  { value: VIDEO_TYPE.FLV, label: VIDEO_TYPE.FLV },
  { value: VIDEO_TYPE.AVI, label: VIDEO_TYPE.AVI },
  { value: VIDEO_TYPE.MPG, label: VIDEO_TYPE.MPG },
];

export const RESOURCE_PREFIX = 'resource_';
