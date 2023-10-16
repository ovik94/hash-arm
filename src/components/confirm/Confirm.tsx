import React, { FC } from 'react';
import { Box, Stack, Button, Typography } from '@mui/material';
import styles from './styles';

interface IConfirm {
  locale: {
    title?: string;
    text?: string;
    cancelLabel?: string;
    acceptLabel?: string;
  };
  onAccept?: () => void;
  onCancel?: () => void;
}

const Confirm: FC<IConfirm> = ({ locale, onAccept, onCancel }) => (
  <>
    {locale.title && <Typography variant="h2" sx={styles.title}>{locale.title}</Typography>}
    {locale.text && <Typography variant="body1" dangerouslySetInnerHTML={{ __html: locale.text }} />}
    <Stack
      spacing={2}
      direction="row"
      sx={styles.buttons}
    >
      {Boolean(onCancel) && (
        <Button
          color="primary"
          onClick={onCancel}
          variant="outlined"
        >
          {locale.cancelLabel || 'Отменить'}
        </Button>
      )}
      {Boolean(onAccept) && (
        <Button
          color="primary"
          onClick={onAccept}
          variant="contained"
        >
          {locale.acceptLabel || 'Oк'}
        </Button>
      )}
    </Stack>
  </>
);

export default Confirm;
