import React, { ChangeEvent, FC, useMemo, useState } from 'react';
import { Box, Button, Checkbox, FormControlLabel, Stack, Typography } from '@mui/material';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import { BaseSchema } from 'yup';
import { IFeedbackItem } from '../../store/FeedbackStore';
import MuiForm from '../form-controls/MuiForm';
import MuiFormButton from '../form-controls/MuiFormButton';
import MuiFormRadioGroup from '../form-controls/MuiFormRadioGroup';
import MuiFormInput from '../form-controls/MuiFormInput';
import yup from '../../core/yup-extended';
import useLocale from '../../hooks/useLocale';
import Locale from './locale';
import styles from './styles';
import useStore from '../../hooks/useStore';
import MuiFormRating from '../form-controls/MuiFormRating';

interface IRequestItemProps {
  requestData: IFeedbackItem;
  activeStep: number;
  onSubmit: () => void;
  onBack: () => void;
}

export type IFeedbackForm = { [field: string]: string | Array<string> };

const selectNumberOptions = [
  { value: '1', label: '1' },
  { value: '2', label: '2' },
  { value: '3', label: '3' },
  { value: '4', label: '4' },
  { value: '5', label: '5' }
];

const selectStringOptions = [
  { value: 'Полностью согласен/сна', label: 'Полностью согласен/сна' },
  { value: 'Согласен/сна', label: 'Согласен/сна' },
  { value: 'Несогласен/сна', label: 'Несогласен/сна' },
  { value: 'Совсем несогласен/сна', label: 'Совсем несогласен/сна' }
];

const RequestItem: FC<IRequestItemProps> = ({ requestData, onSubmit, onBack, activeStep }) => {
  const locale = useLocale(Locale);
  const { feedbackStore: { setResponse } } = useStore();
  const [showSelectVariant, setShowSelectVariant] = useState(false);

  const schema = useMemo(() => {
    const optionsSchema: { [key: string]: BaseSchema } = {};

    if (requestData.id) {
      if (requestData.type === 'selectGroupNumber' || requestData.type === 'selectGroupString') {
        optionsSchema[requestData.id] = requestData.required ? yup.array().of(yup.string().required()) : yup.array();
      } else if (requestData.type === 'rating') {
        optionsSchema[requestData.id] = requestData.required ? yup.number().required() : yup.number();
      } else {
        optionsSchema[requestData.id] = requestData.required ? yup.string().required() : yup.string();
      }
    }

    return yup.object(optionsSchema);
  }, [requestData]);

  const methods = useForm<IFeedbackForm>({
    resolver: yupResolver(schema),
    mode: 'onTouched'
  });

  const changeShowSelectVariant = (event: ChangeEvent<HTMLInputElement>, field: string): void => {
    methods.setValue(field, '');
    setShowSelectVariant(event.target.checked);
  };

  const renderControl = (question: IFeedbackItem) => {
    switch (question.type) {
      case 'select':
        if (!question.options || !question.id) {
          return null;
        }

        return (
          <MuiFormRadioGroup
            key={`SELECT-${question.id}`}
            name={question.id}
            options={question.options.map(option => ({ value: option, label: option }))}
          />
        );
      case 'selectOtherVariant': {
        if (!question.options || !question.id) {
          return null;
        }

        return (
          <>
            <MuiFormRadioGroup
              key={`SELECT-${question.id}`}
              name={question.id}
              disabled={showSelectVariant}
              options={question.options.map(option => ({ value: option, label: option }))}
            />
            <FormControlLabel
              label={locale.selectOtherVariant}
              control={(
                <Checkbox
                  checked={showSelectVariant}
                  onChange={(event: ChangeEvent<HTMLInputElement>) => changeShowSelectVariant(event, question.id || '')}
                />
            )}
            />
            {showSelectVariant && (
              <MuiFormInput disabled={!showSelectVariant} name={question.id} label={locale.selectOtherVariantLabel} />
            )}
          </>
        );
      }
      case 'selectGroupString':
        if (!question.options) {
          return null;
        }
        return question.options.map((option, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <Box key={`SELECT-${option}-${index}`}>
            <Typography variant="h4" mt={1}>{option}</Typography>
            <MuiFormRadioGroup
              name={`${question.id}.${String(index)}`}
              options={selectStringOptions}
            />
          </Box>
        ));
      case 'selectGroupNumber':
        if (!question.options) {
          return null;
        }
        return question.options.map((option, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <Box key={`SELECT-${option}-${index}`}>
            <Typography variant="h4" mt={1}>{option}</Typography>
            <MuiFormRadioGroup
              name={`${question.id}.${String(index)}`}
              options={selectNumberOptions}
            />
          </Box>
        ));
      case 'textArea':
        return (
          <MuiFormInput
            name={question.id || ''}
            label={locale.messageLabel}
            multiline
            minRows={5}
            maxRows={5}
          />
        );
      case 'rating':
        return <MuiFormRating name={question.id || ''} />;
      default:
    }
  };

  const onSubmitForm: SubmitHandler<IFeedbackForm> = (data) => {
    if (requestData.id) {
      setResponse(requestData.id, data[requestData.id]);
      setShowSelectVariant(false);
      onSubmit();
    }
  };

  const onBackButton = () => {
    onBack();
  };

  return (
    <MuiForm methods={methods} onSubmit={onSubmitForm}>
      <Box key={requestData.id}>
        <Typography variant="h3" my={1} color="primary">{requestData.title}</Typography>
        {requestData.subtitle && <Typography variant="caption" mb={2}>{requestData.subtitle}</Typography>}
        {renderControl(requestData)}
      </Box>
      <Stack direction="row" justifyContent="space-between" my={2} sx={styles.buttons}>
        <Button
          onClick={onBackButton}
          disabled={activeStep === 0}
          variant="outlined"
        >
          {locale.backButtonLabel}
        </Button>
        <MuiFormButton label={locale.buttonLabel} />
      </Stack>
    </MuiForm>
  );
};

export default RequestItem;
