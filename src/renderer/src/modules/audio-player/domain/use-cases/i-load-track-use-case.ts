import type { IUseCase } from '@lib/clean';
import type { IAudioTrack } from '../entities/i-audio-track';

export type Config = {
  onTimeUpdate(seconds: number): void;
};

export interface ILoadTrackUseCase extends IUseCase<Promise<IAudioTrack>, Config> {}
