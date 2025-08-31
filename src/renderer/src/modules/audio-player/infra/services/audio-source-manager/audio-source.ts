import { Howl } from 'howler';
import type {
  IAudioSource,
  AudioSourceConfig,
} from '../../../application/ports/services/i-audio-source';

export class AudioSource implements IAudioSource {
  private _id: number | null = null;
  private _rafId: number | null = null;

  private readonly _source: Howl;
  private readonly _onTimeUpdate?: AudioSourceConfig['onTimeUpdate'];

  public constructor(src: string, config?: AudioSourceConfig) {
    this._source = new Howl({
      src,
      html5: true,
      onplay: () => {
        this.updateProgress();
      },
      onstop: () => {
        config?.onStop?.();
        config?.onTimeUpdate?.(0);
      },
      onend: config?.onEnd,
    });

    this._onTimeUpdate = config?.onTimeUpdate;
  }

  public get isPlaying(): boolean {
    return Boolean(this._id && this._source.playing(this._id));
  }

  public play(): void {
    if (this.isPlaying) return;
    this._id = this._source.play();
  }

  public pause(): void {
    if (!this._id || !this.isPlaying) return;

    this._source.pause(this._id);
    this.cancelProgress();
  }

  public stop(): void {
    if (!this._id) return;

    this._source.stop(this._id);
    this._id = null;
    this.cancelProgress();
  }

  public dispose(): void {
    this._source.unload();
  }

  private updateProgress(): void {
    if (!this._id) return;

    if (this._onTimeUpdate) {
      this._onTimeUpdate(this._source.seek(this._id));
    }

    if (this.isPlaying) {
      this._rafId = requestAnimationFrame(() => this.updateProgress());
    } else {
      this._rafId = null;
    }
  }

  private cancelProgress(): void {
    if (!this._rafId) return;

    cancelAnimationFrame(this._rafId);
    this._rafId = null;
  }
}
