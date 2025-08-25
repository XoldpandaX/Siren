import { getUserInfo, GetUserInfo } from './user/get-user-info';

export interface IApi {
  userInfo: {
    getUserInfo: GetUserInfo;
  };
}

export const api: IApi = {
  userInfo: {
    getUserInfo,
  },
};
