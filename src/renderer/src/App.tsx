import { useState } from 'react';
import { AudioPlayer } from '@renderer/modules/audio-player';
import Versions from './components/Versions';

import electronLogo from './assets/electron.svg';

function App(): React.JSX.Element {
  const [audioPath, setAudioPath] = useState('');

  const selectAudioFile = async (): Promise<void> => {
    try {
      const file = await window.electronApi.dialog.openFile();
      if (!file) {
        return;
      }

      const { mimeType, buffer } = file;
      const blob = new Blob([new Uint8Array(buffer)], { type: `audio/${mimeType}` });

      setAudioPath(URL.createObjectURL(blob));
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      <img alt="logo" className="logo" src={electronLogo} />
      <div className="creator">Powered by electron-vite</div>
      <div className="text">
        Build an Electron app with <span className="react">React</span>
        &nbsp;and <span className="ts">TypeScript</span>
      </div>
      <button onClick={selectAudioFile}>Select audio</button>
      {audioPath ? <AudioPlayer audioPath={audioPath} /> : null}
      <Versions />
    </>
  );
}

export default App;
