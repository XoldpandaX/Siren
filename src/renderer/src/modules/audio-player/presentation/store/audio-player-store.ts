import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { devtools } from 'zustand/middleware';
import type {
  AudioPlayerStoreState,
  AudioPlayerStoreActions,
} from '../contracts/store/audio-player';

const initialState: AudioPlayerStoreState = {
  currentTrack: '',
  isPlaying: false,
};

const getActionType = (actionName: string): { type: string } => ({ type: `todo/${actionName}` });

export const useAudioPlayerStore = create<AudioPlayerStoreState & AudioPlayerStoreActions>()(
  devtools(
    immer((set) => ({
      // State
      ...initialState,

      // Actions
      setCurrentTrack: (currentTrack: string) => {
        set(
          (state) => {
            state.currentTrack = currentTrack;
          },
          undefined,
          getActionType('setCurrentTrack')
        );
      },
      setIsPlaying: (isPlaying) =>
        set(
          (state) => {
            state.isPlaying = isPlaying;
          },
          undefined,
          getActionType('setIsPlaying')
        ),
    })),
    { name: 'todo', store: 'TodoStore', enabled: true }
  )
);
