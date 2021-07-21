import React, { FC, useEffect } from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import { observer } from 'mobx-react';
import useTitle from '../hooks/useTitle';
import useLocale from '../hooks/useLocale';
import useStore from '../hooks/useStore';

const Locale = {
  title: 'Поставщики'
};

const useStyles = makeStyles(theme => createStyles({
  contractors: {

  },
  title: {
    marginBottom: theme.spacing(4)
  }
}));

const Contractors: FC = (): JSX.Element => {
  const classes = useStyles();
  const locale = useLocale(Locale);
  const { contractorsStore } = useStore();
  useTitle(locale.title);

  useEffect(() => {
    if (!contractorsStore.packagingList.length) {
      contractorsStore.fetchPackagingList();
    }
  }, [contractorsStore.packagingList]);

  return (
    <div>
      <Typography variant="h2" className={classes.title}>{locale.title}</Typography>

    </div>
  );
};

export default observer(Contractors);
