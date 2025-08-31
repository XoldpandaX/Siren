import type { Container } from 'inversify';
import type { IAudioPlayerActionsController } from '../presentation/contracts/controllers/i-audio-player-controller';
import { diTokens } from './tokens';

export interface IResolver {
  audioPlayerController: IAudioPlayerActionsController;
}

export class Resolver implements IResolver {
  public constructor(private readonly diContainer: Container) {}
  public get audioPlayerController(): IAudioPlayerActionsController {
    return this.diContainer.get<IAudioPlayerActionsController>(diTokens.AUDIO_PLAYER_CONTROLLER);
  }
}
