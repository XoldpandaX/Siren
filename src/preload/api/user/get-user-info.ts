import os from 'node:os';

export interface IGetUserInfoDTO {
  userName: string;
  platform: NodeJS.Platform;
  uptime: number;
}

export type GetUserInfo = () => IGetUserInfoDTO;
export const getUserInfo = (): IGetUserInfoDTO => ({
  userName: os.userInfo().username,
  platform: os.platform(),
  uptime: os.uptime(),
});
