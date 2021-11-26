import React, { FC, useEffect } from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import { observer } from 'mobx-react';
import useTitle from '../hooks/useTitle';
import useLocale from '../hooks/useLocale';
import useStore from '../hooks/useStore';

const Locale = {
  title: 'Заказ банкетов'
};

const useStyles = makeStyles(theme => createStyles({
  title: {
    marginBottom: theme.spacing(4)
  }
}));

const Banquets: FC = (): JSX.Element => {
  const classes = useStyles();
  const locale = useLocale(Locale);
  const { instructionsStore } = useStore();

  useTitle(locale.title);

  useEffect(() => {
    if (!instructionsStore.instructions.length) {
      instructionsStore.fetchInstructions();
    }
  }, [instructionsStore.instructions]);

  return (
    <div>
      <Typography variant="h2" className={classes.title}>{locale.title}</Typography>
    </div>
  );
};

export default observer(Banquets);
