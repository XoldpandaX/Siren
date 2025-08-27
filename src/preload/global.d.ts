import type { IElectronApi } from './api';

declare global {
  interface Window {
    electron: {
      versions: NodeJS.ProcessVersions;
    };
    electronApi: IElectronApi;
  }
}
