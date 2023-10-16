import React, { FC } from 'react';
import { observer } from 'mobx-react-lite';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { Dialog, IconButton, Box } from '@mui/material';
import { IPopupProps } from '../../store/PopupStore';
import useStores from '../../hooks/useStore';
import styles from './styles';
import Loader from '../loader/Loader';

const Popup: FC<IPopupProps> = ({ open, sx = {}, size = 'sm', onClose, children }) => {
  const { popupStore } = useStores();

  return (
    <Dialog
      open={open}
      onClose={onClose || undefined}
      closeAfterTransition
      scroll="body"
      maxWidth={size}
      sx={styles.dialog}
      PaperProps={{ sx: styles.paper }}
    >
      <Loader isLoading={popupStore.isLoading} />
      <Box sx={sx.paper || styles.content}>
        {onClose && <IconButton sx={styles.close} onClick={onClose} size="small"><HighlightOffIcon /></IconButton>}
        {children}
      </Box>
    </Dialog>
  );
};

export default observer<IPopupProps>(Popup);
