import { type JSX, useMemo } from 'react';
import { CoreUiProvider } from '@shared/ui-kit';
import { createRootDiContainer } from '../_composition/di-container';
import { RootResolver } from '../_composition/resolver';
import { RootProvider } from '@renderer/core/presentation/providers/root-provider';
import { AudioPlayer } from '@renderer/modules/audio-player';

export const App = (): JSX.Element => {
  const rootDiResolver = useMemo(() => new RootResolver(createRootDiContainer()), []);

  return (
    <RootProvider resolver={rootDiResolver}>
      <CoreUiProvider>
        <div style={{ width: '300px' }}>
          <AudioPlayer audioEngine={rootDiResolver.audioEngine} />
        </div>
      </CoreUiProvider>
    </RootProvider>
  );
};

export default App;
