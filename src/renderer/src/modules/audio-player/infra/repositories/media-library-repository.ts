import type { IAudioTrackDTO } from '@shared/types';
import type { IMediaLibraryRepository } from '../../application/ports/repositories/i-media-library-repository';

export class MediaLibraryRepository implements IMediaLibraryRepository {
  public async getAudioTrack(): Promise<IAudioTrackDTO> {
    try {
      const audioTrack = await window.electronApi.dialog.openFile();
      if (!audioTrack) {
        throw new Error('some error');
      }

      return audioTrack;
    } catch (e) {
      console.error(e);
      throw e;
    }
  }
}
