import React from 'react';
import { observer } from 'mobx-react';
import { Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
// @ts-ignore
import patternImageUrl from './images/pattern.png';
import LoginForm from '../components/login-form/LoginForm';

const useStyles = makeStyles(theme => ({
  pattern: {
    width: '100%',
    height: theme.spacing(10),
    backgroundImage: `url(${patternImageUrl})`,
    backgroundRepeat: 'repeat-x',
    backgroundPosition: 'bottom'
  }

}));

const Login = () => {
  const classes = useStyles();

  return (
    <div>
      <div className={classes.pattern} />
      <Container component="main" maxWidth="xs">
        <LoginForm />
      </Container>
    </div>
  );
};

export default observer(Login);
