import { injectable } from 'inversify';
import type { IUpdateTrackPlaybackPosition } from '../../domain/use-cases/i-update-track-playback-position';
import { type IAudioTrack, updateAudioTrackPlayback } from '../../domain/entities/i-audio-track';

@injectable()
export class UpdateTrackPlaybackPosition implements IUpdateTrackPlaybackPosition {
  public exec(params: { currentTrack: IAudioTrack; playbackPosition: number }): IAudioTrack {
    return updateAudioTrackPlayback(params.currentTrack, params.playbackPosition);
  }
}
