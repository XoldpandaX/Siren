export interface IAudioTrack {
  id: string;
  path: string; // path to track in file system
  no: number; // track number
  artist: string;
  title: string;
  album: string;
  year: number;
  duration: number;
  playbackPosition: number;
  playbackProgress: number;
}

export const createAudioTrack = (
  audioTrack: Omit<IAudioTrack, 'playbackPosition' | 'playbackProgress'>
): IAudioTrack => {
  return {
    ...audioTrack,
    playbackPosition: 0,
    playbackProgress: 0,
  };
};

export const updateAudioTrackPlayback = (
  audioTrack: IAudioTrack,
  playbackPosition: number
): IAudioTrack => ({
  ...audioTrack,
  playbackPosition,
  playbackProgress:
    playbackPosition !== 0 ? (audioTrack.playbackPosition / audioTrack.duration) * 100 : 0,
});
