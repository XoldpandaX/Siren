import { type FC, type ButtonHTMLAttributes } from 'react';
import { Icon } from '../icon';

import './play-button.scss';

type PlayButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  isPaused: boolean;
  onPlayClick: () => void;
  onPauseClick: () => void;
};

export const PlayButton: FC<PlayButtonProps> = ({
  isPaused,
  onPlayClick,
  onPauseClick,
  ...rest
}) => {
  return (
    <button
      type="button"
      className="play-button"
      onClick={isPaused ? onPlayClick : onPauseClick}
      {...rest}
    >
      {<Icon name={isPaused ? 'play' : 'pause'} size="25" />}
    </button>
  );
};
