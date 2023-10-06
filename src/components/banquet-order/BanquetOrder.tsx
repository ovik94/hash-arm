import React, { FC, useEffect, useState } from 'react';
import { Box, Grid } from '@mui/material';
import { observer } from 'mobx-react-lite';
import MuiSuggestSelector from '../../mui-components/MuiSuggestSelector';
import { IMenuGroup, IMenuItem } from '../../store/BanquetsStore';
import useStore from '../../hooks/useStore';
import { IClientDataForm } from '../client-data-form/ClientDataForm';
import styles from './styles';
import BanquetOrderList from './BanquetOrderList';

interface IBanquetsList {
  clientData: IClientDataForm;
}

export interface IOrderDataItem extends IMenuItem {
  count: number;
  weight: number;
}

export interface IOrderData {
  id: string;
  name: string;
  items: Array<IOrderDataItem>
}

const BanquetOrder: FC<IBanquetsList> = ({ clientData }) => {
  const { banquetsStore: {
    fetchMenu,
    menu,
    addItemOrderData,
    fetchMenuItem,
    orderData,
    orderSum
  } } = useStore();
  console.log(clientData, 'clientData');
  console.log(orderData, 'orderData');

  useEffect(() => {
    if (!menu.length) {
      fetchMenu();
    }
  }, [menu]);

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
    <Box sx={styles.order}>
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
      <BanquetOrderList />
    </Box>
  );
};

export default observer(BanquetOrder);
