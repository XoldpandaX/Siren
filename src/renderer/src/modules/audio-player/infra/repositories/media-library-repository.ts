import type { IMediaLibraryRepository } from '../../application/ports/repositories/i-media-library-repository';

export class MediaLibraryRepository implements IMediaLibraryRepository {
  public async getAudioTrack(): Promise<{ path: string }> {
    try {
      const file = await window.electronApi.dialog.openFile();
      if (!file) {
        throw new Error('some error');
      }

      const { mimeType, buffer } = file;
      const blob = new Blob([new Uint8Array(buffer)], { type: `audio/${mimeType}` });
      const audioFilePath = URL.createObjectURL(blob);

      return {
        path: audioFilePath,
      };
    } catch (e) {
      console.error(e);
      throw e;
    }
  }
}
