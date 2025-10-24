import type { FC, PropsWithChildren } from 'react';
import { type MantineThemeOverride, MantineProvider } from '@mantine/core';

import '@mantine/core/styles.css';

export const CoreUiProvider: FC<PropsWithChildren> = ({ children }) => {
  const theme: MantineThemeOverride = {
    primaryColor: 'violet',
  };

  return (
    <MantineProvider theme={theme} forceColorScheme="dark">
      {children}
    </MantineProvider>
  );
};
