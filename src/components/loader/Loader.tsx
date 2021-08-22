import React, { FC } from 'react';
import { Backdrop, CircularProgress } from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/core/styles';

interface IProps {
  isLoading: boolean;
}
const useStyles = makeStyles(() => createStyles({
  backdrop: {
    zIndex: 50,
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    background: 'rgba(255, 255, 255, 0.7)'
  }
}));

const Loader: FC<IProps> = ({ isLoading }: IProps): JSX.Element => {
  const classes = useStyles();

  return (
    <Backdrop open={isLoading} className={classes.backdrop}>
      <CircularProgress color="primary" />
    </Backdrop>
  );
};

export default Loader;
