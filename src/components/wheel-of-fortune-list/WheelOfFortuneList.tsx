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
import { IWheelOfFortuneData } from '../../store/FortuneStore';
import WheelOfFortuneDetailForm from '../wheel-of-fortune-detail-form/WheelOfFortuneDetailForm';
import Confirm from '../confirm/Confirm';

interface IWheelOfFortuneListProps {
  data: Array<IWheelOfFortuneData> | null;
}

const WheelOfFortuneList: FC<IWheelOfFortuneListProps> = ({ data }) => {
  const locale = useLocale(Locale);
  const { popupStore, fortuneStore } = useStore();

  const onEdit = (fortune: IWheelOfFortuneData) => {
    popupStore.openPopup({
      props: { size: 'md' },
      contentProps: { fortuneData: fortune },
      content: WheelOfFortuneDetailForm
    });
  };

  const onAcceptDelete = (fortune: IWheelOfFortuneData) => {
    if (fortune.id) {
      fortuneStore.deleteWheelOfFortune(fortune.id).then(() => {
        popupStore.closePopup();
      });
    }
  };

  const onCancelDelete = () => {
    popupStore.closePopup();
  };

  const onDelete = (fortune: IWheelOfFortuneData) => {
    popupStore.openPopup({
      props: { size: 'sm' },
      contentProps: {
        locale: locale.deleteConfirm(fortune.code),
        onAccept: () => onAcceptDelete(fortune),
        onCancel: onCancelDelete
      },
      content: Confirm
    });
  };

  if (!data || !data.length) {
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
          {data.map(fortune => (
            <TableRow sx={styles.tableRow} key={fortune.id}>
              <TableCell width="20%" align="left">{fortune.code}</TableCell>
              <TableCell width="20%" align="left">{fortune.description}</TableCell>
              <TableCell width="40%" align="left">
                {fortune.content.map(contentItem => contentItem.title).join(', ')}
              </TableCell>

              <TableCell width="5%" align="left">
                <IconButton size="small" onClick={() => onEdit(fortune)}>
                  <EditIcon color="secondary" />
                </IconButton>
              </TableCell>

              <TableCell width="5%" align="right">
                <IconButton size="small" onClick={() => onDelete(fortune)}>
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

export default WheelOfFortuneList;
