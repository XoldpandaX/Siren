import { injectable, inject } from 'inversify';
import type { IAudioEngine } from '@shared/types';
import type { IStopTrackUseCase } from '../../domain/use-cases/i-stop-track-use-case';
import { diTokens } from '../../_composition/tokens';

@injectable()
export class StopTrackUseCase implements IStopTrackUseCase {
  public constructor(
    @inject(diTokens.AUDIO_ENGINE)
    private readonly _audioEngine: IAudioEngine
  ) {}

  public exec(): void {
    this._audioEngine.stop();
  }
}
