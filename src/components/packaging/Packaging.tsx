import React, { FC, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import useLocale from '../../hooks/useLocale';
import useStore from '../../hooks/useStore';
import useTitle from '../../hooks/useTitle';
import useStyles from './styles';
import Locale from './locale';

interface PackagingProps {

}

const Packaging: FC<PackagingProps> = (props: PackagingProps) => {
  const classes = useStyles();
  const locale = useLocale(Locale);
  const { contractorsStore } = useStore();

  useTitle(locale.title);

  useEffect(() => {
    if (!contractorsStore.contractorNomenclatures.packaging) {
      contractorsStore.fetchContractorInfo('packaging');
    }
  }, [contractorsStore.contractorNomenclatures.packaging]);

  return (
    <div>
      фывфывыфв
    </div>
  );
};

export default observer(Packaging);
