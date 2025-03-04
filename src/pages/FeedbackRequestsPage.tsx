import React, { useEffect, useState } from 'react';
import { Typography, Box, Stack, Button, SxProps, Grid } from '@mui/material';
import { observer } from 'mobx-react';
import PlusIcon from '@mui/icons-material/Add';
import { Theme } from '@mui/material/styles';
import useTitle from '../hooks/useTitle';
import useLocale from '../hooks/useLocale';
import useStore from '../hooks/useStore';
import { IFeedbackItem } from '../store/FeedbackStore';
import FeedbackRequestsList from '../components/feedback-requests-list/FeedbackRequestsList';
import FeedbackRequestDetails, {
  IFeedbackRequestDetailsForm
} from '../components/feedback-request-details/FeedbackRequestDetails';

const Locale = {
  title: 'Редактирование вопросов для обратной связи'
};

const styles: Record<string, SxProps<Theme>> = {
  button: {
    ml: 2
  }
};

const FeedbackRequestsPage = () => {
  const locale = useLocale(Locale);
  useTitle(locale.title);
  const { feedbackStore, notificationStore, popupStore } = useStore();
  const [list, setList] = useState<Array<IFeedbackItem>>([]);

  useEffect(() => {
    if (!feedbackStore.feedbackList) {
      feedbackStore.fetchFeedbackList().then((data) => {
        setList(data);
      });
    }
  }, [feedbackStore.feedbackList]);

  const onAddRequest = (data: IFeedbackRequestDetailsForm & { options: Array<string> }) => {
    const currentList = list.slice(0);
    currentList.push(data);
    setList(currentList);
    popupStore.closePopup();
  };

  const onAdd = () => {
    popupStore.openPopup({
      props: { size: 'md' },
      content: FeedbackRequestDetails,
      contentProps: { onChange: onAddRequest }
    });
  };

  const onSave = () => {
    feedbackStore.updateFeedbackList(list).then(() => {
      notificationStore.addNotification({ code: 'SAVE_FEEDBACK_REQUESTS', type: 'success' });
    });
  };

  const onChangeList = (changedValues: Array<IFeedbackItem>) => {
    setList(changedValues);
  };

  return (
    <Box>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={8}>
          <Typography variant="h2">{locale.title}</Typography>

        </Grid>
        <Grid item xs={12} sm={4}>
          <Stack direction="row" spacing={2}>
            <Button
              variant="outlined"
              color="primary"
              startIcon={<PlusIcon />}
              component="label"
              sx={styles.button}
              onClick={onAdd}
            >
              {locale.buttons.add}
            </Button>
            <Button
              variant="contained"
              color="primary"
              component="label"
              sx={styles.button}
              onClick={onSave}
            >
              {locale.buttons.save}
            </Button>
          </Stack>
        </Grid>
      </Grid>
      <FeedbackRequestsList onChange={onChangeList} values={list} />
    </Box>
  );
};

export default observer(FeedbackRequestsPage);
