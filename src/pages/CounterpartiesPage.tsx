import React, { useEffect } from 'react';
import { Typography, Box, Stack, Button } from '@mui/material';
import { observer } from 'mobx-react';
import PlusIcon from '@mui/icons-material/Add';
import useTitle from '../hooks/useTitle';
import useLocale from '../hooks/useLocale';
import useStore from '../hooks/useStore';
import CounterpartiesList from '../components/counterparties-list/CounterpartiesList';
import CounterpartyDetailForm from '../components/counterparty-detail-form/CounterpartyDetailForm';

const Locale = {
  title: 'Контрагенты',
  add: 'Добавить'
};

const CounterpartiesPage = () => {
  const locale = useLocale(Locale);
  useTitle(locale.title);
  const { counterpartiesStore, popupStore } = useStore();

  useEffect(() => {
    if (!counterpartiesStore.counterparties) {
      counterpartiesStore.fetchCounterparties();
    }
  }, [counterpartiesStore.counterparties]);

  const onAdd = () => {
    popupStore.openPopup({
      props: { size: 'sm' },
      content: CounterpartyDetailForm
    });
  };

  return (
    <Box>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography variant="h2" mb={2}>{locale.title}</Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<PlusIcon />}
          component="label"
          onClick={onAdd}
        >
          {locale.add}
        </Button>
      </Stack>
      <CounterpartiesList counterparties={counterpartiesStore.counterparties || []} />
    </Box>
  );
};

export default observer(CounterpartiesPage);
