import { Container } from 'inversify';
import type { IAudioSourceManager } from '../application/ports/services/i-audio-source';
import { AudioSourceManager } from '../infra/services/audio-source-manager';
import type { IMediaLibraryRepository } from '../application/ports/repositories/i-media-library-repository';
import { MediaLibraryRepository } from '../infra/repositories/media-library-repository';
import type { ILoadTrackUseCase } from '../domain/use-cases/i-load-track-use-case';
import { LoadTrackUseCase } from '../application/use-cases/load-track-use-case';
import type { IPlayTrackUseCase } from '../domain/use-cases/i-play-track-use-case';
import { PlayTrackUseCase } from '../application/use-cases/play-track-use-case';
import type { IPauseTrackUseCase } from '../domain/use-cases/i-pause-track-use-case';
import { PauseTrackUseCase } from '../application/use-cases/pause-track-use-case';
import type { IStopTrackUseCase } from '../domain/use-cases/i-stop-track-use-case';
import { StopTrackUseCase } from '../application/use-cases/stop-track-use-case';
import type { IUpdateTrackPlaybackPosition } from '../domain/use-cases/i-update-track-playback-position';
import { UpdateTrackPlaybackPosition } from '../application/use-cases/update-track-playback-position';
import type { IAudioPlayerStoreAdapter } from '../presentation/contracts/store/audio-player';
import { createAudioPlayerStoreAdapter } from '../presentation/store/audio-player-store-adapter';
import type { IAudioPlayerActionsController } from '../presentation/contracts/controllers/i-audio-player-controller';
import { AudioPlayerActionsController } from '../presentation/controllers/audio-player-actions-controller';
import { diTokens } from './tokens';

export const createDiContainer = (): Container => {
  const container: Container = new Container();
  bindInfra(container);
  bindApplication(container);
  bindPresentation(container);

  return container;
};

function bindInfra(c: Container): void {
  c.bind<IAudioSourceManager>(diTokens.AUDIO_SOURCE_MANAGER)
    .to(AudioSourceManager)
    .inSingletonScope();
  c.bind<IMediaLibraryRepository>(diTokens.MEDIA_LIBRARY_REPOSITORY)
    .to(MediaLibraryRepository)
    .inTransientScope();
}

function bindApplication(c: Container): void {
  c.bind<IPlayTrackUseCase>(diTokens.PLAY_TRACK_USE_CASE).to(PlayTrackUseCase).inTransientScope();
  c.bind<IPauseTrackUseCase>(diTokens.PAUSE_TRACK_USE_CASE)
    .to(PauseTrackUseCase)
    .inTransientScope();
  c.bind<IStopTrackUseCase>(diTokens.STOP_TRACK_USE_CASE).to(StopTrackUseCase).inTransientScope();
  c.bind<ILoadTrackUseCase>(diTokens.LOAD_TRACK_USE_CASE).to(LoadTrackUseCase).inTransientScope();
  c.bind<IUpdateTrackPlaybackPosition>(diTokens.UPDATE_TRACK_PLAYBACK_POSITION_USE_CASE)
    .to(UpdateTrackPlaybackPosition)
    .inTransientScope();
}

function bindPresentation(c: Container): void {
  c.bind<IAudioPlayerStoreAdapter>(diTokens.AUDIO_PLAYER_STORE_ADAPTER).toConstantValue(
    createAudioPlayerStoreAdapter()
  );
  c.bind<IAudioPlayerActionsController>(diTokens.AUDIO_PLAYER_CONTROLLER)
    .to(AudioPlayerActionsController)
    .inSingletonScope();
}
