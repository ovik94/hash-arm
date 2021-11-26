import React, { FunctionComponent } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core';
import Cookies from 'js-cookie';
import ErrorBoundary from './ErrorBoundary';
import { CoreContextProvider } from './CoreContext';
import { StoreContextProvider } from './StoreContext';
import { defaultTheme } from './theme';
import locale from './locale/locale';
import RequestFactory from './request/request-factory';
import RouteView from './RouteView';
import { RootStore } from '../store/RootStore';
import CheckList from '../pages/CheckList';
import Login from '../pages/Login';
import Contractors from '../pages/Contractors';
import Order from '../components/order/Order';
import Notifier from './Notifier';
import RequestConfigList from './request/RequestConfigList';
import Instructions from '../pages/Instructions';
import BarBalance from '../pages/BarBalance';
import Banquets from '../pages/Banquets';

const store = new RootStore();

const onError = (status: string): void => {
  store.notificationStore.addNotification({
    type: 'error',
    code: status
  });
};

const requestFactory = new RequestFactory({ requestConfigList: RequestConfigList, onError });
const createRequest = requestFactory.createRequest.bind(requestFactory);
store.setCreateRequest(createRequest);

const useStyles = makeStyles(() => ({
  root: {
    width: '100%',
    background: '#E5E5E5',
    minHeight: '100vh'
  }
}));

const App: FunctionComponent = () => {
  const classes = useStyles();

  if (Cookies.get('adminName')) {
    const user = JSON.parse(Cookies.get('adminName') || '');

    store.userStore.setUser(user);
    store.userStore.setAuthorized(true);
  }

  return (
    <div className={classes.root}>
      <ErrorBoundary>
        <SnackbarProvider autoHideDuration={10000} hideIconVariant>
          <CssBaseline />
          <ThemeProvider theme={defaultTheme}>
            <SnackbarProvider>
              <StoreContextProvider value={store}>
                <CoreContextProvider value={{ createRequest, locale }}>
                  <Notifier />
                  <Router>
                    <div>
                      <Switch>
                        <Route exact path="/login">
                          <Login />
                        </Route>
                        <RouteView exact path="/">
                          <CheckList />
                        </RouteView>
                        <RouteView exact path="/check-list">
                          <CheckList />
                        </RouteView>
                        <RouteView exact path="/contractors">
                          <Contractors />
                        </RouteView>
                        <RouteView exact path="/contractors/:id">
                          <Order />
                        </RouteView>
                        <RouteView exact path="/instructions">
                          <Instructions />
                        </RouteView>
                        <RouteView exact path="/bar-balance">
                          <BarBalance />
                        </RouteView>
                        <RouteView exact path="/ordering-banquets">
                          <Banquets />
                        </RouteView>
                      </Switch>
                    </div>
                  </Router>
                </CoreContextProvider>
              </StoreContextProvider>
            </SnackbarProvider>
          </ThemeProvider>
        </SnackbarProvider>
      </ErrorBoundary>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
