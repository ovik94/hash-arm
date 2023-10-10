import React, { FC } from 'react';
import { Box, Typography } from '@mui/material';
import useLocale from '../hooks/useLocale';
import useTitle from '../hooks/useTitle';
import ClientDataForm from '../components/client-data-form/ClientDataForm';
import BanquetOrder from '../components/banquet-order/BanquetOrder';

const Locale = {
  title: 'Оформление банкета'
};

const BanquetsPage: FC = () => {
  const locale = useLocale(Locale);
  useTitle(locale.title);

  return (
    <Box>
      <Typography variant="h2" mb={2}>{locale.title}</Typography>
      <ClientDataForm />
      <BanquetOrder />
    </Box>
  );
};

export default BanquetsPage;
