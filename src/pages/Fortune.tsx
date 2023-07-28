import React, { useEffect } from 'react';
import { observer } from 'mobx-react';
import useTitle from '../hooks/useTitle';
import useStore from '../hooks/useStore';
import FortuneBlock from '../components/fortune-block/FortuneBlock';

const Fortune = () => {
  useTitle();
  const { fortuneStore } = useStore();

  useEffect(() => {
    fortuneStore.fetchFortuneData();
  }, []);

  return <FortuneBlock data={fortuneStore.fortuneData} />;
};

export default observer(Fortune);
