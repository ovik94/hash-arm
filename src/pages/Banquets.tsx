import React, { FC, useEffect } from 'react';
import { makeStyles, createStyles } from '@mui/styles';
import { Typography } from '@mui/material';
import { observer } from 'mobx-react';
import { Theme } from '@mui/material/styles';
import useTitle from '../hooks/useTitle';
import useLocale from '../hooks/useLocale';
import useStore from '../hooks/useStore';

const Locale = {
  title: 'Заказ банкетов'
};

const useStyles = makeStyles((theme: Theme) => createStyles({

}));

const Banquets: FC = (): JSX.Element => {
  const classes = useStyles();
  const locale = useLocale(Locale);
  const { menuStore } = useStore();

  useTitle(locale.title);

  useEffect(() => {
    if (!Object.keys(menuStore.menu).length) {
      menuStore.fetchMenu();
    }
  }, [menuStore.menu]);

  console.log(menuStore.menu, 'menuStore.menu');
  return (
    <div>
      <Typography variant="h2" style={{ marginBottom: '32px' }}>{locale.title}</Typography>
    </div>
  );
};

export default observer(Banquets);
