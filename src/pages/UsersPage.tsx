import React, { useEffect } from 'react';
import { Typography, Box, Stack, Button } from '@mui/material';
import { observer } from 'mobx-react';
import PlusIcon from '@mui/icons-material/Add';
import useTitle from '../hooks/useTitle';
import useLocale from '../hooks/useLocale';
import useStore from '../hooks/useStore';
import UsersList from '../components/users-list/UsersList';
import UserDetailForm from '../components/user-detail-form/UserDetailForm';

const Locale = {
  title: 'Список сотрудников',
  add: 'Добавить'
};

const UsersPage = () => {
  const locale = useLocale(Locale);
  useTitle(locale.title);
  const { userStore, popupStore } = useStore();

  useEffect(() => {
    if (!userStore.usersList) {
      userStore.fetchUsersList();
    }
  }, [userStore.usersList]);

  const onAdd = () => {
    popupStore.openPopup({
      props: { size: 'sm' },
      content: UserDetailForm
    });
  };

  return (
    <Box>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography variant="h2" mb={2}>{locale.title}</Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<PlusIcon />}
          component="label"
          onClick={onAdd}
        >
          {locale.add}
        </Button>
      </Stack>
      <UsersList users={userStore.usersList || []} />
    </Box>
  );
};

export default observer(UsersPage);
