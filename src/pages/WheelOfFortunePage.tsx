import React, { useEffect, useState } from 'react';
import { Typography, Box, Stack, Button, SxProps } from '@mui/material';
import { observer } from 'mobx-react';
import PlusIcon from '@mui/icons-material/Add';
import { Theme } from '@mui/material/styles';
import useTitle from '../hooks/useTitle';
import useLocale from '../hooks/useLocale';
import useStore from '../hooks/useStore';
import WheelOfFortuneList from '../components/wheel-of-fortune-list/WheelOfFortuneList';
import WheelOfFortuneDetailForm from '../components/wheel-of-fortune-detail-form/WheelOfFortuneDetailForm';

const Locale = {
  title: 'Редактирование контента колеса фартуны'
};

const styles: Record<string, SxProps<Theme>> = {
  button: {
    ml: 2
  }
};

const WheelOfFortunePage = () => {
  const locale = useLocale(Locale);
  useTitle(locale.title);
  const { fortuneStore, popupStore } = useStore();

  useEffect(() => {
    if (!fortuneStore.wheelOfFortuneList) {
      fortuneStore.fetchWheelOfFortuneList();
    }
  }, [fortuneStore.wheelOfFortuneList]);

  const onAdd = () => {
    popupStore.openPopup({
      props: { size: 'md' },
      content: WheelOfFortuneDetailForm
    });
  };

  return (
    <Box>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h2">{locale.title}</Typography>
        <Box>
          <Button
            variant="outlined"
            color="primary"
            startIcon={<PlusIcon />}
            component="label"
            sx={styles.button}
            onClick={onAdd}
          >
            {locale.buttons.add}
          </Button>
        </Box>
      </Stack>
      <WheelOfFortuneList data={fortuneStore.wheelOfFortuneList} />
    </Box>
  );
};

export default observer(WheelOfFortunePage);
