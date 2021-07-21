import React, { FunctionComponent, useEffect, useState } from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { Typography, Button } from '@material-ui/core';
import { observer } from 'mobx-react';
import useTitle from '../hooks/useTitle';
import useLocale from '../hooks/useLocale';
import useStore from '../hooks/useStore';
import MuiStepper from '../mui-components/MuiStepper';

const Locale = {
  title: 'Чек-лист менеджера',
  reset: 'Сбросить данные'
};

const useStyles = makeStyles(theme => createStyles({
  title: {
    marginBottom: theme.spacing(4),
    display: 'inline-block'
  },
  resetButton: {
    display: 'inline-block',
    float: 'right'
  },
  block: {
    marginBottom: theme.spacing(2)
  },
  blockTitle: {
    margin: theme.spacing(2, 0),
    color: theme.palette.primary.main
  }
}));

const CheckListIds = ['start', 'during', 'end'];

const CheckList: FunctionComponent = (): JSX.Element | null => {
  const classes = useStyles();
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
      <Typography variant="h2" className={classes.title}>{locale.title}</Typography>
      <Button onClick={onReset} className={classes.resetButton}>
        {locale.reset}
      </Button>
      {
        checkListStore.checkList.map((data, index) => {
          const id = CheckListIds[index];

          return (
            <div className={classes.block} key={data.title}>
              <Typography variant="h3" className={classes.blockTitle}>{data.title}</Typography>
              <MuiStepper id={id} onNext={onNext} onBack={onBack} activeStep={activeSteps[id]} steps={data.items} />
            </div>
          );
        })
      }
    </div>
  );
};

export default observer(CheckList);
