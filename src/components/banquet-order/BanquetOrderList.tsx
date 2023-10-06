import React, { FC } from 'react';
import { TransitionGroup } from 'react-transition-group';
import { Paper, Typography, Box, Collapse } from '@mui/material';
import { observer } from 'mobx-react-lite';
import styles from './styles';
import BanquetOrderListItem from './BanquetOrderListItem';
import useStore from '../../hooks/useStore';
import Loader from '../loader/Loader';

const BanquetOrderList: FC = () => {
  const { banquetsStore: { orderData, isLoading } } = useStore();

  return (
    <Paper sx={styles.orderList} elevation={3}>
      <Loader isLoading={isLoading} />
      {orderData.map(orderItem => (
        <Box key={orderItem.id} mb={2}>
          <Typography variant="h4" mb={1}>{orderItem.name}</Typography>
          <TransitionGroup>
            {orderItem.items.map(item => (
              <Collapse key={item.name}>
                <BanquetOrderListItem item={item} groupData={orderItem} />
              </Collapse>
            ))}
          </TransitionGroup>
        </Box>
      ))}

      {/* {renderFooter()} */}
    </Paper>
  );
};

export default observer(BanquetOrderList);
