export type AudioPlayerStoreState = {
  currentTrack: string;
  isPlaying: boolean;
};

export type AudioPlayerStoreActions = {
  setCurrentTrack: (track: string) => void;
  setIsPlaying: (isPlaying: boolean) => void;
};

export interface IAudioPlayerStoreAdapter {
  getState(): AudioPlayerStoreState & AudioPlayerStoreActions;
  useStoreState<T>(selector: (s: AudioPlayerStoreState) => T): T;
}
