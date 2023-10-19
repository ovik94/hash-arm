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
      title: 'Склад',
      path: '/bar-balance'
    },
    {
      title: 'Заказ банкетов',
      path: '/banquets'
    },
    {
      title: 'Загрузить выписку',
      path: '/statement',
      privilege: PrivilegeType.UPLOAD_STATEMENT
    },
    {
      title: 'Вопросы для обратной связи',
      path: '/feedback-requests',
      privilege: PrivilegeType.EDIT_FEEDBACK_REQUESTS
    }
  ]
};

export default Locale;
