import React, { FC, useEffect } from 'react';
import { Box, Button, Stack, Typography } from '@mui/material';
import { observer } from 'mobx-react';
import AddIcon from '@mui/icons-material/Add';
import { useHistory } from 'react-router-dom';
import useLocale from '../hooks/useLocale';
import useTitle from '../hooks/useTitle';
import BanquetReservesList from '../components/banquet-reserves-list/BanquetReservesList';
import useStore from '../hooks/useStore';

const Locale = {
  title: 'Резервы банкетов',
  addReserve: 'Добавить резерв'
};

const BanquetsPage: FC = () => {
  const locale = useLocale(Locale);
  useTitle(locale.title);

  const history = useHistory();
  const { banquetsStore } = useStore();

  useEffect(() => {
    if (!banquetsStore.reserves) {
      banquetsStore.getReservesList();
    }
  }, [banquetsStore.reserves]);

  const onCreateReserve = () => {
    history.push('/banquet');
  };

  return (
    <Box>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h2">{locale.title}</Typography>
        <Button onClick={onCreateReserve} size="small" variant="contained" startIcon={<AddIcon />}>
          {locale.addReserve}
        </Button>
      </Stack>
      <BanquetReservesList reserves={banquetsStore.reserves || []} />
    </Box>
  );
};

export default observer(BanquetsPage);
