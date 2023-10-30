import React, { FC } from 'react';
import { TransitionGroup } from 'react-transition-group';
import { Paper, Typography, Box, Collapse } from '@mui/material';
import { observer } from 'mobx-react-lite';
import styles from './styles';
import BanquetOrderListItem from './BanquetOrderListItem';
import useStore from '../../hooks/useStore';
import Loader from '../loader/Loader';
import BanquetOrderInfo, { IBanquetOrderInfoForm } from './BanquetOrderInfo';
import { IOrderData } from './BanquetOrderMenu';

interface IBanquetOrderListProps {
  orderData: Array<IOrderData>;
  orderSum: number;
  orderInfo: IBanquetOrderInfoForm | null;
  onSaveReserve: (orderInfo: IBanquetOrderInfoForm) => void;
  onChangeOrderSum: (sum: number) => void;
  onChangeOrderData: (data: Array<IOrderData>) => void;
}

const BanquetOrderList: FC<IBanquetOrderListProps> = ({
  orderData,
  orderSum,
  onSaveReserve,
  orderInfo,
  onChangeOrderSum,
  onChangeOrderData
}) => {
  const { banquetsStore: { isLoading } } = useStore();

  const addOrderSum = (amount: number) => {
    onChangeOrderSum(orderSum + amount);
  };

  const subtractOrderSum = (amount: number) => {
    onChangeOrderSum(orderSum - amount);
  };

  const editCountOrderData = (groupId: string, id: string, newCount: number) => {
    const newOrderData = orderData.map(orderGroup => (orderGroup.id === groupId ? ({
      ...orderGroup,
      items: orderGroup.items.map(orderItem => (orderItem.id === id ? ({ ...orderItem, count: newCount }) : orderItem))
    }) : orderGroup));

    onChangeOrderData(newOrderData);
  };

  const deleteItemOrderData = (groupId: string, id: string) => {
    const newOrderData = orderData.map(orderGroup => (orderGroup.id === groupId ? ({
      ...orderGroup,
      items: orderGroup.items.filter(orderItem => orderItem.id !== id)
    }) : orderGroup)).filter(item => item.items.length > 0);

    onChangeOrderData(newOrderData);
  };

  return (
    <Paper sx={styles.orderList} elevation={3}>
      <Loader isLoading={isLoading} />
      {orderData.map(orderItem => (
        <Box key={orderItem.id} mb={2}>
          <Typography variant="h4" mb={1}>{orderItem.name}</Typography>
          <TransitionGroup>
            {orderItem.items.map(item => (
              <Collapse key={item.name}>
                <BanquetOrderListItem
                  item={item}
                  groupData={orderItem}
                  editCountOrderData={editCountOrderData}
                  deleteItemOrderData={deleteItemOrderData}
                  addOrderSum={addOrderSum}
                  subtractOrderSum={subtractOrderSum}
                />
              </Collapse>
            ))}
          </TransitionGroup>
        </Box>
      ))}
      {orderData.length > 0 && (
        <BanquetOrderInfo
          onSaveReserve={onSaveReserve}
          orderInfo={orderInfo}
          orderSum={orderSum}
        />
      )}
    </Paper>
  );
};

export default observer(BanquetOrderList);
