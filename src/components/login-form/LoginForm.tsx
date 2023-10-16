import React, { FC, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { Box, Typography } from '@mui/material';
import { useHistory } from 'react-router-dom';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import styles from './styles';
import Locale from './locale';
import useStore from '../../hooks/useStore';
import useLocale from '../../hooks/useLocale';
import Loader from '../loader/Loader';
import MuiFormSelect from '../form-controls/MuiFormSelect';
import MuiForm from '../form-controls/MuiForm';
import yup from '../../core/yup-extended';
import MuiFormInput from '../form-controls/MuiFormInput';
import MuiFormButton from '../form-controls/MuiFormButton';

interface IForm {
  id: string;
  password: string;
}

const LoginForm: FC = (): JSX.Element => {
  const locale = useLocale(Locale);
  const { userStore } = useStore();
  const history = useHistory();

  const schema = yup.object({
    id: yup.string().required(),
    password: yup.string().required()
  });

  const methods = useForm<IForm>({
    resolver: yupResolver(schema),
    mode: 'onTouched'
  });

  useEffect(() => {
    if (!userStore.usersList) {
      userStore.fetchUsersList();
    }
  }, [userStore.usersList]);

  const onSubmit: SubmitHandler<IForm> = (data) => {
    userStore.login(data).then(() => {
      history.push('/');
    });
  };

  const renderSelectItem = (option: { label: string, value: string }): JSX.Element => (
    <Box sx={styles.selectItem}>
      <AccountCircle color="secondary" />
      <Box sx={styles.userInfo}>
        <Typography variant="body1">{option.label}</Typography>
      </Box>
    </Box>
  );

  const selectOptions = (userStore.usersList || [])
    .filter(user => user.role !== 'waiter')
    .map(user => ({ label: user.name, value: user.id }));

  return (
    <Box sx={styles.loginForm}>
      <Loader isLoading={userStore.isLoading} />
      <Box sx={styles.logo}>
        <img src="public/images/logo.png" alt="logo" style={{ width: '100%', height: '96px' }} />
      </Box>
      <Box sx={styles.form}>
        <MuiForm methods={methods} onSubmit={onSubmit}>
          <MuiFormSelect
            name="id"
            options={selectOptions}
            renderItem={renderSelectItem}
            label={locale.selectLabel}
          />
          <MuiFormInput
            name="password"
            label={locale.passLabel}
            type="password"
            autoComplete="current-password"
          />
          <MuiFormButton label={locale.buttonLabel} />
        </MuiForm>
      </Box>
    </Box>
  );
};

export default observer<{}>(LoginForm);
