import { inject, injectable } from 'inversify';
import type { IAudioPlayerActionsController } from '../contracts/controllers/i-audio-player-controller';
import type { IAudioPlayerStoreAdapter } from '../contracts/store/audio-player';
import type { ILoadTrackUseCase } from '../../domain/use-cases/i-load-track-use-case';
import type { IPlayTrackUseCase } from '../../domain/use-cases/i-play-track-use-case';
import type { IPauseTrackUseCase } from '../../domain/use-cases/i-pause-track-use-case';
import type { IStopTrackUseCase } from '../../domain/use-cases/i-stop-track-use-case';
import { diTokens } from '../../_composition/tokens';

@injectable()
export class AudioPlayerActionsController implements IAudioPlayerActionsController {
  public constructor(
    @inject(diTokens.AUDIO_PLAYER_STORE_ADAPTER)
    private _audioPlayerStore: IAudioPlayerStoreAdapter,
    @inject(diTokens.LOAD_TRACK_USE_CASE)
    private readonly _loadTrack: ILoadTrackUseCase,
    @inject(diTokens.PLAY_TRACK_USE_CASE)
    private readonly _playTrack: IPlayTrackUseCase,
    @inject(diTokens.PAUSE_TRACK_USE_CASE)
    private readonly _pauseTrack: IPauseTrackUseCase,
    @inject(diTokens.STOP_TRACK_USE_CASE)
    private readonly _stopTrack: IStopTrackUseCase
  ) {}

  public useIsPlaying(): boolean {
    return this._audioPlayerStore.useStoreState((s) => s.isPlaying);
  }

  public async loadTrack(): Promise<void> {
    try {
      await this._loadTrack.exec({});
      this._audioPlayerStore.getState().setIsPlaying(true);
    } catch (e) {
      console.error(e);
    }
  }

  public playTrack = (): void => {
    this._playTrack.exec();
    this._audioPlayerStore.getState().setIsPlaying(true);
  };

  public pauseTrack = (): void => {
    this._pauseTrack.exec();
    this._audioPlayerStore.getState().setIsPlaying(false);
  };

  public stopTrack = (): void => {
    this._stopTrack.exec();
    this._audioPlayerStore.getState().setIsPlaying(false);
  };
}
