import React, { FunctionComponent, useEffect, useState } from 'react';
import { Typography, Button, SxProps, Box } from '@mui/material';
import { observer } from 'mobx-react';
import { Theme } from '@mui/material/styles';
import useTitle from '../hooks/useTitle';
import useLocale from '../hooks/useLocale';
import useStore from '../hooks/useStore';
import MuiStepper from '../mui-components/MuiStepper';

const Locale = {
  title: 'Чек-лист менеджера',
  reset: 'Сбросить данные'
};

const styles: Record<string, SxProps<Theme>> = {
  title: theme => ({
    display: 'inline-block',
    mb: theme.spacing(3)
  }),
  resetButton: {
    display: 'inline-block',
    float: 'right'
  },
  block: theme => ({
    marginBottom: theme.spacing(2)
  }),
  blockTitle: theme => ({
    margin: theme.spacing(2, 0),
    color: theme.palette.primary.main
  })
};

const CheckListIds = ['start', 'during', 'end'];

const CheckList: FunctionComponent = (): JSX.Element | null => {
  const locale = useLocale(Locale);
  const { checkListStore } = useStore();
  const [activeSteps, setActiveStep] = useState<{ [key: string]: number }>(checkListStore.activeSteps);

  useTitle(locale.title);

  useEffect(() => {
    if (!checkListStore.checkList.length) {
      checkListStore.fetchCheckList();
    }
  }, [checkListStore.checkList]);

  const onNext = (id: string) => {
    setActiveStep(prevState => ({ ...prevState, [id]: (prevState[id] || 0) + 1 }));
    checkListStore.addStep(id);
  };

  const onBack = (id: string) => {
    setActiveStep(prevState => ({ ...prevState, [id]: (prevState[id] || 0) - 1 }));
    checkListStore.takeAwayStep(id);
  };

  const onReset = () => {
    setActiveStep({});
    checkListStore.resetStep();
  };

  return (
    <div>
      <Typography variant="h2" sx={styles.title}>{locale.title}</Typography>
      <Button onClick={onReset} sx={styles.resetButton}>
        {locale.reset}
      </Button>
      {
        checkListStore.checkList.map((data, index) => {
          const id = CheckListIds[index];

          return (
            <Box sx={styles.block} key={data.title}>
              <Typography variant="h3" sx={styles.blockTitle}>{data.title}</Typography>
              <MuiStepper id={id} onNext={onNext} onBack={onBack} activeStep={activeSteps[id]} steps={data.items} />
            </Box>
          );
        })
      }
    </div>
  );
};

export default observer(CheckList);
