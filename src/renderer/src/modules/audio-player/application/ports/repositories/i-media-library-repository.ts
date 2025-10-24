import type { IAudioTrackDTO } from '@shared/types';

export interface IMediaLibraryRepository {
  getAudioTrack(): Promise<IAudioTrackDTO>;
}
