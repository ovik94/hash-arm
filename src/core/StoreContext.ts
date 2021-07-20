import { createContext } from 'react';
import { RootStore } from '../store/RootStore';

export const StoreContext = createContext<RootStore>({} as RootStore);
export const StoreContextProvider = StoreContext.Provider;
