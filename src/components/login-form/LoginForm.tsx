import React, { FC, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { Button, MenuItem, Select, InputLabel, Input, FormControl } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import useStyles from './styles';
import Locale from './locale';
import useStore from '../../hooks/useStore';
import useLocale from '../../hooks/useLocale';
// @ts-ignore
import logoUrl from './images/logo.png';
import Loader from '../loader/Loader';

const LoginForm: FC = (): JSX.Element => {
  const classes = useStyles();
  const locale = useLocale(Locale);
  const { userStore } = useStore();
  const history = useHistory();
  const [name, setName] = React.useState<string>('');

  useEffect(() => {
    if (!userStore.usersList.length) {
      userStore.fetchUsersList();
    }
  }, [userStore.usersList]);

  const onChange = (event: React.ChangeEvent<{ name?: string | undefined; value: unknown; }>): void => {
    setName(event.target.name as string);
    setUser(event.target.name as string);
  };

  const onClick = (): void => {
    if (userStore.user) {
      userStore.setAutorithed(true);
      history.push('/');
    }
  };

  console.log('userStore.usersList', { ...userStore.usersList });
  return (
    <div className={classes.loginForm}>
      {
        userStore.isLoading && <Loader />
      }
      <img src={logoUrl} alt="logo" className={classes.logo} />
      <FormControl className={classes.formControl}>
        <InputLabel id="select-label">Выбрать пользователя</InputLabel>
        <Select
          labelId="select-label"
          id="selectUser"
          value={name}
          onChange={onChange}
          input={<Input />}
        >
          {userStore.usersList.map(user => <MenuItem value={user.name} key={user.id}>{user.name}</MenuItem>)}
        </Select>
      </FormControl>
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
