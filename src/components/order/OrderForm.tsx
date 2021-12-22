import React, { FC } from 'react';
import { observer } from 'mobx-react-lite';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Typography } from '@mui/material';
import yup from '../../core/yup-extended';
import useLocale from '../../hooks/useLocale';
import styles from './styles';
import Locale from './locale';
import { IContractorNomenclatures } from '../../store/ContractorsStore';
import Loader from '../loader/Loader';
import useStore from '../../hooks/useStore';
import MuiFormInput from '../form-controls/MuiFormInput';
import MuiFormButton from '../form-controls/MuiFormButton';
import MuiForm from '../form-controls/MuiForm';

interface IForm {
  [id: string]: number | string;
}

interface IOrderForm {
  data: Array<IContractorNomenclatures>;
  onSubmit: SubmitHandler<IForm>;
}

const OrderForm: FC<IOrderForm> = ({ data, onSubmit }: IOrderForm) => {
  const locale = useLocale(Locale);
  const { contractorsStore } = useStore();

  const generateSchema = (fields: Array<IContractorNomenclatures>) => {
    const object: { [id: string]: any } = {};

    fields.forEach((field) => {
      object[field.id] = yup.string().required();
    });

    return yup.object(object);
  };

  const methods = useForm<IForm>(
    {
      resolver: yupResolver(generateSchema(data)),
      mode: 'onTouched'
    }
  );

  return (
    <Box sx={styles.orderForm}>
      <Loader isLoading={contractorsStore.isLoadingOrder} />
      <MuiForm methods={methods} onSubmit={onSubmit}>
        {data.map(item => (
          <Box sx={styles.orderItem} key={item.id}>
            <Typography variant="body2">{item.title}</Typography>
            <Box sx={styles.input}>
              <MuiFormInput
                name={item.id}
                label={locale.inputLabel(item.unit)}
              />
            </Box>
          </Box>
        ))}
        <MuiFormButton label={locale.orderButtonLabel} />
      </MuiForm>
    </Box>
  );
};

export default observer<IOrderForm>(OrderForm);
