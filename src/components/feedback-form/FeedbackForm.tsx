import React, { FC, useState } from 'react';
import { Box, MobileStepper, Typography } from '@mui/material';
import { observer } from 'mobx-react-lite';
import Messages, { IMessage, MessageStatuses } from '../messages/Messages';
import { IFeedbackItem } from '../../store/FeedbackStore';
import styles from './styles';
import RequestItem from './RequestItem';
import useStore from '../../hooks/useStore';

interface IFeedbackFormProps {
  questions: Array<IFeedbackItem>;
  onFinish: () => void;
}

const FeedbackForm: FC<IFeedbackFormProps> = ({ questions, onFinish }) => {
  const [messages, setMessages] = useState<Array<IMessage>>();
  const [activeStep, setActiveStep] = useState(0);
  const { feedbackStore: { sendFeedback } } = useStore();

  const onNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  };

  const onBack = () => {
    window.scrollTo(0, 0);
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  const onSubmit = () => {
    if (questions.length && activeStep === questions.length - 1) {
      sendFeedback().then(((response) => {
        if (response?.status !== 'OK' && response?.message) {
          setMessages([{ value: response.message, type: MessageStatuses.ERROR }]);
        }

        onFinish();
      }));
    } else {
      onNext();
    }
    window.scrollTo(0, 0);
  };

  return (
    <Box sx={styles.wrapper}>
      <MobileStepper
        variant="progress"
        steps={questions.length}
        position="static"
        activeStep={activeStep}
        backButton={<></>}
        nextButton={<></>}
      />

      <Messages messages={messages} />

      {questions[activeStep] && (
        <RequestItem
          requestData={questions[activeStep]}
          activeStep={activeStep}
          onSubmit={onSubmit}
          onBack={onBack}
        />
      )}
    </Box>
  );
};

export default FeedbackForm;
