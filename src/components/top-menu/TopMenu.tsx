import React, { FC } from 'react';
import { observer } from 'mobx-react-lite';
import { Link, useHistory } from 'react-router-dom';
import Cookies from 'js-cookie';
import { IconButton, Typography, Divider, Button, Toolbar, AppBar } from '@mui/material';
import { AccountCircle, ExitToApp } from '@mui/icons-material';
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
    <AppBar position="static" style={{ marginBottom: '48px', height: '56px' }}>
      <Toolbar style={{ minHeight: '56px', padding: 0 }}>
        <div className={classes.buttonGroup}>
          {
            locale.menu.map((item: any) => (
              <div className={classes.buttonBlock} key={item.url}>
                <Button
                  color="inherit"
                  component={Link}
                  to={item.url}
                  key={item.url}
                  style={{
                    fontSize: '14px',
                    fontWeight: 500,
                    lineHeight: '16px',
                    letterSpacing: '0.75px',
                    padding: '16px'
                  }}
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
                <Typography variant="body1" style={{ margin: '0 8px', color: '#FFFFFF' }}>
                  {userStore.user.name}
                </Typography>
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
