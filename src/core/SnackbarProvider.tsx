import React, { FC, ReactNode } from 'react';
import { SnackbarProvider as NotistackSnackbarProvider } from 'notistack';

interface ISnackbarProvider {
  children: ReactNode
}
const SnackbarProvider: FC<ISnackbarProvider> = ({ children }: ISnackbarProvider) => (
  <NotistackSnackbarProvider
    maxSnack={7}
    autoHideDuration={7000}
    preventDuplicate
    anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
    dense={false}
  >
    {children}
  </NotistackSnackbarProvider>
);

export default SnackbarProvider;
