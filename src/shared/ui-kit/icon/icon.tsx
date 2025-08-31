import type { FC } from 'react';
import type { IconType } from 'react-icons';
import { BiCaretRight, BiPause } from 'react-icons/bi';

type IconName = 'play' | 'pause';

type IconProps = {
  name: IconName;
  size?: string | number;
  color?: string;
};

export const Icon: FC<IconProps> = (props) => {
  const Icon = getIconByName(props.name);
  return <Icon color={props.color} size={props.size} />;
};

function getIconByName(name: IconName): IconType {
  const icon: Record<IconName, IconType> = {
    play: BiCaretRight,
    pause: BiPause,
  };

  return icon[name];
}
