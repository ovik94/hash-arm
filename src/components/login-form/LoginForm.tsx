import React, { FC, useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Button, Typography } from '@mui/material';
import { useHistory } from 'react-router-dom';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Cookies from 'js-cookie';
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
  const [userName, setUserName] = useState<string>('');

  useEffect(() => {
    if (!userStore.usersList.length) {
      userStore.fetchUsersList();
    }
  }, [userStore.usersList]);

  const onChange = (value: string): void => {
    const user = userStore.usersList.find(item => item.id === value) || {} as IUser;
    setUserName(value);
    userStore.setUser(user);
  };

  const onClick = (): void => {
    if (userStore.user) {
      userStore.setAuthorized(true);
      Cookies.set('adminName', userStore.user);
      history.push('/');
    }
  };

  const renderSelectItem = (option: { label: string, value: string }): JSX.Element => {
    const userData = userStore.usersList.find(user => user.id === option.value) || {} as IUser;

    return (
      <div className={classes.selectItem}>
        <AccountCircle color="secondary" />
        <div className={classes.userInfo}>
          <Typography variant="body1">{option.label}</Typography>
          { userData?.phone && <Typography variant="subtitle1" className={classes.phone}>{userData.phone}</Typography> }
        </div>
      </div>
    );
  };

  const selectOptions = userStore.usersList.map(user => ({ label: user.name, value: user.id }));

  return (
    <div className={classes.loginForm}>
      <Loader isLoading={userStore.isLoading} />
      <img src={logoUrl} alt="logo" className={classes.logo} />
      <MuiSelect
        label={locale.selectLabel}
        id="selectUser"
        value={userName}
        options={selectOptions}
        onChange={onChange}
        renderItem={renderSelectItem}
        disabled={userStore.isLoading}
      />
      <Button
        fullWidth
        variant="contained"
        color="primary"
        onClick={onClick}
        disabled={!userStore.user.name}
        style={{
          margin: '24px 0 16px'
        }}
      >
        {locale.buttonLabel}
      </Button>
    </div>
  );
};

export default observer<{}>(LoginForm);
