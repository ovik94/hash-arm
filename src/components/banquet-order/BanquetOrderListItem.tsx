import React, { FC } from 'react';
import { Grid, Typography, IconButton, Box } from '@mui/material';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { IOrderData, IOrderDataItem } from './BanquetOrder';
import useLocale from '../../hooks/useLocale';
import Locale from './locale';
import styles from './styles';
import useStore from '../../hooks/useStore';

interface IBanquetOrderListItem {
  item: IOrderDataItem;
  groupData: IOrderData;
}

const BanquetOrderListItem: FC<IBanquetOrderListItem> = ({ item, groupData }) => {
  const locale = useLocale(Locale);
  const { banquetsStore: { editCountOrderData, deleteItemOrderData, addOrderSum, subtractOrderSum } } = useStore();

  const onMinusCount = () => {
    if (!(item.count - 1)) {
      deleteItemOrderData(groupData.id, item.id);
    } else {
      editCountOrderData(groupData.id, item.id, item.count - 1);
    }

    subtractOrderSum(item.price);
  };

  const onPlusCount = () => {
    editCountOrderData(groupData.id, item.id, (item.count || 0) + 1);
    addOrderSum(item.price);
  };

  const onDelete = () => {
    deleteItemOrderData(groupData.id, item.id);
    subtractOrderSum(item.price);
  };

  return (
    <Grid container spacing={2} key={item.id} sx={styles.item}>
      <Grid item xs={6} md={5}>
        <Typography variant="body2" sx={styles.itemTitle}>{item.name}</Typography>
      </Grid>
      <Grid item xs={6} md={2}>
        <Typography variant="subtitle1" sx={styles.itemPrice}>
          <Box dangerouslySetInnerHTML={{ __html: locale.sumCurrency(item.price * item.count) }} />
        </Typography>
      </Grid>
      <Grid item xs={4} md={1.5}>
        <Typography variant="subtitle1">{`${item.weight * item.count} гр.`}</Typography>
      </Grid>
      <Grid item xs={6} md={2.5}>
        <Box sx={styles.counter}>
          <IconButton size="small" onClick={onMinusCount}>
            <RemoveIcon color="secondary" />
          </IconButton>
          <Typography variant="subtitle1" sx={styles.itemCount}>{`${item.count} шт`}</Typography>
          <IconButton size="small" onClick={onPlusCount}>
            <AddIcon color="secondary" />
          </IconButton>
        </Box>
      </Grid>
      <Grid item xs={2} md={1}>
        <IconButton size="small" onClick={onDelete}>
          <DeleteIcon />
        </IconButton>
      </Grid>
    </Grid>
  );
};

export default BanquetOrderListItem;
