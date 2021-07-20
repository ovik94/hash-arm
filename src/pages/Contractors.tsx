import React, { FC } from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import { observer } from 'mobx-react';
import useTitle from '../hooks/useTitle';
import useLocale from '../hooks/useLocale';

const Locale = {
  title: 'Поставщики'
};

const useStyles = makeStyles(theme => createStyles({
  contractors: {

  },
  title: {
    letterSpacing: '11px',
    fontSize: '36px',
    lineHeight: '42px',
    color: 'rgba(0, 0, 0, 0.87)',
    marginBottom: theme.spacing(6)
  }
}));

const Contractors: FC = (): JSX.Element => {
  const classes = useStyles();
  const locale = useLocale(Locale);
  useTitle(locale.title);

  return (
    <div className={classes.contractors}>
      <Typography variant="h2" className={classes.title}>{locale.title}</Typography>
    </div>
  );
};

export default observer(Contractors);
