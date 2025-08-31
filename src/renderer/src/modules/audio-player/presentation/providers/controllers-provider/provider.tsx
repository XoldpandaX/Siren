import { type JSX, type PropsWithChildren, createContext } from 'react';
import type { IResolver } from '../../../_composition/resolver';
import type { IAudioPlayerActionsController } from '../../../presentation/contracts/controllers/i-audio-player-controller';

export interface ControllersProviderContext {
  audioPlayerController: IAudioPlayerActionsController;
}
// eslint-disable-next-line react-refresh/only-export-components
export const ControllersContext = createContext<ControllersProviderContext | undefined>(undefined);

export type ControllersProviderProps = PropsWithChildren<{
  resolver: IResolver;
}>;
export const ControllersProvider = (props: ControllersProviderProps): JSX.Element => {
  const context: ControllersProviderContext = {
    audioPlayerController: props.resolver.audioPlayerController,
  };

  return (
    <ControllersContext.Provider value={{ ...context }}>
      {props.children}
    </ControllersContext.Provider>
  );
};
