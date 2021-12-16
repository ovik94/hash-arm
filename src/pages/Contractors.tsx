import React, { FC, useEffect } from 'react';
import { makeStyles, createStyles } from '@mui/styles';
import { Button, Divider, Typography } from '@mui/material';
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

const useStyles = makeStyles((theme: Theme) => createStyles({
  contractor: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  contractorInfo: {
    marginBottom: theme.spacing(2)
  },
  contractorTitle: {
    marginBottom: theme.spacing(2)
  },
  contractorInfoItem: {
    display: 'inline-block',
    marginRight: theme.spacing(3)
  },
  contractorInfoLabel: {
    color: 'rgba(0, 0, 0, 0.56)'
  },
  infoIcon: {
    marginRight: theme.spacing(1)
  },
  info: {
    display: 'flex',
    alignItems: 'center',
    marginTop: theme.spacing(2)
  }
}));

const Contractors: FC = (): JSX.Element => {
  const classes = useStyles();
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
      <Typography variant="h2" style={{ marginBottom: '32px' }}>{locale.title}</Typography>
      {
        contractorsStore.contractors.map(contractor => (
          <div key={contractor.id}>
            <div className={classes.contractor}>
              <div className={classes.contractorInfo}>
                <Typography variant="h3" className={classes.contractorTitle}>{contractor.title}</Typography>
                <div>
                  <div className={classes.contractorInfoItem}>
                    <Typography
                      variant="subtitle1"
                      className={classes.contractorInfoLabel}
                    >
                      {locale.contractorManagerLabel}
                    </Typography>
                    <Typography variant="body2">{contractor.manager}</Typography>
                  </div>
                  <div className={classes.contractorInfoItem}>
                    <Typography
                      variant="subtitle1"
                      className={classes.contractorInfoLabel}
                    >
                      {locale.contractorPhoneLabel}
                    </Typography>
                    <Typography variant="body2">{contractor.phone}</Typography>
                  </div>
                </div>
                {
                  contractor.description && (
                    <div className={classes.info}>
                      <InfoIcon className={classes.infoIcon} color="secondary" />
                      <Typography variant="body2">
                        {contractor.description}
                      </Typography>
                    </div>
                  )
                }
              </div>
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
            </div>
            <Divider />
          </div>
        ))
      }
    </div>
  );
};

export default observer(Contractors);
