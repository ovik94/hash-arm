import { PrivilegeType } from '../../store/UserStore';

const Locale = {
  menu: [
    {
      title: 'Сотрудники',
      path: '/users'
    },
    {
      title: 'Контрагенты',
      path: '/counterparties'
    },
    {
      title: 'Загрузить выписку',
      path: '/statement',
      privilege: PrivilegeType.UPLOAD_STATEMENT
    },
    {
      title: 'Сертификаты',
      path: '/certificates'
    },
    {
      title: 'Вопросы для обратной связи',
      path: '/feedback-requests',
      privilege: PrivilegeType.EDIT_FEEDBACK_REQUESTS
    },
    {
      title: 'Колесо фортуны',
      path: '/wheel-of-fortune',
      privilege: PrivilegeType.EDIT_FORTUNE_DATA
    }
  ]
};

export default Locale;
