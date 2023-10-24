import React, { FC, useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toJS } from 'mobx';
import { yupResolver } from '@hookform/resolvers/yup';
import { Grid, Typography } from '@mui/material';
import yup from '../../core/yup-extended';
import useStore from '../../hooks/useStore';
import MuiForm from '../form-controls/MuiForm';
import MuiFormInput from '../form-controls/MuiFormInput';
import MuiFormButton from '../form-controls/MuiFormButton';
import useLocale from '../../hooks/useLocale';
import Locale from './locale';
import { IWheelOfFortuneData, IWheelOfFortuneContent } from '../../store/FortuneStore';
import FortuneContentList from '../fortune-content-list/FortuneContentList';

export interface IWheelOfFortuneDetailForm {
  code: string;
  description: string;
}

interface IWheelOfFortuneDetailFormProps {
  fortuneData?: IWheelOfFortuneData | null;
}

const WheelOfFortuneDetailForm: FC<IWheelOfFortuneDetailFormProps> = ({ fortuneData }) => {
  const { fortuneStore, popupStore } = useStore();
  const locale = useLocale(Locale);
  const [fortuneContent, setFortuneContent] = useState<Array<IWheelOfFortuneContent>>([]);

  useEffect(() => {
    if (fortuneData?.content) {
      setFortuneContent(toJS(fortuneData.content));
    }
  }, [fortuneData]);

  const schema = yup.object({
    code: yup.string().required(),
    description: yup.string().required()
  });

  const methods = useForm<IWheelOfFortuneDetailForm>({
    resolver: yupResolver(schema),
    mode: 'onSubmit',
    defaultValues: {
      code: fortuneData?.code || '',
      description: fortuneData?.description || ''
    }
  });

  const onSubmit: SubmitHandler<IWheelOfFortuneDetailForm> = (data) => {
    if (fortuneData) {
      fortuneStore.editWheelOfFortune({
        id: fortuneData.id,
        content: fortuneContent,
        ...data
      }).then(() => {
        popupStore.closePopup();
      });
    } else {
      fortuneStore.addWheelOfFortune({ ...data, content: fortuneContent }).then(() => {
        popupStore.closePopup();
      });
    }
  };

  const onChangeContent = (content: Array<IWheelOfFortuneContent>) => {
    setFortuneContent(content);
  };

  return (
    <MuiForm methods={methods} onSubmit={onSubmit}>
      <Typography variant="h6" mb={3}>{fortuneData ? locale.editTitle : locale.addTitle}</Typography>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <MuiFormInput name="code" label={locale.codeLabel} helperText={locale.helper} />
        </Grid>
        <Grid item xs={6}>
          <MuiFormInput name="description" label={locale.descriptionLabel} />
        </Grid>
        <Grid item xs={12}>
          <FortuneContentList onChange={onChangeContent} content={fortuneContent} />
        </Grid>
      </Grid>

      <MuiFormButton
        label={fortuneData ? locale.buttons.update : locale.buttons.add}
        sx={{ mt: 3 }}
        disabled={!fortuneContent || !fortuneContent.length}
      />
    </MuiForm>
  );
};

export default WheelOfFortuneDetailForm;
