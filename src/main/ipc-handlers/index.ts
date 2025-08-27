import { IpcHandlers } from '../../shared';
import { getInfo } from './user/get-info';
import { openFile } from './dialog/open-file';

export const ipcHandlers: IpcHandlers = {
  'user:getInfo': getInfo,
  'dialog:openFile': openFile,
};
