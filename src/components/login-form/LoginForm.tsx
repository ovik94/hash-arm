import React, { FC, useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Box, Button, Typography } from '@mui/material';
import { useHistory } from 'react-router-dom';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Cookies from 'js-cookie';
import styles from './styles';
import Locale from './locale';
import useStore from '../../hooks/useStore';
import useLocale from '../../hooks/useLocale';
// @ts-ignore
import logoUrl from './images/logo.png';
import Loader from '../loader/Loader';
import MuiSelect from '../../mui-components/MuiSelect';
import { IUser } from '../../store/UserStore';

const LoginForm: FC = (): JSX.Element => {
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
      <Box sx={styles.selectItem}>
        <AccountCircle color="secondary" />
        <Box sx={styles.userInfo}>
          <Typography variant="body1">{option.label}</Typography>
          {userData?.phone && <Typography variant="subtitle1" sx={styles.phone}>{userData.phone}</Typography>}
        </Box>
      </Box>
    );
  };

  const selectOptions = userStore.usersList.map(user => ({ label: user.name, value: user.id }));

  return (
    <Box sx={styles.loginForm}>
      <Loader isLoading={userStore.isLoading} />
      <Box sx={styles.logo}>
        <img src={logoUrl} alt="logo" style={{ width: '100%' }} />
      </Box>
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
        sx={styles.button}
      >
        {locale.buttonLabel}
      </Button>
    </Box>
  );
};

export default observer<{}>(LoginForm);
