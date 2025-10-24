import { injectable, inject } from 'inversify';
import type { IAudioEngine } from '@shared/types';
import type { ISeekTrackUseCase } from '../../domain/use-cases/i-seek-track-use-case';
import { diTokens } from '../../_composition/tokens';

@injectable()
export class SeekTrackUseCase implements ISeekTrackUseCase {
  public constructor(
    @inject(diTokens.AUDIO_ENGINE)
    private readonly _audioEngine: IAudioEngine
  ) {}

  public exec(playbackPosition: number): void {
    this._audioEngine.seek(playbackPosition);
  }
}
