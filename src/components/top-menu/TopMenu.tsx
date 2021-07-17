import React, { FC } from 'react';
import { observer } from 'mobx-react-lite';
import { Link } from 'react-router-dom';
import Toolbar from '@material-ui/core/Toolbar';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import useStyles from './styles';
import Locale from './locale';
import useLocale from '../../hooks/useLocale';

const TopMenu: FC = (): JSX.Element => {
  const classes = useStyles();
  const locale = useLocale(Locale);

  return (
    <AppBar position="static" className={classes.appBar}>
      <Toolbar className={classes.toolbar}>
        <div className={classes.buttonGroup}>
          {
            locale.menu.map((item: any) => (
              <div className={classes.buttonBlock} key={item.url}>
                {
                  item.url ? (
                    <Button
                      color="inherit"
                      component={Link}
                      to={item.url}
                      key={item.url}
                      className={classes.button}
                    >
                      {item.label}
                    </Button>
                  ) :
                    <Typography variant="body1" className={classes.armName}>{item.label}</Typography>
                }
                <Divider orientation="vertical" />
              </div>
            ))
          }
        </div>
        {/* { */}
        {/*  userStore.isAuthorized && ( */}
        {/*    <> */}
        {/*      <Divider orientation="vertical" /> */}
        {/*      <div className={classes.userInfo}> */}
        {/*        <AccountCircle /> */}
        {/*        <Typography variant="body1" className={classes.userName}>{userStore.user?.fullName}</Typography> */}
        {/*        <IconButton */}
        {/*          onClick={logOut} */}
        {/*          color="inherit" */}
        {/*        > */}
        {/*          <ExitToAppIcon /> */}
        {/*        </IconButton> */}
        {/*      </div> */}
        {/*    </> */}
        {/*  ) */}
        {/* } */}
      </Toolbar>
    </AppBar>
  );
};

export default observer<{}>(TopMenu);
