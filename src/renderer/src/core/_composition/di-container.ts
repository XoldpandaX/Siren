import { Container } from 'inversify';
import type { IAudioEngine } from '@shared/types';
import { AudioEngine } from '../audio-engine';

import { diTokens } from './tokens';

export const createRootDiContainer = (): Container => {
  const c: Container = new Container();

  c.bind<IAudioEngine>(diTokens.AUDIO_ENGINE).to(AudioEngine).inSingletonScope();
  return c;
};
