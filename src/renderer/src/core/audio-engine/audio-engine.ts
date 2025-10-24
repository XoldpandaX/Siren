import type { IAudioEngine, IAudioEngineEvents } from '@shared/types';
import { AudioSource } from './audio-source';
import { EventEmitter } from './event-emitter';
import { createAudioUrl } from './utils';

export class AudioEngine implements IAudioEngine {
  private _audio: AudioSource | null = null;
  private _eventEmitter = new EventEmitter();

  public subscribe<E extends keyof IAudioEngineEvents>(
    event: E,
    handler: IAudioEngineEvents[E]
  ): () => void {
    return this._eventEmitter.on(event, handler);
  }

  public load(source: { audioBuffer: Buffer<ArrayBufferLike>; mimeType: string }): void {
    // Unload previous audio
    if (this._audio) {
      this._audio.dispose();
      this._audio = null;
    }

    this._audio = new AudioSource(createAudioUrl(source.audioBuffer, source.mimeType), {
      onTimeUpdate: (seconds: number): void => {
        this._eventEmitter.emit('timeUpdate', seconds);
      },
      onStop: (): void => {
        this._eventEmitter.emit('stop');
      },
      onEnd: (): void => {
        this._eventEmitter.emit('end');
      },
    });
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

  public seek(playbackPosition: number): void {
    const audio = this.getAudioOrError('seek');
    audio.seek(playbackPosition);
  }

  public dispose(): void {
    if (this._audio) {
      this._audio.dispose();
      this._audio = null;
    }

    this._eventEmitter.dispose();
  }

  private getAudioOrError(action: string): AudioSource {
    if (!this._audio) {
      throw new Error(`Cannot call ${action}: audio is not loaded.`);
    }

    return this._audio;
  }
}
