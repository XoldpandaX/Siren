import os from 'node:os';
import { type IGetUserInfoDTO } from '../../../shared/types';

export const getInfo = (): IGetUserInfoDTO => ({
  userName: os.userInfo().username,
  platform: os.platform(),
  uptime: os.uptime(),
});
