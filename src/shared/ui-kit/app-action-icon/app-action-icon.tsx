import { type FC } from 'react';
import { type ActionIconProps, ActionIcon } from '@mantine/core';
import { Icon } from '../icon';

// https://mantine.dev/core/action-icon/

export type AppActionIconProps = Pick<ActionIconProps, 'radius'> & {
  iconName: 'play' | 'pause';
};

export const AppActionIcon: FC<AppActionIconProps> = ({ iconName, ...restProps }) => {
  return (
    <ActionIcon {...restProps} color="white">
      <Icon name={iconName} color="#6741d9" />
    </ActionIcon>
  );
};
