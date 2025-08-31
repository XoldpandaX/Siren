import { type FC } from 'react';
import { PlayButton } from '@shared/ui-kit';

import './audio-controls.scss';
import { useControllersProvider } from '@renderer/modules/audio-player/presentation/providers/controllers-provider/use-provider';

export const AudioControls: FC = () => {
  const { audioPlayerController } = useControllersProvider();

  const isPlaying = audioPlayerController.useIsPlaying();

  return (
    <div className="audio-controls">
      <PlayButton
        isPaused={!isPlaying}
        onPlayClick={audioPlayerController.playTrack}
        onPauseClick={audioPlayerController.pauseTrack}
      />
    </div>
  );
};
