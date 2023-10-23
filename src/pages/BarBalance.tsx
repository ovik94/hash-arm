import React, { FC, useEffect, useState } from 'react';
import { observer } from 'mobx-react';
import { Typography, Stack, IconButton, Box } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import useStore from '../hooks/useStore';
import useLocale from '../hooks/useLocale';
import useTitle from '../hooks/useTitle';
import BarBalanceLimits from '../components/bar-balance-limits/BarBalanceLimits';
import BarBalanceTable from '../components/bar-balance-table/BarBalanceTable';

const Locale = {
  title: 'Минимальные остатки на складе',
  headCells: ['Название', 'Остаток']
};

const BarBalance: FC = (): JSX.Element => {
  const locale = useLocale(Locale);
  const { balanceStore, setLoading } = useStore();
  const [showLimitsForm, setShowLimitsForm] = useState(false);

  useTitle(locale.title);

  useEffect(() => {
    setLoading(true);
    Promise.all([
      balanceStore.fetchBarBalance(),
      balanceStore.fetchBarNomenclature()
    ]).then(() => {
      setLoading(false);
    });
  }, []);

  const onShowLimitsForm = () => {
    setShowLimitsForm(true);
  };

  return (
    <Box>
      {showLimitsForm && (
        <BarBalanceLimits
          nomenclature={balanceStore.barNomenclature}
          onPrevView={() => setShowLimitsForm(false)}
        />
      )}
      {!showLimitsForm && (
        <Box>
          <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
            <Typography variant="h2">{locale.title}</Typography>
            <IconButton onClick={onShowLimitsForm} size="small">
              <SettingsIcon />
            </IconButton>
          </Stack>
          <BarBalanceTable data={balanceStore.barBalance.filter(item => item.category === 'Напитки')} />
          <BarBalanceTable data={balanceStore.barBalance.filter(item => item.category === 'Крепкий Алкоголь')} />
        </Box>
      )}
    </Box>
  );
};

export default observer(BarBalance);
