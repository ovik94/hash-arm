import React, { FC, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { Typography, Button } from '@material-ui/core';
import useStyles from './styles';
import Locale from './locale';
import useStore from '../../hooks/useStore';
import useLocale from '../../hooks/useLocale';
// @ts-ignore
import logoUrl from './images/logo.png';

const LoginForm: FC = (): JSX.Element => {
  const classes = useStyles();
  const locale = useLocale(Locale);
  const { adminList, fetchAdminList } = useStore();

  useEffect(() => {
    if (!adminList.length) {
      fetchAdminList();
    }
  }, []);
  
  return (
    <div className={classes.loginForm}>
      <img src={logoUrl} alt="logo" className={classes.logo} />
      <Typography variant="h3">{locale.title}</Typography>
      <Button
        fullWidth
        variant="contained"
        color="primary"
        className={classes.button}
      >
        {locale.buttonLabel}
      </Button>
    </div>
  );
};

export default observer<{}>(LoginForm);
