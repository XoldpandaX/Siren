import type { IAudioTrack } from '../../../domain/entities/i-audio-track';

export type AudioPlayerStoreState = {
  currentTrack: IAudioTrack | null;
  isPlaying: boolean;
};

export type AudioPlayerStoreActions = {
  setCurrentTrack: (audioTrack: IAudioTrack) => void;
  setIsPlaying: (isPlaying: boolean) => void;
};

export interface IAudioPlayerStoreAdapter {
  getState(): AudioPlayerStoreState & AudioPlayerStoreActions;
  useStoreState<T>(selector: (s: AudioPlayerStoreState) => T): T;
}
