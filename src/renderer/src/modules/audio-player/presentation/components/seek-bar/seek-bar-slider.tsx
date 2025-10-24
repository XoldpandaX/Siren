import { type FC, useEffect, useRef, useState } from 'react';
import { AppSlider } from '@shared/ui-kit';

type SeekBarSliderProps = {
  playbackPosition: number;
  duration: number;
  onSeekEnd(playbackPosition: number): void;
};

export const SeekBarSlider: FC<SeekBarSliderProps> = ({
  playbackPosition,
  duration,
  onSeekEnd,
}) => {
  const isChanging = useRef(false);
  const [changingPlaybackPosition, setChangingPlaybackPosition] = useState(0);

  const value = isChanging.current ? changingPlaybackPosition : playbackPosition;

  const handleOnChange = (playbackPosition: number): void => {
    isChanging.current = true;
    setChangingPlaybackPosition(playbackPosition);
  };

  const handleOnSeekEnd = (playbackPosition: number): void => {
    onSeekEnd(playbackPosition);
    isChanging.current = false;
  };

  // Synchronize local rew with external playbackPosition,
  // but only if the user is not currently adjusting the slider
  useEffect(() => {
    if (!isChanging.current) {
      setChangingPlaybackPosition(playbackPosition);
    }
  }, [playbackPosition]);

  return (
    <AppSlider
      value={value}
      max={duration}
      step={1}
      onChange={handleOnChange}
      onChangeEnd={handleOnSeekEnd}
    />
  );
};
