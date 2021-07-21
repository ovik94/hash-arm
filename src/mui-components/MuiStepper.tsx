import React, { FunctionComponent } from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { Stepper, StepLabel, Step, StepContent, Button } from '@material-ui/core';
import useLocale from '../hooks/useLocale';

interface IMuiStepper {
  id: string;
  onNext: (id: string) => void;
  onBack: (id: string) => void;
  activeStep: number;
  steps: Array<string>;
}

const Locale = {
  back: 'Назад',
  next: 'Дальше'
};

const useStyles = makeStyles(theme => createStyles({
  button: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1)
  },
  actionsContainer: {
    marginBottom: theme.spacing(2)
  }
}));

const MuiStepper: FunctionComponent<IMuiStepper> = ({ id, onNext, onBack, activeStep, steps }: IMuiStepper): JSX.Element => {
  const classes = useStyles();
  const locale = useLocale(Locale);

  return (
    <Stepper activeStep={activeStep} orientation="vertical">
      {
        steps.map(label => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
            <StepContent>
              <div className={classes.actionsContainer}>
                <div>
                  <Button
                    disabled={!activeStep || activeStep === 0}
                    onClick={() => onBack(id)}
                    className={classes.button}
                  >
                    {locale.back}
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => onNext(id)}
                    className={classes.button}
                  >
                    {locale.next}
                  </Button>
                </div>
              </div>
            </StepContent>
          </Step>
        ))
      }
    </Stepper>
  );
};

export default MuiStepper;
