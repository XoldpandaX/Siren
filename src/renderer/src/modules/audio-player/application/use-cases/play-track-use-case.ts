import { injectable, inject } from 'inversify';
import type { IPlayTrackUseCase } from '../../domain/use-cases/i-play-track-use-case';
import type { IAudioSourceManager } from '../ports/services/i-audio-source';
import { diTokens } from '../../_composition/tokens';

@injectable()
export class PlayTrackUseCase implements IPlayTrackUseCase {
  public constructor(
    @inject(diTokens.AUDIO_SOURCE_MANAGER) private readonly _audioSourceManager: IAudioSourceManager
  ) {}

  public exec(): void {
    this._audioSourceManager.play();
  }
}
