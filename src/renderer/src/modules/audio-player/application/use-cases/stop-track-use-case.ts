import { injectable, inject } from 'inversify';
import type { IStopTrackUseCase } from '../../domain/use-cases/i-stop-track-use-case';
import type { IAudioSourceManager } from '../ports/services/i-audio-source';
import { diTokens } from '../../_composition/tokens';

@injectable()
export class StopTrackUseCase implements IStopTrackUseCase {
  public constructor(
    @inject(diTokens.AUDIO_SOURCE_MANAGER) private readonly _audioSourceManager: IAudioSourceManager
  ) {}

  public exec(): void {
    this._audioSourceManager.stop();
  }
}
