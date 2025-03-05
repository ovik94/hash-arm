import React, { SyntheticEvent, useCallback, useEffect, useState } from 'react';
import { Typography, Box, Tabs, Tab } from '@mui/material';
import { observer } from 'mobx-react';
import useTitle from '../hooks/useTitle';
import useLocale from '../hooks/useLocale';
import useStore from '../hooks/useStore';
import CertificatesList from '../components/certificates-list/CertificatesList';

const Locale = {
  title: 'Сертификаты'
};

const CertificatesPage = () => {
  const locale = useLocale(Locale);
  useTitle(locale.title);
  const { certificatesStore } = useStore();
  const [tab, setTab] = useState('1000');

  const onChangeTab = useCallback((event: SyntheticEvent, newValue: string) => {
    setTab(newValue);
  }, []);

  useEffect(() => {
    certificatesStore.fetchCertificates(tab);
  }, [tab]);

  return (
    <Box>
      <Typography variant="h2" mb={2}>{locale.title}</Typography>

      <Box sx={{ bgcolor: 'background.paper', borderRadius: 1 }}>
        <Tabs value={tab} onChange={onChangeTab} variant="scrollable" allowScrollButtonsMobile>
          <Tab label="1000" value="1000" />
          <Tab label="2000" value="2000" />
          <Tab label="3000" value="3000" />
          <Tab label="5000" value="5000" />
        </Tabs>
      </Box>

      <CertificatesList />
    </Box>
  );
};

export default observer(CertificatesPage);
