import { type JSX, useEffect, useState } from 'react';
import { type IGetUserInfoDTO } from '../../../shared';

export const Versions = (): JSX.Element => {
  const [versions] = useState(window.electron.versions);
  const [, setUserInfo] = useState<IGetUserInfoDTO | null>(null);

  useEffect(() => {
    window.electronApi.user.getInfo().then((user) => {
      setUserInfo(user);
      console.info(user);
    });
  }, []);

  return (
    <ul className="versions">
      <li className="electron-version">Electron v{versions.node}</li>
      <li className="chrome-version">Chromium v{versions.chrome}</li>
      <li className="node-version">Node v{versions.node}</li>
    </ul>
  );
};

export default Versions;
