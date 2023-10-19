import React, { ChangeEvent, FC, useEffect, useState } from 'react';
import { SubmitHandler, useForm, useWatch } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Chip, Grid, Stack, TextField, Typography } from '@mui/material';
import { IFeedbackItem, IFeedbackType } from '../../store/FeedbackStore';
import useStore from '../../hooks/useStore';
import useLocale from '../../hooks/useLocale';
import Locale from './locale';
import yup from '../../core/yup-extended';
import MuiForm from '../form-controls/MuiForm';
import MuiFormInput from '../form-controls/MuiFormInput';
import MuiFormSelect from '../form-controls/MuiFormSelect';
import MuiFormButton from '../form-controls/MuiFormButton';
import MuiFormCheckbox from '../form-controls/MuiFormCheckbox';

export interface IFeedbackRequestDetailsForm {
  title: string;
  required?: boolean;
  subtitle?: string;
  type: IFeedbackType;
}

export interface IFeedbackRequestDetailsProps {
  feedbackData?: IFeedbackItem;
  onChange?: (data: IFeedbackRequestDetailsForm & { options: Array<string> }) => void;
}

const typesWithOptions = ['select', 'selectOtherVariant', 'selectGroupString', 'selectGroupNumber'];

const FeedbackRequestDetails: FC<IFeedbackRequestDetailsProps> = ({ feedbackData, onChange }) => {
  const locale = useLocale(Locale);
  const [options, setOptions] = useState<Array<string>>(feedbackData?.options || []);
  const [optionsInput, setOptionsInput] = useState('');

  useEffect(() => {
    if (feedbackData?.options) {
      setOptions(feedbackData.options);
      setOptionsInput(feedbackData.options?.join(';'));
    }
  }, [feedbackData]);

  const schema = yup.object({
    title: yup.string().required(),
    required: yup.bool(),
    subtitle: yup.string(),
    type: yup.string().required()
  });

  const methods = useForm<IFeedbackRequestDetailsForm>({
    resolver: yupResolver(schema),
    mode: 'onSubmit',
    defaultValues: {
      title: feedbackData?.title || '',
      required: feedbackData?.required,
      subtitle: feedbackData?.subtitle,
      type: feedbackData?.type || '' as IFeedbackType
    }
  });

  const type = useWatch({ control: methods.control, name: 'type' });

  const onSubmit: SubmitHandler<IFeedbackRequestDetailsForm> = (data) => {
    if (onChange) {
      onChange({ ...data, options });
    }
  };

  const onChangeOptionsInput = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    const arrayValue = value.split(';').filter(option => !!option);

    setOptionsInput(event.target.value);
    setOptions(arrayValue);
  };

  return (
    <MuiForm methods={methods} onSubmit={onSubmit}>
      <Typography variant="h6" mb={3}>{feedbackData ? locale.editTitle : locale.addTitle}</Typography>
      <Grid container spacing={0}>
        <Grid item xs={12}>
          <MuiFormInput name="title" label={locale.titleLabel} />
        </Grid>
        <Grid item xs={12}>
          <MuiFormSelect
            name="type"
            options={locale.requestTypes}
            label={locale.typeLabel}
          />
        </Grid>
        <Grid item xs={12}>
          <MuiFormInput name="subtitle" label={locale.subtitleLabel} />
        </Grid>
        <Grid item xs={12}>
          <MuiFormCheckbox name="required" label={locale.requiredLabel} />
        </Grid>

        <Grid item xs={12}>
          {typesWithOptions.includes(type) && (
            <Box>
              <TextField
                label={locale.optionsLabel}
                value={optionsInput}
                variant="filled"
                onChange={onChangeOptionsInput}
                helperText={locale.optionsHelper}
                multiline
                maxRows={3}
                minRows={3}
                sx={{ mt: 2, width: '100%' }}
              />
              <Stack mt={2} direction="row" flexWrap="wrap">
                {options
                  .map(option => <Chip key={option} sx={{ my: 1, mx: 0.5 }} label={option} color="secondary" />)}
              </Stack>
            </Box>
          )}
        </Grid>
      </Grid>

      <MuiFormButton
        disabled={!methods.formState.isValid || (typesWithOptions.includes(type) && !options.length)}
        label={feedbackData ? locale.buttons.update : locale.buttons.add}
        sx={{ mt: 3 }}
      />
    </MuiForm>
  );
};

export default FeedbackRequestDetails;
