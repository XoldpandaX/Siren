import { type FC } from 'react';
import { PlayButton } from '@shared/ui-kit';
import { useControllersProvider } from '../../providers/controllers-provider/use-provider';

import './control-buttons.scss';

export const ControlButtons: FC = () => {
  const { audioPlayerController } = useControllersProvider();

  const isPlaying = audioPlayerController.useIsPlaying();

  return (
    <div className="control-buttons">
      <PlayButton
        isPaused={!isPlaying}
        onPlayClick={audioPlayerController.playTrack}
        onPauseClick={audioPlayerController.pauseTrack}
      />
    </div>
  );
};
