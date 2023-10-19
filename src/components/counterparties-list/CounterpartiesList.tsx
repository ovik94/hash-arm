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
import useLocale from '../../hooks/useLocale';
import Locale from './locale';
import styles from './styles';
import useStore from '../../hooks/useStore';
import Confirm from '../confirm/Confirm';
import { ICounterparty } from '../../store/CounterpartiesStore';
import CounterpartyDetailForm from '../counterparty-detail-form/CounterpartyDetailForm';

interface IUsersListProps {
  counterparties: Array<ICounterparty>;
}

const CounterpartiesList: FC<IUsersListProps> = ({ counterparties }) => {
  const locale = useLocale(Locale);
  const { popupStore, counterpartiesStore } = useStore();

  const onEdit = (counterparty: ICounterparty) => {
    popupStore.openPopup({
      props: { size: 'md' },
      contentProps: { counterparty },
      content: CounterpartyDetailForm
    });
  };

  const onAcceptDelete = (counterparty: ICounterparty) => {
    counterpartiesStore.deleteUCounterparty(counterparty).then(() => {
      popupStore.closePopup();
    });
  };

  const onCancelDelete = () => {
    popupStore.closePopup();
  };

  const onDelete = (counterparty: ICounterparty) => {
    popupStore.openPopup({
      props: { size: 'sm' },
      contentProps: {
        locale: locale.deleteConfirm(counterparty.name),
        onAccept: () => onAcceptDelete(counterparty),
        onCancel: onCancelDelete
      },
      content: Confirm
    });
  };

  if (!counterparties || !counterparties.length) {
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
          {counterparties.map(counterparty => (
            <TableRow sx={styles.tableRow} key={counterparty.id}>
              <TableCell width="15%" align="left">{counterparty.name}</TableCell>
              <TableCell width="15%" align="left">{locale.counterpartyTypes[counterparty.type]}</TableCell>
              <TableCell width="15%" align="left">{counterparty.companyName}</TableCell>
              <TableCell width="15%" align="left">{counterparty.phone}</TableCell>
              <TableCell width="30%" align="left">{counterparty.description}</TableCell>

              <TableCell width="5%" align="left">
                <IconButton size="small" onClick={() => onEdit(counterparty)}>
                  <EditIcon color="secondary" />
                </IconButton>
              </TableCell>

              <TableCell width="5%" align="right">
                <IconButton size="small" onClick={() => onDelete(counterparty)}>
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

export default CounterpartiesList;
