import { injectable, inject } from 'inversify';
import type { IAudioEngine } from '@shared/types';
import type { IPauseTrackUseCase } from '../../domain/use-cases/i-pause-track-use-case';
import { diTokens } from '../../_composition/tokens';

@injectable()
export class PauseTrackUseCase implements IPauseTrackUseCase {
  public constructor(
    @inject(diTokens.AUDIO_ENGINE)
    private readonly _audioEngine: IAudioEngine
  ) {}

  public exec(): void {
    this._audioEngine.pause();
  }
}
