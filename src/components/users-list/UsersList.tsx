import React, { FC } from 'react';
import {
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { IUser, PrivilegeType } from '../../store/UserStore';
import useLocale from '../../hooks/useLocale';
import Locale from './locale';
import styles from './styles';
import UserDetailForm from '../user-detail-form/UserDetailForm';
import useStore from '../../hooks/useStore';
import Confirm from '../confirm/Confirm';

interface IUsersListProps {
  users: Array<IUser>;
}

const UsersList: FC<IUsersListProps> = ({ users }) => {
  const locale = useLocale(Locale);
  const { popupStore, userStore } = useStore();

  const onEdit = (user: IUser) => {
    popupStore.openPopup({
      props: { size: 'md' },
      contentProps: { user },
      content: UserDetailForm
    });
  };

  const onAcceptDelete = (user: IUser) => {
    userStore.deleteUser(user).then(() => {
      popupStore.closePopup();
    });
  };

  const onCancelDelete = () => {
    popupStore.closePopup();
  };

  const onDelete = (user: IUser) => {
    popupStore.openPopup({
      props: { size: 'sm' },
      contentProps: {
        locale: locale.deleteConfirm(user.name),
        onAccept: () => onAcceptDelete(user),
        onCancel: onCancelDelete
      },
      content: Confirm
    });
  };

  if (!users || !users.length) {
    return null;
  }

  return (
    <TableContainer component={Paper} sx={styles.table}>
      <Table size="small">
        <TableHead>
          <TableRow>
            {locale.cells.map((cell: { id: string, label: string }) => (
              <TableCell align="left" key={cell.id}>
                <Typography variant="h4">{cell.label}</Typography>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => {
            const hasEdit = (
              user.role === 'supervisor' && userStore.user.privilege.includes(PrivilegeType.EDIT_SUPERVISOR)) ||
              (user.role !== 'supervisor' && userStore.user.privilege.includes(PrivilegeType.EDIT_USER)
              );

            return (
              <TableRow sx={styles.tableRow} key={user.id}>
                <TableCell width="20%" align="left">{user.name}</TableCell>
                <TableCell width="20%" align="left">{locale.userRoleName[user.role]}</TableCell>
                <TableCell width="50%" align="left">{user.phone}</TableCell>

                <TableCell width="5%" align="left">
                  {hasEdit && (
                    <IconButton size="small" onClick={() => onEdit(user)}>
                      <EditIcon color="secondary" />
                    </IconButton>
                  )}
                </TableCell>

                <TableCell width="5%" align="right">
                  {hasEdit && (
                    <IconButton size="small" onClick={() => onDelete(user)}>
                      <DeleteIcon color="secondary" />
                    </IconButton>
                  )}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default UsersList;
