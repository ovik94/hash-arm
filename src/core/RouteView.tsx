import React, { FC } from 'react';
import { Route, Redirect } from 'react-router-dom';
import useStore from '../hooks/useStore';
import TopMenu from '../components/top-menu/TopMenu';
import { IRouteProps } from './types';

const RouteView: FC<IRouteProps> = ({ children, ...rest }: IRouteProps): JSX.Element => {
  const { userStore } = useStore();

  if (!userStore.isAuthorized) {
    return <Redirect to="/login" />;
  }

  return (
    <Route {...rest}>
      <TopMenu />
      {children}
    </Route>
  );
};

export default RouteView;
