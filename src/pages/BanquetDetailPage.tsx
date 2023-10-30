import React, { FC, useEffect, useState } from 'react';
import { Box, IconButton, Stack, Typography } from '@mui/material';
import { observer } from 'mobx-react';
import { useHistory, useParams } from 'react-router-dom';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import useLocale from '../hooks/useLocale';
import useTitle from '../hooks/useTitle';
import useStore from '../hooks/useStore';
import ClientDataForm, { IClientDataForm } from '../components/client-data-form/ClientDataForm';
import { IBanquetReserve } from '../store/BanquetsStore';
import BanquetOrderMenu, { IOrderData } from '../components/banquet-order/BanquetOrderMenu';
import BanquetOrderList from '../components/banquet-order/BanquetOrderList';
import { IBanquetOrderInfoForm } from '../components/banquet-order/BanquetOrderInfo';

const Locale = {
  description: 'Оформление банкета'
};

const BanquetDetailPage: FC = () => {
  const locale = useLocale(Locale);
  useTitle(locale.title);
  const history = useHistory();
  const { id } = useParams<{ id: string; }>();

  const {
    banquetsStore: { getReserve, edit, save },
    userStore: { user }
  } = useStore();
  const [clientData, setClientData] = useState<IClientDataForm | null>(null);
  const [orderInfo, setOrderInfo] = useState<IBanquetOrderInfoForm | null>(null);
  const [orderData, setOrderData] = useState<Array<IOrderData>>([]);
  const [orderSum, setOrderSum] = useState(0);
  const [reserveId, setReserveId] = useState<string | undefined>(undefined);

  const onReturnToReserves = () => {
    history.push('/banquets-list');
  };

  useEffect(() => {
    if (id) {
      getReserve(id).then((reserveData) => {
        setReserveId(reserveData.id);
        setClientData({
          name: reserveData.name,
          date: new Date(reserveData.date),
          phone: reserveData.phone,
          personsCount: reserveData.personsCount
        });
        setOrderInfo({
          sale: reserveData.sale,
          comment: reserveData.comment,
          serviceFee: reserveData.serviceFee,
          totalAmount: reserveData.totalAmount
        });
        setOrderData(reserveData.menu);
        setOrderSum(reserveData.sum);
      });
    }
  }, [id]);

  const onSaveClientData = (data: IClientDataForm) => {
    setClientData(data);
  };

  const onSaveReserve = (info: IBanquetOrderInfoForm) => {
    if (clientData) {
      const body: IBanquetReserve = {
        ...clientData,
        ...info,
        menu: orderData,
        sum: orderSum,
        admin: user.name,
        id: reserveId
      };

      if (id) {
        edit(body).then(() => {
          history.push('/banquets-list');
        });
      } else {
        save(body).then(() => {
          history.push('/banquets-list');
        });
      }
    }
  };

  const onChangeOrderSum = (sum: number) => {
    setOrderSum(sum);
  };

  const onChangeOrderData = (data: Array<IOrderData>) => {
    setOrderData(data);
  };

  return (
    <Box>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={4}>
        <IconButton onClick={onReturnToReserves} color="inherit" size="small">
          <ArrowBackIosIcon />
        </IconButton>
        <Typography variant="h6" ml={1} sx={{ flexGrow: 1 }}>{locale.description}</Typography>
      </Stack>

      <ClientDataForm clientData={clientData} onSaveClientData={onSaveClientData} />

      <Stack direction="row" alignItems="flex-start" justifyContent="space-between" mt={3}>
        {clientData && (
          <BanquetOrderMenu
            orderData={orderData}
            orderSum={orderSum}
            onChangeOrderSum={onChangeOrderSum}
            onChangeOrderData={onChangeOrderData}
          />
        )}
        {!!orderSum && (
          <BanquetOrderList
            orderData={orderData}
            orderSum={orderSum}
            orderInfo={orderInfo}
            onSaveReserve={onSaveReserve}
            onChangeOrderSum={onChangeOrderSum}
            onChangeOrderData={onChangeOrderData}
          />
        )}
      </Stack>
    </Box>
  );
};

export default observer(BanquetDetailPage);
