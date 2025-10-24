import type { IAudioTrack } from '../../../domain/entities/i-audio-track';

export interface IAudioPlayerActionsController {
  useIsPlaying: () => boolean;
  useCurrentTrack: () => IAudioTrack | null;
  loadTrack(): Promise<void>;
  playTrack(): void;
  pauseTrack(): void;
  stopTrack(): void;
  seekTrack(playbackPosition: number): void;
}
