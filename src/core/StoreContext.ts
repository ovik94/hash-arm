import { createContext } from 'react';
import { IStoreContext } from './types';

export const StoreContext = createContext<IStoreContext>({} as IStoreContext);
export const StoreContextProvider = StoreContext.Provider;
