import React, { FC } from 'react';
import { observer } from 'mobx-react-lite';
import { Link, useHistory } from 'react-router-dom';
import Cookies from 'js-cookie';
import Toolbar from '@material-ui/core/Toolbar';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import { AccountCircle, ExitToApp } from '@material-ui/icons';
import { IconButton } from '@material-ui/core';
import useStyles from './styles';
import Locale from './locale';
import useLocale from '../../hooks/useLocale';
import useStore from '../../hooks/useStore';
import { IUser } from '../../store/UserStore';

const TopMenu: FC = (): JSX.Element => {
  const classes = useStyles();
  const locale = useLocale(Locale);
  const { userStore } = useStore();
  const history = useHistory();

  const logOut = () => {
    userStore.setAuthorized(false);
    userStore.setUser({} as IUser);
    Cookies.remove('adminName');
    history.push('/login');
  };

  return (
    <AppBar position="static" className={classes.appBar}>
      <Toolbar className={classes.toolbar}>
        <div className={classes.buttonGroup}>
          {
            locale.menu.map((item: any) => (
              <div className={classes.buttonBlock} key={item.url}>
                <Button
                  color="inherit"
                  component={Link}
                  to={item.url}
                  key={item.url}
                  className={classes.button}
                >
                  {item.label}
                </Button>
                <Divider orientation="vertical" />
              </div>
            ))
          }
        </div>
        {
          userStore.isAuthorized && (
            <>
              <Divider orientation="vertical" />
              <div className={classes.userInfo}>
                <AccountCircle />
                <Typography variant="body1" className={classes.userName}>{userStore.user.name}</Typography>
                <IconButton
                  onClick={logOut}
                  color="inherit"
                >
                  <ExitToApp />
                </IconButton>
              </div>
            </>
          )
         }
      </Toolbar>
    </AppBar>
  );
};

export default observer<{}>(TopMenu);
