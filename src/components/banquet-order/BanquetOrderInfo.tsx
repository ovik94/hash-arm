import React, { FC, useEffect, useMemo } from 'react';
import { Box, Typography, InputAdornment, Stack, Grid } from '@mui/material';
import { SubmitHandler, useForm, useWatch } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import styles from './styles';
import useLocale from '../../hooks/useLocale';
import Locale from './locale';
import MuiForm from '../form-controls/MuiForm';
import yup from '../../core/yup-extended';
import MuiFormInput from '../form-controls/MuiFormInput';
import MuiFormButton from '../form-controls/MuiFormButton';
import MuiFormCheckbox from '../form-controls/MuiFormCheckbox';

export interface IBanquetOrderInfoForm {
  sale?: string;
  comment?: string;
  serviceFee?: boolean;
  totalAmount: number;
}

interface IBanquetOrderInfoProps {
  orderInfo: IBanquetOrderInfoForm | null;
  orderSum: number;
  onSaveReserve: (orderInfo: IBanquetOrderInfoForm) => void;
}

const BanquetOrderInfo: FC<IBanquetOrderInfoProps> = ({
  orderInfo,
  orderSum,
  onSaveReserve
}) => {
  const locale = useLocale(Locale);

  const schema = yup.object({
    sale: yup.string(),
    comment: yup.string(),
    serviceFee: yup.bool(),
    totalAmount: yup.number().required()
  });

  const methods = useForm<IBanquetOrderInfoForm>({
    resolver: yupResolver(schema),
    mode: 'onSubmit',
    defaultValues: useMemo(() => orderInfo || ({
      sale: '',
      comment: '',
      serviceFee: true,
      totalAmount: orderSum
    }), [orderInfo, orderSum])
  });

  const sale = useWatch({ control: methods.control, name: 'sale' });
  const serviceFee = useWatch({ control: methods.control, name: 'serviceFee' });
  const totalAmount = useWatch({ control: methods.control, name: 'totalAmount' });

  const onSubmit: SubmitHandler<IBanquetOrderInfoForm> = (data) => {
    onSaveReserve(data);
  };

  useEffect(() => {
    if (orderInfo) {
      methods.reset(orderInfo);
    }
  }, [orderInfo]);

  useEffect(() => {
    let newTotalAmount = orderSum;

    if (sale) {
      newTotalAmount = orderSum - ((orderSum / 100) * Number(sale));
    }

    if (serviceFee) {
      newTotalAmount += ((orderSum / 100) * 12);
    }

    methods.setValue('totalAmount', newTotalAmount);
  }, [orderSum, sale, serviceFee]);

  return (
    <Stack>
      <MuiForm methods={methods} onSubmit={onSubmit}>
        <Grid container alignItems="center">
          <Grid item xs={12}>
            <Stack direction="row" justifyContent="space-between" alignItems="center" my={2}>
              <Typography variant="body1" mb={1}>{locale.sumLabel}</Typography>
              <Box dangerouslySetInnerHTML={{ __html: locale.sumCurrency(orderSum) }} />
            </Stack>
          </Grid>
          <Grid item xs={8}>
            <MuiFormCheckbox name="serviceFee" label={locale.serviceFeeLabel} />
          </Grid>
          <Grid item xs={4}>
            <MuiFormInput
              name="sale"
              label={locale.saleLabel}
              sx={styles.saleInput}
              InputProps={{
                endAdornment: <InputAdornment position="end">%</InputAdornment>,
                componentsProps: { input: { min: '0', max: '100' } }
              }}
              type="number"
              variant="standard"
            />
          </Grid>

          <Grid item xs={12}>
            <MuiFormInput
              name="comment"
              label={locale.commentLabel}
              variant="standard"
              sx={{ mt: 2 }}
            />
          </Grid>

          <Grid item xs={12}>
            <Stack direction="row" justifyContent="space-between" alignItems="center" my={2}>
              <Typography variant="h2" mb={1}>{locale.totalAmountLabel}</Typography>
              <Typography variant="h3" dangerouslySetInnerHTML={{ __html: locale.sumCurrency(totalAmount) }} />
            </Stack>
          </Grid>

          <Grid item xs={12}>
            <MuiFormButton label={locale.buttons.save} />
          </Grid>
        </Grid>
      </MuiForm>
    </Stack>
  );
};

export default BanquetOrderInfo;
