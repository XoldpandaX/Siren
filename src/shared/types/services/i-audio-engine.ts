import { type IDisposable } from '@lib/types';

export type AudioSourceConfig = Partial<{
  onEnd(): void;
  onStop(): void;
  onTimeUpdate(seconds: number): void;
}>;

export interface IAudioEngineEvents {
  timeUpdate(seconds: number): void;
  stop(): void;
  end(): void;
}

export interface IAudioEngine extends IDisposable {
  subscribe<E extends keyof IAudioEngineEvents>(
    event: E,
    handler: IAudioEngineEvents[E]
  ): () => void;
  load(source: { audioBuffer: Buffer<ArrayBufferLike>; mimeType: string }): void;
  play(): void;
  pause(): void;
  stop(): void;
  seek(playbackPosition: number): void;
}
