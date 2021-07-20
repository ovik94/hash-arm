import React, { FunctionComponent } from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import useTitle from '../hooks/useTitle';
import useLocale from '../hooks/useLocale';

const Locale = {
  title: 'Чек-лист менеджера'
};

const useStyles = makeStyles(theme => createStyles({
  chekList: {

  },
  title: {
    letterSpacing: '11px',
    fontSize: '36px',
    lineHeight: '42px',
    color: 'rgba(0, 0, 0, 0.87)',
    marginBottom: theme.spacing(6)
  }
}));

const CheckList: FunctionComponent = (): JSX.Element => {
  const classes = useStyles();
  const locale = useLocale(Locale);
  useTitle(locale.title);

  return (
    <div className={classes.chekList}>
      <Typography variant="h2" className={classes.title}>{locale.title}</Typography>
    </div>
  );
};

export default CheckList;
