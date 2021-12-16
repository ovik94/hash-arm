import React, { FC, ReactNode } from 'react';
import { Dialog, Fade, Backdrop, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

import clsx from 'clsx';
import useStyles from './styles';

interface IPopup {
  open: boolean;
  children: ReactNode
  onClose: () => void;
  // eslint-disable-next-line react/require-default-props
  size?: 'small' | 'medium' | 'large';
}

const Popup: FC<IPopup> = ({ open, size = 'small', onClose, children }: IPopup): JSX.Element => {
  const classes = useStyles();

  return (
    <Dialog
      className={classes.modal}
      open={open}
      onClose={onClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      maxWidth="lg"
      BackdropProps={{
        timeout: 500
      }}
    >
      <Fade in={open}>
        <div className={clsx(classes.paper, classes[size])}>
          <IconButton className={classes.close} style={{ position: 'absolute' }} onClick={onClose} size="small">
            <CloseIcon />
          </IconButton>
          {children}
        </div>
      </Fade>
    </Dialog>
  );
};

export default Popup;
