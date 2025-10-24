import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { devtools } from 'zustand/middleware';
import type { IAudioTrack } from '../../domain/entities/i-audio-track';
import type {
  AudioPlayerStoreState,
  AudioPlayerStoreActions,
} from '../contracts/store/audio-player';

const initialState: AudioPlayerStoreState = {
  currentTrack: null,
  isPlaying: false,
};

const getActionType = (actionName: string): { type: string } => ({ type: `todo/${actionName}` });

export const useAudioPlayerStore = create<AudioPlayerStoreState & AudioPlayerStoreActions>()(
  devtools(
    immer((set) => ({
      // State
      ...initialState,

      // Actions
      setCurrentTrack: (audioTrack: IAudioTrack) => {
        set(
          (state) => {
            state.currentTrack = audioTrack;
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
