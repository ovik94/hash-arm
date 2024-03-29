import React, { FC } from 'react';
import clsx from 'clsx';
import createStyles from '@mui/styles/createStyles';
import makeStyles from '@mui/styles/makeStyles';
import { Button } from '@mui/material';

export interface IMuiButton {
  label?: string;
  className?: string;
  [key: string]: any;
}

const useStyles = makeStyles(() => createStyles({
  formControl: {
    width: '100%'
  }
}));

const MuiFormButton: FC<IMuiButton> = ({
  label = 'Сохранить',
  className,
  ...otherProps
}) => {
  const classes = useStyles();

  return (
    <Button
      type="submit"
      className={clsx(classes.formControl, className)}
      variant="contained"
      color="primary"
      size="large"
      {...otherProps}
    >
      {label}
    </Button>
  );
};

export default MuiFormButton;
