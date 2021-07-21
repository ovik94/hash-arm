import React, { FC } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { observer } from 'mobx-react';
import useStore from '../hooks/useStore';
import TopMenu from '../components/top-menu/TopMenu';
import { IRouteProps } from './types';
import Loader from '../components/loader/Loader';

const useStyles = makeStyles(theme => createStyles({
  main: {
    padding: theme.spacing(0, 3, 5, 3)
  }
}));

const RouteView: FC<IRouteProps> = ({ children, ...rest }: IRouteProps): JSX.Element => {
  const { userStore, isLoading } = useStore();
  const classes = useStyles();
  if (!userStore.isAuthorized) {
    return <Redirect to="/login" />;
  }

  return (
    <Route {...rest}>
      {
        isLoading && <Loader />
      }
      <TopMenu />
      <div className={classes.main}>
        {children}
      </div>
    </Route>
  );
};

export default observer(RouteView);
