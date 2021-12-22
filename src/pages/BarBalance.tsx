import React, { FC, useEffect } from 'react';
import { observer } from 'mobx-react';
import {
  Paper,
  TableRow,
  TableHead,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  Typography,
  SxProps
} from '@mui/material';
import { Theme } from '@mui/material/styles';
import useStore from '../hooks/useStore';
import useLocale from '../hooks/useLocale';
import useTitle from '../hooks/useTitle';
import { IBalance } from '../store/BalanceStore';

const Locale = {
  title: 'Минимальные остатки на складе',
  headCells: ['Название', 'Категория', 'Остаток', 'Ед.измерения']
};

const styles: Record<string, SxProps<Theme>> = {
  title: theme => ({
    mb: theme.spacing(4)
  }),
  table: theme => ({
    minWidth: 650,
    margin: theme.spacing(3, 0)
  }),
  tableRow: theme => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover
    }
  }),
  categoryName: theme => ({
    m: theme.spacing(2)
  })
};

const BarBalance: FC = (): JSX.Element => {
  const locale = useLocale(Locale);
  const { balanceStore } = useStore();

  useTitle(locale.title);

  useEffect(() => {
    if (!balanceStore.barBalance.length) {
      balanceStore.fetchBarBalance();
    }
  }, [balanceStore.barBalance]);

  const renderTable = (cells: Array<string>, data: Array<IBalance>, category: string) => {
    if (!data.length) {
      return null;
    }

    return (
      <TableContainer component={Paper} sx={styles.table}>
        <Typography variant="h3" sx={styles.categoryName}>{category}</Typography>
        <Table size="small">
          <TableHead>
            <TableRow>
              {cells.map((cell: string, index: number) => (
                // eslint-disable-next-line react/no-array-index-key
                <TableCell key={index} align={`${index === 0 ? 'left' : 'right'}`}>
                  <Typography variant="h4">{cell}</Typography>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.filter(item => item.category === category).map(product => (
              <TableRow sx={styles.tableRow} key={product.name}>
                <TableCell width="70%" component="th" scope="row">{product.name}</TableCell>
                <TableCell width="20%" align="right">{product.category}</TableCell>
                <TableCell width="10%" align="right">{product.balance}</TableCell>
                <TableCell width="100%" align="right">{product.unit}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  };

  return (
    <div>
      <Typography variant="h2" sx={styles.title}>{locale.title}</Typography>
      {renderTable(locale.headCells, balanceStore.barBalance, 'Напитки')}
      {renderTable(locale.headCells, balanceStore.barBalance, 'Крепкий Алкоголь')}
    </div>
  );
};

export default observer(BarBalance);
