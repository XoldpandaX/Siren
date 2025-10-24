import { useContext } from 'react';
import { type RootProviderContext, RootContext } from './root-provider';

export const useRootProvider = (): RootProviderContext => {
  const context = useContext(RootContext);
  if (!context) {
    throw new Error('useRootProvider must be used within a ResolverProvider');
  }
  return context;
};
