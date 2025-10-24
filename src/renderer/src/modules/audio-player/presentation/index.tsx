import { type FC, useMemo } from 'react';
import { type IAudioPlayerExternalPorts } from './contracts/i-externals';
import { createDiContainer } from '../_composition/di-container';
import { Resolver } from '../_composition/resolver';
import { ControllersProvider } from './providers/controllers-provider/provider';
import { ControlButtons, SeekBar } from './components';

export const AudioPlayer: FC<IAudioPlayerExternalPorts> = ({ audioEngine }) => {
  const diResolver = useMemo(() => new Resolver(createDiContainer(audioEngine)), [audioEngine]);

  return (
    <ControllersProvider resolver={diResolver}>
      <div className="audio-player">
        <button onClick={() => diResolver.audioPlayerController.loadTrack()}>Load track</button>
        <SeekBar />
        {/*TrackInfo*/}
        <ControlButtons />
        {/*Volume*/}
      </div>
    </ControllersProvider>
  );
};
