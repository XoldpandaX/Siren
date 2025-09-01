import { injectable, inject } from 'inversify';
import type { ILoadTrackUseCase, Config } from '../../domain/use-cases/i-load-track-use-case';
import type { IAudioSourceManager } from '../ports/services/i-audio-source';
import type { IMediaLibraryRepository } from '../ports/repositories/i-media-library-repository';
import type { IAudioTrack } from '../../domain/entities/i-audio-track';
import { mapDtoToAudioTrack } from '../mappers/map-dto-to-audio-track';
import { diTokens } from '../../_composition/tokens';

@injectable()
export class LoadTrackUseCase implements ILoadTrackUseCase {
  public constructor(
    @inject(diTokens.MEDIA_LIBRARY_REPOSITORY)
    private readonly _mediaLibraryRepository: IMediaLibraryRepository,
    @inject(diTokens.AUDIO_SOURCE_MANAGER)
    private readonly _audioSourceManager: IAudioSourceManager
  ) {}
  public async exec({ config }: { config: Config }): Promise<IAudioTrack> {
    try {
      const audioTrackDTO = await this._mediaLibraryRepository.getAudioTrack();
      const audioTrack = mapDtoToAudioTrack(audioTrackDTO);

      const { audioBuffer, mimeType } = audioTrackDTO;
      this._audioSourceManager.load({ audioBuffer, mimeType }, config);

      return audioTrack;
    } catch (e) {
      console.error(e);
      throw e;
    }
  }
}
