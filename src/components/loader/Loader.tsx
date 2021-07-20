import React, { FC } from 'react';
import { CircularProgress } from '@material-ui/core';
import useStyles from './styles';

const Loader: FC = (): JSX.Element => {
  const classes = useStyles();

  return (
    <div className={classes.wrapper}>
      <CircularProgress color="secondary" className={classes.progress} />
    </div>
  );
};

export default Loader;
