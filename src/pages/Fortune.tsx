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
  const { fortuneStore: { fetchFortuneData, wheelOfFortuneData } } = useStore();

  const prizeStorage = localStorage.getItem('selectedPrize') ?
    JSON.parse(localStorage.getItem('selectedPrize')!) as ISelectedPrize :
    null;

  useEffect(() => {
    fetchFortuneData('birthdayFortune');
  }, []);

  return (
    <Box sx={styles.container}>
      <img src="public/images/hblogo.svg" alt="logo" />
      {wheelOfFortuneData.birthdayFortune && (
        <FortuneBlock
          data={wheelOfFortuneData.birthdayFortune}
          prize={prizeStorage && prizeStorage?.id === 'birthday' ? prizeStorage : undefined}
        />
      )}
    </Box>
  );
};

export default observer(Fortune);
