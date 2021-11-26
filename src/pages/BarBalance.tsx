import React, { FC, useEffect } from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import { observer } from 'mobx-react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import useStore from '../hooks/useStore';
import useLocale from '../hooks/useLocale';
import useTitle from '../hooks/useTitle';
import { IBalance } from '../store/BalanceStore';

const Locale = {
  title: 'Минимальные остатки на складе',
  headCells: ['Название', 'Категория', 'Остаток', 'Ед.измерения']
};

const useStyles = makeStyles(theme => createStyles({
  title: {
    marginBottom: theme.spacing(4)
  },
  table: {
    minWidth: 650,
    margin: theme.spacing(3, 0)
  },
  tableTitle: {
    margin: theme.spacing(2, 2)
  },
  tableRow: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover
    }
  }
}));

const BarBalance: FC = (): JSX.Element => {
  const classes = useStyles();
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
      <TableContainer component={Paper} className={classes.table}>
        <Typography variant="h3" className={classes.tableTitle}>{category}</Typography>
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
              <TableRow className={classes.tableRow} key={product.name}>
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
      <Typography variant="h2" className={classes.title}>{locale.title}</Typography>
      {renderTable(locale.headCells, balanceStore.barBalance, 'Напитки')}
      {renderTable(locale.headCells, balanceStore.barBalance, 'Крепкий Алкоголь')}
    </div>
  );
};

export default observer(BarBalance);
