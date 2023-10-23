import React, { FC, useMemo } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Grid, IconButton, Stack, Typography } from '@mui/material';
import { StringSchema } from 'yup';
import { observer } from 'mobx-react';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import yup from '../../core/yup-extended';
import MuiForm from '../form-controls/MuiForm';
import MuiFormInput from '../form-controls/MuiFormInput';
import MuiFormButton from '../form-controls/MuiFormButton';
import useLocale from '../../hooks/useLocale';
import Locale from './locale';
import styles from './styles';
import useStore from '../../hooks/useStore';
import { IBarNomenclature } from '../../store/BalanceStore';

type BarBalanceLimitsType = { [id: string]: string };

interface IBarBalanceLimitsProps {
  nomenclature: Array<IBarNomenclature>;
  onPrevView: () => void;
}

const BarBalanceLimits: FC<IBarBalanceLimitsProps> = ({ nomenclature, onPrevView }) => {
  const locale = useLocale(Locale);
  const { balanceStore, setLoading } = useStore();

  const schema = useMemo(() => {
    const resultSchema: { [id: string]: StringSchema } = {};

    nomenclature.forEach((item) => {
      resultSchema[item.id] = yup.string();
    });

    return yup.object(resultSchema);
  }, [nomenclature]);

  const defaultValues = useMemo(() => {
    const values: { [id: string]: string } = {};

    nomenclature.forEach((item) => {
      values[item.id] = String(item.limit);
    });

    return values;
  }, [nomenclature]);

  const methods = useForm<BarBalanceLimitsType>({
    resolver: yupResolver(schema),
    mode: 'onSubmit',
    defaultValues
  });

  const onSubmit: SubmitHandler<BarBalanceLimitsType> = (data) => {
    const limits = Object.keys(data).map(id => ({
      id,
      limit: data[id] ? Number(data[id]) : undefined
    }));

    balanceStore.saveBarLimits(limits)
      .then(() => {
        setLoading(true);
        Promise.all([
          balanceStore.fetchBarBalance(),
          balanceStore.fetchBarNomenclature()
        ]).then(() => {
          setLoading(false);
          onPrevView();
        });
      });
  };

  return (
    <MuiForm methods={methods} onSubmit={onSubmit}>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={4}>
        <IconButton onClick={onPrevView} color="inherit" size="small">
          <ArrowBackIosIcon />
        </IconButton>
        <Typography variant="h6" ml={1} sx={styles.title}>{locale.description}</Typography>
        <MuiFormButton label={locale.buttons.save} sx={styles.button} />
      </Stack>
      <Grid container columnSpacing={4}>
        {nomenclature.map(item => (
          <Grid item xs={6} key={item.id}>
            <Stack direction="row" justifyContent="space-between" alignItems="baseline" sx={styles.nomenclatureItem}>
              <Typography variant="body1" width="80%">{item.name}</Typography>
              <MuiFormInput name={item.id} label={locale.inputLabel} type="number" />
            </Stack>
          </Grid>
        ))}
      </Grid>
    </MuiForm>
  );
};

export default observer(BarBalanceLimits);
