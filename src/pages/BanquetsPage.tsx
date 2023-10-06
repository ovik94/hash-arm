import React, { FC } from 'react';
import { Box, Typography } from '@mui/material';
import { observer } from 'mobx-react-lite';
import useLocale from '../hooks/useLocale';
import useTitle from '../hooks/useTitle';
import ClientDataForm, { IClientDataForm } from '../components/client-data-form/ClientDataForm';
import BanquetOrder from '../components/banquet-order/BanquetOrder';
import useStore from '../hooks/useStore';

const Locale = {
  title: 'Оформление банкета'
};

const BanquetsPage: FC = () => {
  const locale = useLocale(Locale);
  useTitle(locale.title);

  const { banquetsStore: { setClientData, clientData } } = useStore();

  const onSubmitClientForm = (data: IClientDataForm) => {
    setClientData(data);
  };

  return (
    <Box>
      <Typography variant="h2" mb={2}>{locale.title}</Typography>
      <ClientDataForm onSubmitClientForm={onSubmitClientForm} />
      {clientData && <BanquetOrder clientData={clientData} />}
    </Box>
  );
};

export default observer(BanquetsPage);
