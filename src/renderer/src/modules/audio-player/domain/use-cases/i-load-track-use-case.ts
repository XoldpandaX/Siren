import type { IUseCase } from '@lib';

export type Config = Partial<{
  onEnd(): void;
  onStop(): void;
  onTimeUpdate(seconds: number): void;
}>;

export interface ILoadTrackUseCase extends IUseCase<Promise<void>, { config?: Config }> {}
