import React, { FC } from 'react';
import { Route } from 'react-router-dom';
import TopMenu from '../components/top-menu/TopMenu';

import { IRouteProps } from './types';

const RouteView: FC<IRouteProps> = ({ children, ...rest }: IRouteProps): JSX.Element => (
  <>
    <Route {...rest}>
      <TopMenu />
      {children}
    </Route>
  </>
);

export default RouteView;
