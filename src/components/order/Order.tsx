import React, { FC, useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { useParams } from 'react-router-dom';
import { SubmitHandler } from 'react-hook-form';
import useLocale from '../../hooks/useLocale';
import useStore from '../../hooks/useStore';
import useTitle from '../../hooks/useTitle';
import useStyles from './styles';
import Locale from './locale';
import MuiTable from '../table/MuiTable';
import Popup from '../../popup/Popup';
import { IContractorNomenclatures } from '../../store/ContractorsStore';
import OrderForm from './OrderForm';

const Order: FC = () => {
  const classes = useStyles();
  const locale = useLocale(Locale);
  const { contractorsStore } = useStore();
  const [open, setOpen] = useState<boolean>(false);
  const [orderData, setOrderData] = useState<Array<IContractorNomenclatures>>([]);

  // @ts-ignore
  const { id } = useParams();

  useTitle(locale.title);

  useEffect(() => {
    if (!contractorsStore.contractorNomenclatures[id]) {
      contractorsStore.fetchContractorInfo(id);
    }
  }, [contractorsStore.contractorNomenclatures[id]]);

  const onClosePopup = () => {
    setOpen(false);
  };

  const onSelected = (ids: Array<string>) => {
    console.log('File: Order.tsx, Function: onSelected,  112312312313: ', 123123123123);
    const data = contractorsStore.contractorNomenclatures[id].filter(item => ids.includes(item.id));
    setOrderData(data);
    setOpen(true);
  };

  const onSubmit: SubmitHandler<{ }> = (data) => {
    console.log(data, 'data');
  };

  return (
    <div>
      <Popup open={open} onClose={onClosePopup} size="large">
        <OrderForm data={orderData} onSubmit={onSubmit} />
      </Popup>
      {
        contractorsStore.contractorNomenclatures[id] && (
          <MuiTable
            data={contractorsStore.contractorNomenclatures[id]}
            headCells={locale.headCells}
            onSelected={onSelected}
            isSearchable
          />
        )
      }
    </div>
  );
};

export default observer<{}>(Order);
