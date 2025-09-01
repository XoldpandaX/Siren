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
}

export const createAudioTrack = (
  audioTrack: Omit<IAudioTrack, 'playbackPosition'>
): IAudioTrack => {
  return {
    ...audioTrack,
    playbackPosition: 0,
  };
};

export const updateAudioTrackPlaybackPosition = (
  audioTrack: IAudioTrack,
  playbackPosition: number
): IAudioTrack => ({ ...audioTrack, playbackPosition });

export const getPlaybackProgress = (audioTrack: IAudioTrack): number =>
  (audioTrack.playbackPosition / audioTrack.duration) * 100;
