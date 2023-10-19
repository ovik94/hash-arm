import * as Globalize from 'globalize';
import ruDateFnsData from 'date-fns/locale/ru';
// eslint-disable-next-line import/extensions
import ruLocaleData from './cldr-data/ru.json';

Globalize.load(ruLocaleData);
Globalize.locale('ru');

export const currencyFormatter = Globalize.currencyFormatter('RUB');

const locale = {
  defaultTitle: 'АРМ ХашЛаваш',
  fieldRequired: 'Заполните поле',
  buttons: {
    add: 'Добавить',
    update: 'Редактировать',
    delete: 'Удалить',
    cancel: 'Отменить',
    save: 'Сохранить'
  },
  userRoleName: {
    supervisor: 'Руководитель',
    admin: 'Администратор',
    waiter: 'Официант'
  },
  roles: [
    {
      label: 'Руководитель',
      value: 'supervisor'
    },
    {
      label: 'Администратор',
      value: 'admin'
    },
    {
      label: 'Официант',
      value: 'waiter'
    }
  ],
  counterpartyTypes: {
    kitchen: 'Кухонный сотрудник',
    service: 'Сотрудник зала',
    manager: 'Руководитель',
    provider: 'Поставщик / Контрагент'
  }
};

export const DateFnsData = ruDateFnsData;

export default locale;
