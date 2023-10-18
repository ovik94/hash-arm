import React, { FC } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Grid, Typography } from '@mui/material';
import yup from '../../core/yup-extended';
import useStore from '../../hooks/useStore';
import MuiForm from '../form-controls/MuiForm';
import MuiFormSelect from '../form-controls/MuiFormSelect';
import MuiFormInput from '../form-controls/MuiFormInput';
import MuiFormButton from '../form-controls/MuiFormButton';
import MuiFormMaskedInput from '../form-controls/MuiFormMaskedInput';
import useLocale from '../../hooks/useLocale';
import Locale from './locale';
import { CounterpartyTypes, ICounterparty } from '../../store/CounterpartiesStore';

export interface ICounterpartyDetailForm {
  name: string;
  type: CounterpartyTypes;
  companyName?: string;
  phone?: string;
  description?: string;
}

interface ICounterpartyDetailFormProps {
  counterparty?: ICounterparty | null;
}

const CounterpartyDetailForm: FC<ICounterpartyDetailFormProps> = ({ counterparty }) => {
  const { counterpartiesStore, popupStore } = useStore();
  const locale = useLocale(Locale);

  const schema = yup.object({
    name: yup.string().required(),
    type: yup.string().required(),
    companyName: yup.string(),
    phone: yup.string(),
    description: yup.string()
  });

  const methods = useForm<ICounterpartyDetailForm>({
    resolver: yupResolver(schema),
    mode: 'onSubmit',
    defaultValues: {
      name: counterparty?.name || '',
      companyName: counterparty?.companyName || '',
      phone: counterparty?.phone || '',
      description: counterparty?.description || '',
      type: counterparty?.type || CounterpartyTypes.provider
    }
  });

  const onSubmit: SubmitHandler<ICounterpartyDetailForm> = (data) => {
    if (counterparty?.id) {
      counterpartiesStore.editUCounterparty({ id: counterparty.id, ...data }).then(() => {
        popupStore.closePopup();
      });
    } else {
      counterpartiesStore.addCounterparty(data).then(() => {
        popupStore.closePopup();
      });
    }
  };

  const typeOptions = Object.keys(locale.counterpartyTypes)
    .map(type => ({ label: locale.counterpartyTypes[type], value: type }));

  return (
    <MuiForm methods={methods} onSubmit={onSubmit}>
      <Typography variant="h6" mb={3}>{locale.title}</Typography>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <MuiFormInput name="name" label={locale.nameLabel} />
        </Grid>
        <Grid item xs={6}>
          <MuiFormSelect
            name="type"
            options={typeOptions}
            label={locale.typeLabel}
          />
        </Grid>
        <Grid item xs={6}>
          <MuiFormMaskedInput
            mask="+7-###-###-##-##"
            name="phone"
            label={locale.phoneLabel}
          />
        </Grid>
        <Grid item xs={6}>
          <MuiFormInput
            name="companyName"
            label={locale.companyNameLabel}
          />
        </Grid>
        <Grid item xs={12}>
          <MuiFormInput
            name="description"
            label={locale.descriptionLabel}
            multiline
            minRows={3}
            maxRows={3}
          />
        </Grid>
      </Grid>

      <MuiFormButton label={counterparty?.id ? locale.buttons.update : locale.buttons.add} sx={{ mt: 3 }} />
    </MuiForm>
  );
};

export default CounterpartyDetailForm;
