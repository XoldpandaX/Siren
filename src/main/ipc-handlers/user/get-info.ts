import os from 'node:os';
import { IGetUserInfoDTO } from '../../../shared';

export const getInfo = (): IGetUserInfoDTO => ({
  userName: os.userInfo().username,
  platform: os.platform(),
  uptime: os.uptime(),
});
