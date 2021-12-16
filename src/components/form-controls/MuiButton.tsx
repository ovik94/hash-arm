import React, { FC } from 'react';
import clsx from 'clsx';
import { Theme } from '@mui/material/styles';
import createStyles from '@mui/styles/createStyles';
import makeStyles from '@mui/styles/makeStyles';
import { Button } from '@mui/material';

interface IMuiButton {
  label?: string;
  styles?: string
}

const useStyles = makeStyles((theme: Theme) => createStyles({
  button: {
    width: '100%',
    marginTop: theme.spacing(5)
  }
}));

const MuiButton: FC<IMuiButton> = ({ label = 'Сохранить результат', styles }) => {
  const classes = useStyles();

  return (
    <Button
      type="submit"
      className={clsx(classes.button, styles)}
      variant="contained"
      color="primary"
    >
      {label}
    </Button>
  );
};

export default MuiButton;
