import type { IUseCase } from '@lib';
import type { IAudioTrack } from '../entities/i-audio-track';

export type Config = Partial<{
  onEnd(): void;
  onStop(): void;
  onTimeUpdate(seconds: number): void;
}>;

export interface ILoadTrackUseCase extends IUseCase<Promise<IAudioTrack>, { config?: Config }> {}
