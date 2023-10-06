import React, { ChangeEvent, FC, useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Box, Typography, FormControlLabel, Checkbox, TextField, Button, InputAdornment } from '@mui/material';
import useStore from '../../hooks/useStore';
import styles from './styles';
import useLocale from '../../hooks/useLocale';
import Locale from './locale';
import { ISaveBanquetBody } from '../../store/BanquetsStore';

const BanquetOrderListFooter: FC = () => {
  const locale = useLocale(Locale);
  const {
    banquetsStore: { orderData, clientData, setOrderSum, setClientData, setOrderData, orderSum, save },
    userStore: { user }
  } = useStore();
  const [saleChecked, setSaleChecked] = useState(false);
  const [sale, setSale] = useState('');
  const [serviceFeeChecked, setServiceFeeChecked] = useState(false);
  const [totalAmount, setTotalAmount] = useState(orderSum);

  const onSave = () => {
    if (clientData) {
      const body: ISaveBanquetBody = {
        ...clientData,
        menu: orderData,
        sum: orderSum,
        totalAmount,
        admin: user.name
      };

      if (saleChecked) {
        body.sale = sale;
      }

      if (serviceFeeChecked) {
        body.serviceFee = '12';
      }

      save(body).then(() => {
        setClientData(null);
        setOrderData([]);
        setOrderSum(0);
      });
    }
  };

  const onCheckedSale = (event: ChangeEvent<HTMLInputElement>) => {
    setSaleChecked(event.target.checked);
  };

  const onCheckedServiceFee = (event: ChangeEvent<HTMLInputElement>) => {
    setServiceFeeChecked(event.target.checked);
  };

  const onSale = (event: ChangeEvent<HTMLInputElement>) => {
    setSale(event.target.value);
  };

  useEffect(() => {
    let newTotalAmount = orderSum;

    if (saleChecked) {
      newTotalAmount = orderSum - ((orderSum / 100) * Number(sale));
    }

    if (serviceFeeChecked) {
      newTotalAmount += ((newTotalAmount / 100) * 12);
    }

    setTotalAmount(newTotalAmount);
  }, [orderSum, saleChecked, serviceFeeChecked, sale]);

  return (
    <Box sx={styles.footer}>
      <Box sx={styles.sum}>
        <Typography variant="body1" mb={1}>{locale.sumLabel}</Typography>
        <Box dangerouslySetInnerHTML={{ __html: locale.sumCurrency(orderSum) }} />
      </Box>
      <FormControlLabel
        label={locale.serviceFeeLabel}
        control={<Checkbox checked={serviceFeeChecked} onChange={onCheckedServiceFee} size="small" />}
      />
      <Box sx={styles.sale}>
        <FormControlLabel
          label={locale.addSaleLabel}
          control={<Checkbox checked={saleChecked} onChange={onCheckedSale} size="small" />}
        />

        {saleChecked && (
        <TextField
          label={locale.saleLabel}
          value={sale}
          variant="standard"
          onChange={onSale}
          InputProps={{
            endAdornment: <InputAdornment position="end">%</InputAdornment>,
            componentsProps: { input: { min: '0', max: '100' } }
          }}
          type="number"
          sx={styles.saleInput}
        />
        )}
      </Box>

      <Box sx={styles.sum}>
        <Typography variant="h2" mb={1}>{locale.totalAmountLabel}</Typography>
        <Typography variant="h3">
          <div dangerouslySetInnerHTML={{ __html: locale.sumCurrency(totalAmount) }} />
        </Typography>
      </Box>

      <Button
        onClick={onSave}
        variant="contained"
        color="primary"
      >
        Сохранить
      </Button>
    </Box>

  );
};

export default observer(BanquetOrderListFooter);
