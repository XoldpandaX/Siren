import type {
  AudioPlayerStoreState,
  IAudioPlayerStoreAdapter,
} from '../contracts/store/audio-player';
import { useAudioPlayerStore } from './audio-player-store';

export const createAudioPlayerStoreAdapter = (): IAudioPlayerStoreAdapter => {
  const { getState } = useAudioPlayerStore;

  return {
    getState,
    useStoreState: <T>(selector: (s: AudioPlayerStoreState) => T): T =>
      useAudioPlayerStore(selector),
  };
};
