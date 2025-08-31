import type { IGetUserInfoDTO } from './dtos';

export interface IpcChannelMap {
  'user:getInfo': { args: void; return: IGetUserInfoDTO };
  'dialog:openFile': {
    args: void;
    return: Promise<{ mimeType: string; buffer: Buffer<ArrayBufferLike> } | undefined>;
  };
}

export type IpcHandlers = {
  [K in keyof IpcChannelMap]: IpcChannelMap[K]['args'] extends void
    ? () => IpcChannelMap[K]['return']
    : (data: IpcChannelMap[K]['args']) => IpcChannelMap[K]['return'];
};
