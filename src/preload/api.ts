import { ipcRenderer } from 'electron';
import { IpcChannelMap } from '../shared';

function invoke<K extends keyof IpcChannelMap>(
  channel: K,
  args: IpcChannelMap[K]['args']
): Promise<IpcChannelMap[K]['return']>;

function invoke<K extends keyof IpcChannelMap>(
  channel: K
): IpcChannelMap[K]['args'] extends void ? Promise<IpcChannelMap[K]['return']> : never;

function invoke<K extends keyof IpcChannelMap>(
  channel: K,
  args?: IpcChannelMap[K]['args']
): Promise<IpcChannelMap[K]['return']> {
  return ipcRenderer.invoke(channel, args) as Promise<IpcChannelMap[K]['return']>;
}

export interface IElectronApi {
  user: {
    getInfo: () => Promise<IpcChannelMap['user:getInfo']['return']>;
  };
  dialog: {
    openFile: () => Promise<IpcChannelMap['dialog:openFile']['return']>;
  };
}

export const api: IElectronApi = {
  user: {
    getInfo: () => invoke('user:getInfo'),
  },
  dialog: {
    openFile: () => invoke('dialog:openFile'),
  },
};
