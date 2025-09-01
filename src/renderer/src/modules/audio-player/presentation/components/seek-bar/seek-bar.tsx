import { type FC } from 'react';
import { useControllersProvider } from '../../providers/controllers-provider/use-provider';

import './seek-bar.scss';

export const SeekBar: FC = () => {
  const { audioPlayerController } = useControllersProvider();

  const audioTrack = audioPlayerController.useCurrentTrack();

  return <div className="seek-bar">{audioTrack?.playbackPosition}</div>;
};
