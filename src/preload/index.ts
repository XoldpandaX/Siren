import { contextBridge } from 'electron';
import { api } from './api';

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
contextBridge.exposeInMainWorld('electron', {
  versions: process.versions,
});
contextBridge.exposeInMainWorld('electronApi', api);
