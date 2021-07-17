import React, { FunctionComponent } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core';
import ErrorBoundary from './ErrorBoundary';
import { CoreContextProvider } from './CoreContext';
import { defaultTheme } from './theme';
import locale from './locale/locale';
import RequestFactory from './request/request-factory';
import RouteView from './RouteView';

const useStyles = makeStyles(() => ({
  root: {
    width: '100%',
    background: '#E5E5E5',
    minHeight: '100vh'
  }
}));

const requestFactory = new RequestFactory();
const createRequest = requestFactory.createRequest.bind(requestFactory);

const App: FunctionComponent = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <ErrorBoundary>
        <SnackbarProvider autoHideDuration={10000} hideIconVariant>
          <CssBaseline />
          <ThemeProvider theme={defaultTheme}>
            <CoreContextProvider value={{ createRequest, locale }}>
              <Router>
                <div>
                  <Switch>
                    <RouteView exact path="/">
                      <div>Главная</div>
                    </RouteView>
                    <RouteView exact path="/test">
                      <div>Тест</div>
                    </RouteView>
                    <RouteView exact path="/test2">
                      <div>Тест2</div>
                    </RouteView>
                  </Switch>
                </div>
              </Router>
            </CoreContextProvider>
          </ThemeProvider>
        </SnackbarProvider>
      </ErrorBoundary>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
