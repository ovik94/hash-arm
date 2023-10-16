import React, { FunctionComponent } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';
import { ThemeProvider, StyledEngineProvider, Theme } from '@mui/material/styles';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { Box, CssBaseline, SxProps } from '@mui/material';
import ErrorBoundary from './ErrorBoundary';
import { CoreContextProvider } from './CoreContext';
import { StoreContextProvider } from './StoreContext';
import { defaultTheme } from './theme';
import locale, { DateFnsData } from './locale/locale';
import RequestFactory, { IResponse } from './request/request-factory';
import RouteView from './RouteView';
import { RootStore } from '../store/RootStore';
import Login from '../pages/Login';
import Contractors from '../pages/Contractors';
import Notifier from './Notifier';
import RequestConfigList from './request/RequestConfigList';
import BarBalance from '../pages/BarBalance';
import Fortune from '../pages/Fortune';
import Statement from '../pages/Statement';
import Feedback from '../pages/Feedback';
import BanquetsPage from '../pages/BanquetsPage';
import UsersPage from '../pages/UsersPage';
import PopupProvider from './PopupProvider';

const store = new RootStore();

const onError = (res: IResponse<any>): void => {
  store.notificationStore.addNotification({
    type: 'error',
    code: res.status,
    text: res.message
  });
};

const requestFactory = new RequestFactory({ requestConfigList: RequestConfigList, onError });
const createRequest = requestFactory.createRequest.bind(requestFactory);
store.setCreateRequest(createRequest);

const styles: Record<string, SxProps<Theme>> = {
  root: {
    width: '100%',
    background: '#E5E5E5',
    minHeight: '100vh'
  }
};

const App: FunctionComponent = () => {
  const currentAdmin = sessionStorage.getItem('adminName');

  if (currentAdmin) {
    store.userStore.setUser(JSON.parse(currentAdmin));
    store.userStore.setAuthorized(true);
  }

  return (
    <Box sx={styles.root}>
      <ErrorBoundary>
        <StyledEngineProvider injectFirst>
          <ThemeProvider theme={defaultTheme}>
            <SnackbarProvider autoHideDuration={10000} hideIconVariant>
              <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={DateFnsData}>
                <CssBaseline />
                <StoreContextProvider value={store}>
                  <CoreContextProvider value={{ createRequest, locale }}>
                    <Notifier />
                    <Router>
                      <PopupProvider />
                      <div>
                        <Switch>
                          <Route exact path="/fortune">
                            <Fortune />
                          </Route>
                          <Route exact path="/feedback">
                            <Feedback />
                          </Route>
                          <Route exact path="/login">
                            <Login />
                          </Route>
                          <RouteView exact path="/">
                            <Statement />
                          </RouteView>
                          <RouteView exact path="/users">
                            <UsersPage />
                          </RouteView>
                          <RouteView exact path="/contractors">
                            <Contractors />
                          </RouteView>
                          <RouteView exact path="/bar-balance">
                            <BarBalance />
                          </RouteView>
                          <RouteView exact path="/banquets">
                            <BanquetsPage />
                          </RouteView>
                          <RouteView exact path="/statement">
                            <Statement />
                          </RouteView>
                        </Switch>
                      </div>
                    </Router>
                  </CoreContextProvider>
                </StoreContextProvider>
              </LocalizationProvider>
            </SnackbarProvider>
          </ThemeProvider>
        </StyledEngineProvider>
      </ErrorBoundary>
    </Box>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
