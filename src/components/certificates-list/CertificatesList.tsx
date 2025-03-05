import React, { FC, useCallback } from 'react';
import {
  Box,
  Button,
  Divider,
  IconButton,
  Stack,
  Tooltip,
  Typography
} from '@mui/material';

import { observer } from 'mobx-react';
import ToggleOnIcon from '@mui/icons-material/ToggleOn';
import ToggleOffIcon from '@mui/icons-material/ToggleOff';
import ImageIcon from '@mui/icons-material/Image';
import useLocale from '../../hooks/useLocale';
import Locale from './locale';
import useStore from '../../hooks/useStore';
import { CertificateType } from "/src/store/CertificatesStore";

const CertificatesList: FC = () => {
  const locale = useLocale(Locale);
  const { certificatesStore: { certificates, activate, sendImage }, notificationStore } = useStore();

  const onActivate = useCallback((number: number) => {
    activate(number).then(() => {
      notificationStore.addNotification({
        code: 'CERTIFICATE_ACTIVATE_SUCCESS',
        type: 'success'
      });
    });
  }, [activate]);

  const onSendImage = useCallback((number: number) => {
    sendImage(number).then(() => {
      notificationStore.addNotification({
        code: 'CERTIFICATE_SEND_SUCCESS',
        type: 'success'
      });
    });
  }, [sendImage]);

  if (!certificates || !certificates.length) {
    return null;
  }

  return (
    <Box mt={2}>
      {certificates.map(certificate => (
        <>
          <Stack key={certificate._id} flexDirection="row" alignItems="center" justifyContent="space-between">
            {certificate.status === CertificateType.ACTIVATED ? <ToggleOnIcon color="success" /> :
              <ToggleOffIcon color="action" />}

            <Stack direction="row" justifyContent="end" alignItems="center" spacing={2}>
              <Button
                disabled={certificate.status === CertificateType.ACTIVATED}
                onClick={() => onActivate(certificate.number)}
              >
                {certificate.status === CertificateType.ACTIVATED ? locale.hasActive : locale.activate}
              </Button>
              <Tooltip title={locale.sendImage}>
                <IconButton
                  edge="end"
                  color="secondary"
                  disabled={certificate.status === CertificateType.NOT_ACTIVATED}
                  onClick={() => onSendImage(certificate.number)}
                >
                  <ImageIcon />
                </IconButton>
              </Tooltip>
            </Stack>
          </Stack>
          <Stack direction="row" alignItems="center" spacing={2}>
            <Typography variant="body1" fontWeight={600}>{certificate.number}</Typography>
            <Typography variant="body2">{locale.subtitle(certificate.code, certificate.activationDate)}</Typography>
          </Stack>

          <Divider variant="fullWidth" />
        </>
      ))}
    </Box>
  );
};

export default observer(CertificatesList);
