import { type Emitter, type Unsubscribe, createNanoEvents } from 'nanoevents';
import { type IDisposable } from '@lib/types';
import { type IAudioEngineEvents } from '@shared/types';

export class EventEmitter implements IDisposable {
  private readonly _emitter: Emitter<IAudioEngineEvents>;

  public constructor() {
    this._emitter = createNanoEvents<IAudioEngineEvents>();
  }

  public on<K extends keyof IAudioEngineEvents>(
    event: K,
    handler: IAudioEngineEvents[K]
  ): Unsubscribe {
    return this._emitter.on(event, handler);
  }

  public emit<K extends keyof IAudioEngineEvents>(
    event: K,
    ...args: Parameters<IAudioEngineEvents[K]>
  ): void {
    this._emitter.emit(event, ...args);
  }

  public dispose(): void {
    this._emitter.events = {};
  }
}
