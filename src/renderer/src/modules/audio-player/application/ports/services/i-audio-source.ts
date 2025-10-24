export interface IAudioSource {
  play(): void;
  pause(): void;
  stop(): void;
  seek(playbackPosition: number): void;
  dispose(): void;
}

export type AudioSourceConfig = Partial<{
  onEnd(): void;
  onStop(): void;
  onTimeUpdate(seconds: number): void;
}>;

export interface IAudioSourceManager extends Omit<IAudioSource, 'dispose'> {
  load(
    source: { audioBuffer: Buffer<ArrayBufferLike>; mimeType: string },
    config: AudioSourceConfig
  ): void;
}
