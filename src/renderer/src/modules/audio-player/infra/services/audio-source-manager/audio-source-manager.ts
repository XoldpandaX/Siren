import type {
  IAudioSourceManager,
  IAudioSource,
  AudioSourceConfig,
} from '../../../application/ports/services/i-audio-source';
import { AudioSource } from './audio-source';
import { createAudioUrl } from '../../utils/create-audio-url';

type ActionType = 'play' | 'pause' | 'stop';

export class AudioSourceManager implements IAudioSourceManager {
  private _audio: IAudioSource | null = null;

  public load(
    source: { audioBuffer: Buffer<ArrayBufferLike>; mimeType: string },
    config: AudioSourceConfig
  ): void {
    if (this._audio) {
      this._audio.dispose();
      this._audio = null;
    }

    this._audio = new AudioSource(createAudioUrl(source.audioBuffer, source.mimeType), config);
    this._audio.play();
  }

  public play(): void {
    const audio = this.getAudioOrError('play');
    audio.play();
  }

  public pause(): void {
    const audio = this.getAudioOrError('pause');
    audio.pause();
  }

  public stop(): void {
    const audio = this.getAudioOrError('stop');
    audio.stop();
  }

  private getAudioOrError(action: ActionType): IAudioSource {
    if (!this._audio) {
      const mainError = 'audio is not loaded.';
      const error: Record<ActionType, string> = {
        play: `Cannot play: ${mainError}`,
        pause: `Cannot pause: ${mainError}`,
        stop: `Cannot stop: ${mainError}`,
      };

      throw new Error(error[action]);
    }

    return this._audio;
  }
}
