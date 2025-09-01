import type { Nullable } from '../util';

export interface IAudioTrackDTO {
  id: string;
  path: string;
  mimeType: string;
  audioBuffer: Buffer<ArrayBufferLike>;
  no: Nullable<number>;
  artist: Nullable<string>;
  title: Nullable<string>;
  album: Nullable<string>;
  year: Nullable<number>;
  duration: Nullable<number>;
}
