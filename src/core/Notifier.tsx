import { FC, memo, useEffect, useRef } from 'react';
import { autorun } from 'mobx';
import { useSnackbar } from 'notistack';
import useStore from '../hooks/useStore';
import useLocale from '../hooks/useLocale';

const Locale = {
  ERROR_BOT_SEND_MESSAGE:
    'Произошла ошибка. Бот не смог отправить сообщение в чат',
  CREATE_ORDER_SUCCESS:
    'Заявка успешно создана! Проверь чат с менеджером в Telegram',
  SAVE_BANQUET_SUCCESS:
    'Банкет успешно создан! Данные отправлены в чат Telegram',
  EDIT_BANQUET_SUCCESS:
    'Банкет был успешно изменен! Данные отправлены в чат Telegram',
  DELETE_BANQUET_SUCCESS: 'Банкет удален!',
  SAVE_FEEDBACK_REQUESTS: 'Список вопросов сохранен',
  STATEMENT_SUCCESS: 'Выписка успешно загружена в Гугл Таблицы',
  CERTIFICATE_ACTIVATE_SUCCESS: 'Сертификат успешно активирован и отправлен в Telegram!',
  CERTIFICATE_SEND_SUCCESS: 'Сертификат успешно отправлен в Telegram!',
  DEFAULT: {
    default: 'Всплывающее сообщение',
    error: 'Похоже что-то пошло не так',
    warning: 'Внимание, внимание, внимание'
  }
};

const Notifier: FC = () => {
  const { notificationStore } = useStore();
  const { enqueueSnackbar } = useSnackbar();
  const locale = useLocale(Locale);
  const usedIds = useRef<Array<string>>([]);
  const { notifications } = notificationStore;

  useEffect(() => {
    autorun(() => {
      notifications.forEach(({ code, type, text, options, id, params }) => {
        if (!usedIds.current.includes(id)) {
          const content =
            (params ? locale[code](params) : locale[code]) ||
            text ||
            locale.DEFAULT[type!];

          enqueueSnackbar(content, { variant: type, ...options });

          usedIds.current.push(id);
        }
      });
    });
  }, []);

  return null;
};

export default memo(Notifier);
