import { injectable, inject } from 'inversify';
import type { IAudioEngine } from '@shared/types';
import type { IPlayTrackUseCase } from '../../domain/use-cases/i-play-track-use-case';
import { diTokens } from '../../_composition/tokens';

@injectable()
export class PlayTrackUseCase implements IPlayTrackUseCase {
  public constructor(
    @inject(diTokens.AUDIO_ENGINE)
    private readonly _audioEngine: IAudioEngine
  ) {}

  public exec(): void {
    this._audioEngine.play();
  }
}
