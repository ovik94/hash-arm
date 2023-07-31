import React from 'react';
import { observer } from 'mobx-react';
import { Theme } from '@mui/material/styles';
import { Box, Container, SxProps } from '@mui/material';
import LoginForm from '../components/login-form/LoginForm';
import useTitle from '../hooks/useTitle';

const styles: Record<string, SxProps<Theme>> = {
  pattern: theme => ({
    width: '100%',
    height: theme.spacing(10),
    backgroundImage: 'url(/public/images/pattern.png)',
    backgroundRepeat: 'repeat-x',
    backgroundPosition: 'bottom'
  })
};

const Login = () => {
  useTitle();

  return (
    <div>
      <Box sx={styles.pattern} />
      <Container component="main" maxWidth="xs">
        <LoginForm />
      </Container>
    </div>
  );
};

export default observer(Login);
