import { injectable, inject } from 'inversify';
import type { IPauseTrackUseCase } from '../../domain/use-cases/i-pause-track-use-case';
import type { IAudioSourceManager } from '../ports/services/i-audio-source';
import { diTokens } from '../../_composition/tokens';

@injectable()
export class PauseTrackUseCase implements IPauseTrackUseCase {
  public constructor(
    @inject(diTokens.AUDIO_SOURCE_MANAGER) private readonly _audioSourceManager: IAudioSourceManager
  ) {}

  public exec(): void {
    this._audioSourceManager.pause();
  }
}
