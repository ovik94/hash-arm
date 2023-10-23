import React, { FC } from 'react';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import useLocale from '../../hooks/useLocale';
import Locale from './locale';
import { IBarBalance } from '../../store/BalanceStore';
import styles from './styles';

interface IBarBalanceTableProps {
  data?: Array<IBarBalance>;
}

const BarBalanceTable: FC<IBarBalanceTableProps> = ({ data }) => {
  const locale = useLocale(Locale);

  if (!data || !data.length) {
    return null;
  }

  return (
    <TableContainer component={Paper} sx={styles.table}>
      <Typography variant="h3" sx={styles.categoryName}>{data[0].category}</Typography>
      <Table size="small">
        <TableHead>
          <TableRow>
            {locale.headCells.map((cell: string, index: number) => (
              // eslint-disable-next-line react/no-array-index-key
              <TableCell key={index} align="left">
                <Typography variant="h4">{cell}</Typography>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map(product => (
            <TableRow sx={styles.tableRow} key={product.name}>
              <TableCell width="70%" component="th" scope="row">{product.name}</TableCell>
              <TableCell width="30%" align="left">{product.balance}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default BarBalanceTable;
