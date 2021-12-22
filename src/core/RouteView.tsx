import React, { FC } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { observer } from 'mobx-react';
import { Theme } from '@mui/material/styles';
import { Box, SxProps } from '@mui/material';
import useStore from '../hooks/useStore';
import TopMenu from '../components/top-menu/TopMenu';
import { IRouteProps } from './types';
import Loader from '../components/loader/Loader';

const styles: Record<string, SxProps<Theme>> = {
  main: theme => ({
    p: theme.spacing(0, 3, 5, 3)
  })
};

const RouteView: FC<IRouteProps> = ({ children, ...rest }: IRouteProps): JSX.Element => {
  const { userStore, isLoading } = useStore();
  if (!userStore.isAuthorized) {
    return <Redirect to="/login" />;
  }

  return (
    <Route {...rest}>
      <Loader isLoading={isLoading} />
      <TopMenu />
      <Box sx={styles.main}>
        {children}
      </Box>
    </Route>
  );
};

export default observer(RouteView);
