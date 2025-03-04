import React, { FC } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { observer } from 'mobx-react';
import { Theme } from '@mui/material/styles';
import { Box, SxProps } from '@mui/material';
import useStore from '../hooks/useStore';
import { IRouteProps } from './types';
import Loader from '../components/loader/Loader';
import Navigation from '../components/navigation/Navigation';

const styles: Record<string, SxProps<Theme>> = {
  main: {
    pt: { xs: 8, sm: 12 },
    pb: { xs: 8, sm: 12 },
    px: { xs: 2, sm: 4 }
  }
};

const RouteView: FC<IRouteProps> = ({ children, ...rest }: IRouteProps): JSX.Element => {
  const { userStore, isLoading } = useStore();
  if (!userStore.isAuthorized) {
    return <Redirect to="/login" />;
  }

  return (
    <Route {...rest}>
      <Loader isLoading={isLoading} />
      <Navigation>
        <Box sx={styles.main}>
          {children}
        </Box>
      </Navigation>
    </Route>
  );
};

export default observer(RouteView);
