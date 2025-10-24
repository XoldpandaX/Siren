import { injectable, inject } from 'inversify';
import type { IAudioEngine } from '@shared/types';
import type { ILoadTrackUseCase, Config } from '../../domain/use-cases/i-load-track-use-case';
import type { IMediaLibraryRepository } from '../ports/repositories/i-media-library-repository';
import type { IAudioTrack } from '../../domain/entities/i-audio-track';
import { mapDtoToAudioTrack } from '../mappers/map-dto-to-audio-track';
import { diTokens } from '../../_composition/tokens';

@injectable()
export class LoadTrackUseCase implements ILoadTrackUseCase {
  public constructor(
    @inject(diTokens.MEDIA_LIBRARY_REPOSITORY)
    private readonly _mediaLibraryRepository: IMediaLibraryRepository,
    @inject(diTokens.AUDIO_ENGINE)
    private readonly _audioEngine: IAudioEngine
  ) {}
  public async exec({ onTimeUpdate }: Config): Promise<IAudioTrack> {
    try {
      const audioTrackDTO = await this._mediaLibraryRepository.getAudioTrack();
      const audioTrack = mapDtoToAudioTrack(audioTrackDTO);

      this._audioEngine.subscribe('timeUpdate', onTimeUpdate);
      this._audioEngine.load({
        audioBuffer: audioTrackDTO.audioBuffer,
        mimeType: audioTrackDTO.mimeType,
      });

      return audioTrack;
    } catch (e) {
      console.error(e);
      throw e;
    }
  }
}
