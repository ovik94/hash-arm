import React, { FunctionComponent, useEffect, useState } from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { Stepper, Typography, StepLabel, Step, StepContent, Button } from '@material-ui/core';
import { observer } from 'mobx-react';
import useTitle from '../hooks/useTitle';
import useLocale from '../hooks/useLocale';
import useStore from '../hooks/useStore';

const Locale = {
  title: 'Чек-лист менеджера'
};

const useStyles = makeStyles(theme => createStyles({
  title: {
    marginBottom: theme.spacing(6)
  },
  button: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1)
  },
  actionsContainer: {
    marginBottom: theme.spacing(2)
  }
}));

const CheckList: FunctionComponent = (): JSX.Element => {
  const classes = useStyles();
  const locale = useLocale(Locale);
  const { checkListStore } = useStore();
  const [activeStep, setActiveStep] = useState(0);

  useTitle(locale.title);

  useEffect(() => {
    if (!Object.keys(checkListStore.checkList).length) {
      checkListStore.fetchCheckList();
    }
  }, [checkListStore.checkList]);

  const onNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  };

  const onBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  return (
    <div>
      <Typography variant="h2" className={classes.title}>{locale.title}</Typography>
      <Stepper activeStep={activeStep} orientation="vertical">
        {
          checkListStore.checkList.map((data, index) => (
            // <div className={classes.block}>
            //   <Typography variant="body1" className={classes.blockTitle}>{data.title}</Typography>
            //   {
            data.items.map((label, index) => (
              <Step key={label}>
                { index === 0 && <Typography variant="subtitle2">{data.title}</Typography>}
                <StepLabel>{label}</StepLabel>
                <StepContent>
                  <div className={classes.actionsContainer}>
                    <div>
                      <Button
                        disabled={activeStep === 0}
                        onClick={onBack}
                        className={classes.button}
                      >
                        Back
                      </Button>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={onNext}
                        className={classes.button}
                      >
                        Next
                      </Button>
                    </div>
                  </div>
                </StepContent>
              </Step>
            ))
            // }
            /* </div> */
          ))
        }
      </Stepper>
    </div>
  );
};

export default observer(CheckList);
