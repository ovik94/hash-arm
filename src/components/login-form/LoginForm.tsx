import React, { FC, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { Button, Typography } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import AccountCircle from '@material-ui/icons/AccountCircle';
import useStyles from './styles';
import Locale from './locale';
import useStore from '../../hooks/useStore';
import useLocale from '../../hooks/useLocale';
// @ts-ignore
import logoUrl from './images/logo.png';
import Loader from '../loader/Loader';
import MuiSelect from '../../mui-components/MuiSelect';
import { IUser } from '../../store/UserStore';

const LoginForm: FC = (): JSX.Element => {
  const classes = useStyles();
  const locale = useLocale(Locale);
  const { userStore } = useStore();
  const history = useHistory();

  useEffect(() => {
    if (!userStore.usersList.length) {
      userStore.fetchUsersList();
    }
  }, [userStore.usersList]);

  const onChange = (value: string): void => {
    // setUser(event.target.name as string);
  };

  const onClick = (): void => {
    if (userStore.user) {
      userStore.setAutorithed(true);
      history.push('/');
    }
  };

  const renderSelectItem = (option: { label: string, value: string }): JSX.Element => {
    const userData = userStore.usersList.find(user => user.id === option.value) || {} as IUser;

    return (
      <div className={classes.selectItem}>
        <AccountCircle />
        <div className={classes.userInfo}>
          <Typography variant="body1">{option.label}</Typography>
          { userData?.phone && <Typography variant="subtitle2">{userData.phone}</Typography> }
        </div>
      </div>
    );
  };

  const selectOptions = userStore.usersList.map(user => ({ label: user.name, value: user.id }));

  console.log('userStore.usersList', { ...userStore.usersList });
  return (
    <div className={classes.loginForm}>
      {
        userStore.isLoading && <Loader />
      }
      <img src={logoUrl} alt="logo" className={classes.logo} />
      <MuiSelect
        label={locale.selectLabel}
        id="selectUser"
        options={selectOptions}
        onChange={onChange}
        renderItem={renderSelectItem}
      />
      <Button
        fullWidth
        variant="contained"
        color="primary"
        className={classes.button}
        onClick={onClick}
      >
        {locale.buttonLabel}
      </Button>
    </div>
  );
};

export default observer<{}>(LoginForm);
