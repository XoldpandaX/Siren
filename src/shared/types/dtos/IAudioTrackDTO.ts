import { type Nullable } from '@shared/types';

export interface IAudioTrackDTO {
  id: string;
  path: string;
  mimeType: string;
  audioBuffer: Buffer<ArrayBufferLike>;
  no: Nullable<number>;
  artist?: string;
  title?: string;
  album?: string;
  year?: number;
  duration?: number;
}
