import React, { FC, useEffect } from 'react';
import { Grid } from '@mui/material';
import { observer } from 'mobx-react-lite';
import MuiSuggestSelector from '../../mui-components/MuiSuggestSelector';
import { IMenuGroup, IMenuItem } from '../../store/BanquetsStore';
import useStore from '../../hooks/useStore';
import styles from './styles';

export interface IOrderDataItem extends IMenuItem {
  count: number;
  weight: number;
}

export interface IOrderData {
  id: string;
  name: string;
  items: Array<IOrderDataItem>
}

interface IBanquetOrderMenuProps {
  orderData: Array<IOrderData>;
  orderSum: number;
  onChangeOrderSum: (sum: number) => void;
  onChangeOrderData: (data: Array<IOrderData>) => void;
}

const BanquetOrderMenu: FC<IBanquetOrderMenuProps> = ({
  orderData,
  orderSum,
  onChangeOrderSum,
  onChangeOrderData
}) => {
  const { banquetsStore: { fetchMenu, menu, fetchMenuItem } } = useStore();

  useEffect(() => {
    if (!menu.length) {
      fetchMenu();
    }
  }, [menu]);

  const addItemOrderData = (id: string, name: string, option: IOrderDataItem) => {
    const currentData = orderData.find(orderItem => orderItem.id === id);
    let newOrderData;

    if (currentData) {
      const newItems = currentData.items.slice(0);
      newItems.push(option);
      newOrderData = orderData.map(orderItem => (orderItem.id === id ? ({
        ...orderItem,
        items: newItems
      }) : orderItem));
    } else {
      const copyOrderData = orderData.slice(0);
      copyOrderData.push({ id, name, items: [option] });

      newOrderData = copyOrderData;
    }

    onChangeOrderSum(orderSum + option.price);
    onChangeOrderData(newOrderData);
  };

  const getOptionLabel = (option: IMenuItem) => option.name || '';

  const onAddMenuItem = (option: IMenuItem, menuGroup: IMenuGroup) => {
    if (option) {
      fetchMenuItem(option.id).then((itemData) => {
        const newOption = {
          ...option,
          count: 1,
          weight: itemData.portionWeightGrams || 0
        };
        addItemOrderData(menuGroup.id, menuGroup.name, newOption);
      });
    }
  };

  return (
    <Grid container spacing={2} sx={styles.menuCategory}>
      {menu.map(menuGroup => (
        <Grid item xs={12} key={menuGroup.name}>
          <MuiSuggestSelector
            label={menuGroup.name}
            onChange={(option: IMenuItem) => onAddMenuItem(option, menuGroup)}
            getOptionLabel={getOptionLabel}
            options={menuGroup.items}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default observer(BanquetOrderMenu);
