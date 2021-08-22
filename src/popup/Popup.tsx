import React, { FC, ReactNode } from 'react';
import { Modal, Fade, Backdrop, IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
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
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      className={classes.modal}
      open={open}
      onClose={onClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500
      }}
    >
      <Fade in={open}>
        <div className={clsx(classes.paper, classes[size])}>
          <IconButton className={classes.close} onClick={onClose} size="small"><CloseIcon /></IconButton>
          {children}
        </div>
      </Fade>
    </Modal>
  );
};

export default Popup;
