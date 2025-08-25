import { JSX, useState } from 'react';

export const Versions = (): JSX.Element => {
  const [versions] = useState(window.electron.versions);
  console.info(window.api.userInfo.getUserInfo());

  return (
    <ul className="versions">
      <li className="electron-version">Electron v{versions.node}</li>
      <li className="chrome-version">Chromium v{versions.chrome}</li>
      <li className="node-version">Node v{versions.node}</li>
    </ul>
  );
};

export default Versions;
