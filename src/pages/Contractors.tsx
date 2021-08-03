import React, { FC, useEffect, useState } from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { observer } from 'mobx-react';
import useTitle from '../hooks/useTitle';
import useLocale from '../hooks/useLocale';
import useStore from '../hooks/useStore';
import TabContent from '../components/tab-content/TabContent';
import Packaging from '../components/packaging/Packaging';

const Locale = {
  title: 'Поставщики',
  packagingLabel: 'Хоз. нужда',
  alcoholLabel: 'Крепкий Алкоголь',
  beerLabel: 'Пиво',
  coffeeLabel: 'Кофе',
  teaLabel: 'Чаи и сиропы'
};

const useStyles = makeStyles(theme => createStyles({
  contractors: {

  },
  title: {
    marginBottom: theme.spacing(4)
  }
}));

const TabsContent: { [key: string]: FC } = {
  packaging: Packaging
};

const Contractors: FC = (): JSX.Element => {
  const classes = useStyles();
  const locale = useLocale(Locale);
  const { contractorsStore } = useStore();
  const [tabValue, setTabValue] = useState(0);

  useTitle(locale.title);

  useEffect(() => {
    if (!contractorsStore.contractors.length) {
      contractorsStore.fetchContractors();
    }
  }, [contractorsStore.contractors]);

  const onChangeTab = (event: React.ChangeEvent<{}>, newValue: number) => {
    setTabValue(newValue);
  };

  return (
    <div>
      <Typography variant="h2" className={classes.title}>{locale.title}</Typography>
      <Tabs
        value={tabValue}
        onChange={onChangeTab}
        indicatorColor="primary"
        textColor="primary"
      >
        {
          contractorsStore.contractors.map(item => <Tab label={item.title} key={item.id} />)
        }
      </Tabs>
      {
        contractorsStore.contractors.map((item, index) => {
          const TabComponent = TabsContent[item.id];

          return (
            <TabContent value={tabValue} index={index} key={item.id}>
              <TabComponent />
            </TabContent>
          );
        })
       }
    </div>
  );
};

export default observer(Contractors);
