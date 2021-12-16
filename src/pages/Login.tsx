import React from 'react';
import { observer } from 'mobx-react';
import { Theme } from '@mui/material/styles';
import { Container } from '@mui/material';
import { makeStyles, createStyles } from '@mui/styles';
// @ts-ignore
import patternImageUrl from './images/pattern.png';
import LoginForm from '../components/login-form/LoginForm';
import useTitle from '../hooks/useTitle';

const useStyles = makeStyles((theme: Theme) => createStyles({
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
  useTitle();

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
