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
import { format } from 'date-fns';
import { useHistory } from 'react-router-dom';
import useLocale from '../../hooks/useLocale';
import Locale from './locale';
import styles from './styles';
import useStore from '../../hooks/useStore';
import Confirm from '../confirm/Confirm';
import { IBanquetReserve } from '../../store/BanquetsStore';

interface IBanquetsReservesListProps {
  reserves: Array<IBanquetReserve>;
}

const BanquetsReservesList: FC<IBanquetsReservesListProps> = ({ reserves }) => {
  const locale = useLocale(Locale);
  const { popupStore, banquetsStore } = useStore();
  const history = useHistory();

  const onEdit = (id?: string) => {
    if (id) {
      history.push(`/banquet/${id}`);
    }
  };

  const onAcceptDelete = (reserve: IBanquetReserve) => {
    banquetsStore.delete(reserve).then(() => {
      popupStore.closePopup();
    });
  };

  const onCancelDelete = () => {
    popupStore.closePopup();
  };

  const onDelete = (reserve: IBanquetReserve) => {
    popupStore.openPopup({
      props: { size: 'sm' },
      contentProps: {
        locale: locale.deleteConfirm(reserve.name),
        onAccept: () => onAcceptDelete(reserve),
        onCancel: onCancelDelete
      },
      content: Confirm
    });
  };

  if (!reserves || !reserves.length) {
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
          {reserves.map(reserve => (
            <TableRow sx={styles.tableRow} key={reserve.id}>
              <TableCell width="20%" align="left">{format(new Date(reserve.date), 'dd.MM.yyyy')}</TableCell>
              <TableCell width="20%" align="left">{reserve.name}</TableCell>
              <TableCell width="20%" align="left">{reserve.phone}</TableCell>
              <TableCell width="15%" align="left">{reserve.personsCount}</TableCell>
              <TableCell width="15%" align="left">{reserve.totalAmount}</TableCell>

              <TableCell width="5%" align="left">
                <IconButton size="small" onClick={() => onEdit(reserve.id)}>
                  <EditIcon color="secondary" />
                </IconButton>
              </TableCell>

              <TableCell width="5%" align="right">
                <IconButton size="small" onClick={() => onDelete(reserve)}>
                  <DeleteIcon color="secondary" />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default BanquetsReservesList;
