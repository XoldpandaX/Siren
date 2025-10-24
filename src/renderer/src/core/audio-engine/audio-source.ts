import { Howl } from 'howler';
import type { AudioSourceConfig } from '@shared/types';

export class AudioSource {
  private _id: number | null = null;
  private _rafId: number | null = null;
  private _lastReportedSecond: number = -1;

  private readonly _source: Howl;
  private readonly _onTimeUpdate?: AudioSourceConfig['onTimeUpdate'];

  public constructor(src: string, config?: AudioSourceConfig) {
    this._source = new Howl({
      src,
      html5: true,
      onplay: () => {
        this._lastReportedSecond = -1; // Сбросить для немедленного обновления
        this.updateProgress();
      },
      onstop: () => {
        this.cancelProgress();
        config?.onStop?.();
        config?.onTimeUpdate?.(0);
      },
      onend: () => {
        this.cancelProgress();
        config?.onEnd?.();
      },
      onpause: () => {
        this.cancelProgress();
      },
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
  }

  public stop(): void {
    if (!this._id) return;

    this._source.stop(this._id);
    this._id = null;
  }

  public seek(playbackPosition: number): void {
    if (!this._id) return;

    this.cancelProgress();
    this._source.seek(playbackPosition, this._id);

    const currentSecond = Math.floor(playbackPosition);
    this._lastReportedSecond = currentSecond;

    if (this._onTimeUpdate) this._onTimeUpdate(currentSecond);

    this.updateProgress();
  }

  public dispose(): void {
    this.cancelProgress();
    this._source.unload();
  }

  private updateProgress(): void {
    if (!this._id) return;

    const currentTime = this._source.seek(this._id);
    const currentSecond = Math.floor(currentTime);

    // Обновлять только когда секунда изменилась
    if (currentSecond !== this._lastReportedSecond) {
      if (this._onTimeUpdate) {
        this._onTimeUpdate(currentSecond);
      }
      this._lastReportedSecond = currentSecond;
    }

    this._rafId = requestAnimationFrame(() => this.updateProgress());
  }

  private cancelProgress(): void {
    if (this._rafId !== null) {
      cancelAnimationFrame(this._rafId);
      this._rafId = null;
      this._lastReportedSecond = -1;
    }
  }
}
