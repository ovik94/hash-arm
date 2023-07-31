import React, { useEffect } from 'react';
import { observer } from 'mobx-react';
import { Box, SxProps } from '@mui/material';
import { Theme } from '@mui/material/styles';
import useTitle from '../hooks/useTitle';
import useStore from '../hooks/useStore';
import FortuneBlock, { ISelectedPrize } from '../components/fortune-block/FortuneBlock';

const styles: Record<string, SxProps<Theme>> = {
  container: theme => ({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '100%',

    img: {
      maxWidth: { sm: '500px', xs: '100%' },
      paddingRight: theme.spacing(2),
      paddingLeft: theme.spacing(2),
      paddingTop: theme.spacing(2),
      mb: theme.spacing(2)
    }
  })
};

const Fortune = () => {
  useTitle();
  const { fortuneStore } = useStore();

  const prizeStorage = sessionStorage.getItem('selectedPrize') ?
    JSON.parse(sessionStorage.getItem('selectedPrize')!) as ISelectedPrize :
    null;

  useEffect(() => {
    fortuneStore.fetchFortuneData();
  }, []);

  return (
    <Box sx={styles.container}>
      <img src="public/images/hblogo.svg" alt="logo" />
      <FortuneBlock
        data={fortuneStore.fortuneData}
        prize={prizeStorage && prizeStorage?.id === 'birthday' ? prizeStorage : undefined}
      />
    </Box>
  );
};

export default observer(Fortune);
