import { type FC } from 'react';
import { useControllersProvider } from '../../providers/controllers-provider/use-provider';
import { SeekBarSlider } from './seek-bar-slider';

import './seek-bar.scss';

export const SeekBar: FC = () => {
  const { audioPlayerController } = useControllersProvider();
  const audioTrack = audioPlayerController.useCurrentTrack();

  return (
    <div className="seek-bar">
      Position: {audioTrack?.playbackPosition}
      <br />
      <SeekBarSlider
        playbackPosition={audioTrack?.playbackPosition ?? 0}
        duration={audioTrack?.duration ?? 0}
        onSeekEnd={audioPlayerController.seekTrack}
      />
    </div>
  );
};
