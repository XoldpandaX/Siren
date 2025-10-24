import { type JSX, type PropsWithChildren, createContext } from 'react';
import { type RootResolver } from '../../_composition/resolver';

export interface RootProviderContext {
  resolver: RootResolver;
}
// eslint-disable-next-line react-refresh/only-export-components
export const RootContext = createContext<RootProviderContext | undefined>(undefined);

export type ControllersProviderProps = PropsWithChildren<{ resolver: RootResolver }>;
export const RootProvider = (props: ControllersProviderProps): JSX.Element => {
  const context: RootProviderContext = {
    resolver: props.resolver,
  };

  return <RootContext value={{ ...context }}>{props.children}</RootContext>;
};
