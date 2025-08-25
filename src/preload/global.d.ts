import type { IApi } from './api';

declare global {
  interface Window {
    electron: {
      versions: NodeJS.ProcessVersions;
    };
    api: IApi;
  }
}
