import React, { FunctionComponent, useEffect, useState } from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { Stepper, Typography, StepLabel, Step, StepContent, Button } from '@material-ui/core';
import { observer } from 'mobx-react';
import useTitle from '../hooks/useTitle';
import useLocale from '../hooks/useLocale';
import useStore from '../hooks/useStore';

const Locale = {
  title: 'Чек-лист менеджера',
  reset: 'Сбросить данные'
};

const useStyles = makeStyles(theme => createStyles({
  title: {
    marginBottom: theme.spacing(4),
    display: 'inline-block'
  },
  button: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1)
  },
  resetButton: {
    display: 'inline-block',
    float: 'right'
  },
  actionsContainer: {
    marginBottom: theme.spacing(2)
  },
  block: {
    marginBottom: theme.spacing(2)
  },
  blockTitle: {
    margin: theme.spacing(2, 0),
    color: theme.palette.primary.main
  }
}));

const CheckList: FunctionComponent = (): JSX.Element | null => {
  const classes = useStyles();
  const locale = useLocale(Locale);
  const { checkListStore } = useStore();
  const [activeStep, setActiveStep] = useState<{ [key: number]: number }>(checkListStore.activeStep);

  useTitle(locale.title);

  useEffect(() => {
    if (!checkListStore.checkList.length) {
      checkListStore.fetchCheckList();
    }
  }, [checkListStore.checkList]);

  const onNext = (index: number) => {
    setActiveStep(prevState => ({ ...prevState, [index]: (prevState[index] || 0) + 1 }));
    checkListStore.addStep(index);
  };

  const onBack = (index: number) => {
    setActiveStep(prevState => ({ ...prevState, [index]: (prevState[index] || 0) - 1 }));
    checkListStore.takeAwayStep(index);
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
        checkListStore.checkList.map((data, index) => (
          <div className={classes.block} key={data.title}>
            <Typography variant="h3" className={classes.blockTitle}>{data.title}</Typography>
            <Stepper activeStep={activeStep[index] || 0} orientation="vertical">
              {
                data.items.map(label => (
                  <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                    <StepContent>
                      <div className={classes.actionsContainer}>
                        <div>
                          <Button
                            disabled={!activeStep[index] || activeStep[index] === 0}
                            onClick={() => onBack(index)}
                            className={classes.button}
                          >
                            Back
                          </Button>
                          <Button
                            variant="contained"
                            color="primary"
                            onClick={() => onNext(index)}
                            className={classes.button}
                          >
                            Next
                          </Button>
                        </div>
                      </div>
                    </StepContent>
                  </Step>
                ))
              }
            </Stepper>
          </div>
        ))
      }
    </div>
  );
};

export default observer(CheckList);
