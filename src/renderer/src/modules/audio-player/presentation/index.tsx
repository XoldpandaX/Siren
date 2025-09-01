import { type FC, useMemo } from 'react';
import { ControlButtons, SeekBar } from './components';
import { createDiContainer } from '../_composition/di-container';
import { Resolver } from '../_composition/resolver';
import { ControllersProvider } from './providers/controllers-provider/provider';

export const AudioPlayer: FC = () => {
  const diResolver = useMemo(() => new Resolver(createDiContainer()), []);

  return (
    <ControllersProvider resolver={diResolver}>
      <div className="audio-player">
        <button onClick={() => diResolver.audioPlayerController.loadTrack()}>Load track</button>
        <ControlButtons />
        <SeekBar />
      </div>
    </ControllersProvider>
  );
};
