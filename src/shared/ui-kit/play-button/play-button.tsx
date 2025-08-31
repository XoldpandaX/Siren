import { type FC, type ButtonHTMLAttributes } from 'react';
import { Icon } from '../icon';

import './play-button.scss';

type PlayButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  isPaused: boolean;
  onPlayClick: () => void;
  onPauseClick: () => void;
};

export const PlayButton: FC<PlayButtonProps> = (props) => {
  return (
    <button
      type="button"
      className="play-button"
      onClick={props.isPaused ? props.onPlayClick : props.onPauseClick}
    >
      {<Icon name={props.isPaused ? 'play' : 'pause'} size="25" />}
    </button>
  );
};
