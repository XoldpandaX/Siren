export interface IAudioPlayerActionsController {
  useIsPlaying: () => boolean;
  loadTrack(): Promise<void>;
  playTrack(): void;
  pauseTrack(): void;
  stopTrack(): void;
}
