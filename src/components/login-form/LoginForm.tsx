import React, { FC, useEffect, useState } from 'react';
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
import Messages, { IMessage, MessageStatuses } from '../messages/Messages';

interface IForm {
  adminName: string;
  pass: string;
}

const LoginForm: FC = (): JSX.Element => {
  const locale = useLocale(Locale);
  const { userStore } = useStore();
  const history = useHistory();
  const [messages, setMessages] = useState<Array<IMessage>>();

  const schema = yup.object({
    adminName: yup.string().required(),
    pass: yup.string().required()
  });

  const methods = useForm<IForm>({
    resolver: yupResolver(schema),
    mode: 'onTouched'
  });

  useEffect(() => {
    if (!userStore.usersList.length) {
      userStore.fetchUsersList();
    }
  }, [userStore.usersList]);

  const onSubmit: SubmitHandler<IForm> = (data) => {
    const user = userStore.usersList.find(item => item.id === data.adminName);

    if (user) {
      const checkPass = data.pass === `${user.name}Админ`;

      if (checkPass && user) {
        userStore.setUser(user);
        userStore.setAuthorized(true);
        sessionStorage.setItem('adminName', JSON.stringify(userStore.user));
        history.push('/');
      } else {
        setMessages([{ value: 'Неправилный пароль', type: MessageStatuses.ERROR }]);
      }
    }
  };

  const renderSelectItem = (option: { label: string, value: string }): JSX.Element => (
    <Box sx={styles.selectItem}>
      <AccountCircle color="secondary" />
      <Box sx={styles.userInfo}>
        <Typography variant="body1">{option.label}</Typography>
      </Box>
    </Box>
  );

  const selectOptions = userStore.usersList.map(user => ({ label: user.name, value: user.id }));

  return (
    <Box sx={styles.loginForm}>
      <Loader isLoading={userStore.isLoading} />
      <Box sx={styles.logo}>
        <img src="public/images/logo.png" alt="logo" style={{ width: '100%', height: '96px' }} />
      </Box>
      <Box sx={styles.form}>
        <Messages messages={messages} />
        <MuiForm methods={methods} onSubmit={onSubmit}>
          <MuiFormSelect
            name="adminName"
            options={selectOptions}
            renderItem={renderSelectItem}
            label={locale.selectLabel}
          />
          <MuiFormInput
            name="pass"
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
