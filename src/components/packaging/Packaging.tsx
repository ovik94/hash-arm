import React, { FC, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import useLocale from '../../hooks/useLocale';
import useStore from '../../hooks/useStore';
import useTitle from '../../hooks/useTitle';
import useStyles from './styles';
import Locale from './locale';
import MuiTable from '../table/MuiTable';
import { IContractor } from '../../core/types';

const Packaging: FC<IContractor> = (props: IContractor) => {
  const classes = useStyles();
  const locale = useLocale(Locale);
  const { contractorsStore } = useStore();

  useTitle(locale.title);

  useEffect(() => {
    if (!contractorsStore.contractorNomenclatures.packaging) {
      contractorsStore.fetchContractorInfo(props.id);
    }
  }, [contractorsStore.contractorNomenclatures.packaging]);

  return (
    <div className={classes.root}>
      {
        contractorsStore.contractorNomenclatures.packaging && (
          <MuiTable
            data={contractorsStore.contractorNomenclatures.packaging}
            headCells={locale.headCells}
            isSearchable
          />
        )
      }
    </div>
  );
};

export default observer<IContractor>(Packaging);
