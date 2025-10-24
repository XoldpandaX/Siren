import type { Container } from 'inversify';
import type { IAudioEngine } from '@shared/types';
import { diTokens } from './tokens';

export class RootResolver {
  public constructor(private readonly _diContainer: Container) {}

  public get audioEngine(): IAudioEngine {
    return this._diContainer.get<IAudioEngine>(diTokens.AUDIO_ENGINE);
  }
}
