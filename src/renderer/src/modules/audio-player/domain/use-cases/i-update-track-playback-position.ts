import type { IUseCase } from '@lib/clean';
import type { IAudioTrack } from '../entities/i-audio-track';

export interface IUpdateTrackPlaybackPosition
  extends IUseCase<IAudioTrack, { currentTrack: IAudioTrack; playbackPosition: number }> {}
