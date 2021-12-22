import * as Globalize from 'globalize';
import ruDateFnsData from 'date-fns/locale/ru';
// eslint-disable-next-line import/extensions
import ruLocaleData from './cldr-data/ru.json';

Globalize.load(ruLocaleData);
Globalize.locale('ru');

export const currencyFormatter = Globalize.currencyFormatter('RUB');

const locale = {
  defaultTitle: 'АРМ ХашЛаваш',
  fieldRequired: 'Заполните поле'
};

export const DateFnsData = ruDateFnsData;

export default locale;
