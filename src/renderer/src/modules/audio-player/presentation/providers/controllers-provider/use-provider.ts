import { useContext } from 'react';
import { type ControllersProviderContext, ControllersContext } from './provider';

export const useControllersProvider = (): ControllersProviderContext => {
  const context = useContext(ControllersContext);
  if (!context) {
    throw new Error('useControllersProvider must be used within a ResolverProvider');
  }
  return context;
};
