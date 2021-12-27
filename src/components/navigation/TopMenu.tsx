import React, { Dispatch, FC, SetStateAction } from 'react';
import { observer } from 'mobx-react-lite';
import Cookies from 'js-cookie';
import { Toolbar, AppBar, IconButton, Typography, Divider, Box } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { AccountCircle, ExitToApp } from '@mui/icons-material';
import { useHistory } from 'react-router-dom';
import styles from './styles';
import useStore from '../../hooks/useStore';
import { IUser } from '../../store/UserStore';

interface ITopMenuProps {
  setOpen: Dispatch<SetStateAction<boolean>>;
  open: boolean;
  title: string;
}

const TopMenu: FC<ITopMenuProps> = ({ setOpen, open, title }) => {
  const { userStore } = useStore();
  const history = useHistory();

  const logOut = () => {
    userStore.setAuthorized(false);
    userStore.setUser({} as IUser);
    Cookies.remove('adminName');
    history.push('/login');
  };

  return (
    <AppBar position="absolute" sx={styles.appBar}>
      <Toolbar sx={styles.toolbar}>
        <IconButton
          edge="start"
          color="inherit"
          onClick={() => setOpen(!open)}
        >
          {open ? <ChevronLeftIcon /> : <MenuIcon /> }
        </IconButton>
        <Typography component="h1" variant="h6" color="inherit" noWrap sx={styles.title}>
          <div dangerouslySetInnerHTML={{ __html: title }} onClick={() => setOpen(true)} />
        </Typography>
        {
          userStore.isAuthorized && (
            <>
              <Divider orientation="vertical" />
              <Box sx={styles.userInfo}>
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
              </Box>
            </>
          )
        }
      </Toolbar>
    </AppBar>
  );
};

export default observer<ITopMenuProps>(TopMenu);
