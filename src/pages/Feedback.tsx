import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react';
import { Container, Fab, Grid, SxProps, Typography, Stack } from '@mui/material';
import { Theme } from '@mui/material/styles';
import useTitle from '../hooks/useTitle';
import useLocale from '../hooks/useLocale';
import useStore from '../hooks/useStore';
import FeedbackForm from '../components/feedback-form/FeedbackForm';
import Loader from '../components/loader/Loader';
import FortuneBlock from '../components/fortune-block/FortuneBlock';
import GisIcon from '../components/icons/GisIcon';
import YandexIcon from '../components/icons/YandexIcon';

const styles: Record<string, SxProps<Theme>> = {
  logo: {
    img: {
      width: '100%',
      px: 8,
      py: 2
    }
  },
  feedbackServices: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: '32px',
    marginTop: '32px'
  }
};

const Locale = {
  title: 'Обратная связь',
  subtitle: 'Здравствуйте, пока вы ждете свой заказ, потратьте, пожалуйста, несколько минут своего времени на заполнение следующей анкеты. Это поможет стать нам лучше',
  completeTitle: 'Спасибо за ваш отзыв!',
  completeSubtitle: 'Мы будем рады, если вы оставите отзыв о нашем ресторане на одном из этих сервисов:',
  fortuneTitle: 'Покрути колесо и получи свой подарок',
  gisLink: 'https://2gis.ru/berdsk/firm/70000001043769883',
  yandexLink: 'https://yandex.ru/profile/245183841282'
};

const Feedback = () => {
  const locale = useLocale(Locale);
  const [feedbackSent, setFeedbackSent] = useState(false);

  useTitle(locale.title);

  const {
    feedbackStore: { fetchFeedbackList, feedbackList },
    fortuneStore: { fetchFortuneData, wheelOfFortuneData },
    isLoading
  } = useStore();

  useEffect(() => {
    if (!feedbackList) {
      fetchFeedbackList();
    }
  }, [feedbackList]);

  const onFinish = () => {
    setFeedbackSent(true);
    fetchFortuneData('feedbackFortune');
  };

  return (
    <Container component="main" maxWidth="xs">
      <Loader isLoading={isLoading} />
      <Grid container>
        <Grid item xs={12} sm={12} sx={styles.logo}>
          <img src="public/images/logo.png" alt="logo" />
        </Grid>
        {feedbackSent && (
          <Grid item xs={12} sm={12}>
            <Typography variant="h6" textAlign="center" color="success.main">{locale.completeTitle}</Typography>
            <Typography variant="body1" textAlign="center" mt={1}>{locale.completeSubtitle}</Typography>

            <Stack sx={styles.feedbackServices}>
              <Fab variant="extended" color="default" href={locale.gisLink} target="_blank">
                <GisIcon />
              </Fab>
              <Fab variant="extended" color="default" href={locale.yandexLink} target="_blank">
                <YandexIcon />
              </Fab>
            </Stack>

            {wheelOfFortuneData.feedbackFortune && wheelOfFortuneData.feedbackFortune.length > 0 && (
              <>
                <Typography variant="h4" textAlign="center" mt={1} mb={2}>{locale.fortuneTitle}</Typography>
                <FortuneBlock data={wheelOfFortuneData.feedbackFortune} />
              </>
            )}
          </Grid>
        )}
        {!feedbackSent && (
          <Grid item xs={12} sm={12}>
            <Typography variant="h4" textAlign="center" mb={1}>{locale.title}</Typography>
            <Typography variant="subtitle1" textAlign="center" mb={2}>{locale.subtitle}</Typography>
            { feedbackList && <FeedbackForm questions={feedbackList} onFinish={onFinish} />}
          </Grid>
        )}
      </Grid>
    </Container>
  );
};

export default observer(Feedback);
