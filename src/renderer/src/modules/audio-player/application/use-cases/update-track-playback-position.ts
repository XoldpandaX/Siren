import { injectable } from 'inversify';
import type { IUpdateTrackPlaybackPosition } from '../../domain/use-cases/i-update-track-playback-position';
import {
  type IAudioTrack,
  updateAudioTrackPlaybackPosition,
} from '../../domain/entities/i-audio-track';

@injectable()
export class UpdateTrackPlaybackPosition implements IUpdateTrackPlaybackPosition {
  public exec(params: { currentTrack: IAudioTrack; playbackPosition: number }): IAudioTrack {
    return updateAudioTrackPlaybackPosition(params.currentTrack, params.playbackPosition);
  }
}
