import React, { FC } from 'react';
import { Box, Grid } from '@mui/material';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import MuiFormInput from '../form-controls/MuiFormInput';
import MuiFormMaskedInput from '../form-controls/MuiFormMaskedInput';
import MuiFormDateTimePicker from '../form-controls/MuiFormDateTimePicker';
import MuiForm from '../form-controls/MuiForm';
import yup from '../../core/yup-extended';
import Locale from './locale';
import useLocale from '../../hooks/useLocale';
import MuiFormButton from '../form-controls/MuiFormButton';

export interface IClientDataForm {
  name: string;
  phone: string;
  personsCount: number;
  date: Date;
}

interface IClientDataProps {
  onSubmitClientForm: (data: IClientDataForm) => void;
}

const ClientDataForm: FC<IClientDataProps> = ({ onSubmitClientForm }) => {
  const locale = useLocale(Locale);

  const schema = yup.object({
    name: yup.string().required(),
    phone: yup.string().isPhone().required(),
    personsCount: yup.number().required().min(10, locale.PERSON_MIN(10)).max(40, locale.PERSON_MAX(40)),
    date: yup
      .date()
      .required()
      .typeError('Некорректное значение')
      .nullable()
  });

  const methods = useForm<IClientDataForm>({
    resolver: yupResolver(schema),
    defaultValues: {
      name: '',
      phone: '',
      personsCount: 10,
      date: undefined
    },
    mode: 'onTouched'
  });

  const onSubmit: SubmitHandler<IClientDataForm> = (data) => {
    onSubmitClientForm(data);
  };

  return (
    <MuiForm methods={methods} onSubmit={onSubmit}>
      <Box>
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={2}>
            <MuiFormInput name="name" label={locale.nameLabel} />
          </Grid>
          <Grid item xs={12} md={2}>
            <MuiFormInput name="personsCount" label={locale.personsCount} />
          </Grid>
          <Grid item xs={12} md={3}>
            <MuiFormMaskedInput
              mask="+7-###-###-##-##"
              name="phone"
              label={locale.phoneLabel}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <MuiFormDateTimePicker name="date" label={locale.dateLabel} />
          </Grid>
          <Grid item xs={12} md={2}>
            <MuiFormButton label={locale.buttonLabel} />
          </Grid>
        </Grid>
      </Box>
    </MuiForm>
  );
};

export default ClientDataForm;
