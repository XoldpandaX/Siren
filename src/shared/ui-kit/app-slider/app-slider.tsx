import { type FC, type Ref } from 'react';
import { type SliderProps, Slider } from '@mantine/core';

// https://mantine.dev/core/slider/

export type AppSliderProps = Pick<
  SliderProps,
  'value' | 'max' | 'step' | 'onChange' | 'onChangeEnd' | 'className'
> & { ref?: Ref<HTMLInputElement> };

export const AppSlider: FC<AppSliderProps> = (props) => {
  return <Slider {...props} size="lg" radius="xs" />;
};
