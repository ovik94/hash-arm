import React, { FC, useEffect } from 'react';
import { Box, Button, Divider, SxProps, Typography } from '@mui/material';
import { observer } from 'mobx-react';
import InfoIcon from '@mui/icons-material/InfoOutlined';
import { useHistory } from 'react-router-dom';
import { Theme } from '@mui/material/styles';
import useTitle from '../hooks/useTitle';
import useLocale from '../hooks/useLocale';
import useStore from '../hooks/useStore';

const Locale = {
  title: 'Поставщики',
  packagingLabel: 'Хоз. нужда',
  alcoholLabel: 'Крепкий Алкоголь',
  beerLabel: 'Пиво',
  coffeeLabel: 'Кофе',
  teaLabel: 'Чаи и сиропы',
  contractorManagerLabel: 'Менеджер:',
  contractorPhoneLabel: 'Номер телефона:',
  orderLabel: 'Сделать заказ'
};

const styles: Record<string, SxProps<Theme>> = {
  title: theme => ({
    mb: theme.spacing(4)
  }),
  contractor: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  contractorInfo: theme => ({
    mb: theme.spacing(2)
  }),
  contractorTitle: theme => ({
    mb: theme.spacing(2)
  }),
  contractorInfoItem: theme => ({
    display: 'inline-block',
    mr: theme.spacing(3)
  }),
  contractorInfoLabel: {
    color: 'rgba(0, 0, 0, 0.56)'
  },
  infoIcon: theme => ({
    mr: theme.spacing(1)
  }),
  info: theme => ({
    display: 'flex',
    alignItems: 'center',
    mt: theme.spacing(2)
  })
};

const Contractors: FC = (): JSX.Element => {
  const locale = useLocale(Locale);
  const { contractorsStore } = useStore();
  const history = useHistory();

  useTitle(locale.title);

  useEffect(() => {
    if (!contractorsStore.contractors.length) {
      contractorsStore.fetchContractors();
    }
  }, [contractorsStore.contractors]);

  const onOrder = (id: string) => {
    history.push(`/contractors/${id}`);
  };

  return (
    <div>
      <Typography variant="h2" sx={styles.title}>{locale.title}</Typography>
      {
        contractorsStore.contractors.map(contractor => (
          <div key={contractor.id}>
            <Box sx={styles.contractor}>
              <Box sx={styles.contractorInfo}>
                <Typography variant="h3" sx={styles.contractorTitle}>{contractor.title}</Typography>
                <div>
                  <Box sx={styles.contractorInfoItem}>
                    <Typography
                      variant="subtitle1"
                      sx={styles.contractorInfoLabel}
                    >
                      {locale.contractorManagerLabel}
                    </Typography>
                    <Typography variant="body2">{contractor.manager}</Typography>
                  </Box>
                  <Box sx={styles.contractorInfoItem}>
                    <Typography
                      variant="subtitle1"
                      sx={styles.contractorInfoLabel}
                    >
                      {locale.contractorPhoneLabel}
                    </Typography>
                    <Typography variant="body2">{contractor.phone}</Typography>
                  </Box>
                </div>
                {
                  contractor.description && (
                    <Box sx={styles.info}>
                      <InfoIcon sx={styles.infoIcon} color="secondary" />
                      <Typography variant="body2">
                        {contractor.description}
                      </Typography>
                    </Box>
                  )
                }
              </Box>
              {
                contractor.hasOrder && (
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => onOrder(contractor.id)}
                  >
                    {locale.orderLabel}
                  </Button>
                )
              }
            </Box>
            <Divider />
          </div>
        ))
      }
    </div>
  );
};

export default observer(Contractors);
