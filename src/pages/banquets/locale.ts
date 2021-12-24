import { currencyFormatter } from '../../core/locale/locale';

const Locale = {
  title: 'Заказ банкетов',
  nameLabel: 'Имя',
  phoneLabel: 'Номер телефона',
  personsCount: 'Кол-во гостей',
  dateLabel: 'Дата и время банкета',
  potables: 'Напитки',
  salads: 'Салаты',
  snacks: 'Закуски',
  hotter: 'Горячее',
  sideDishes: 'Гарниры',
  banquetMenu: 'Банкетное меню',
  addPosition: 'Добавить',
  sumLabel: 'Сумма заказа',
  addSaleLabel: 'Добавить скидку',
  totalAmountLabel: 'Итого',
  serviceFeeLabel: 'Процент за обслуживание (12%)',
  warningWeight: (type: string) => `Добавить блюда в категорию ${type}`,
  warningSum: (needSum: number) => `Необходимо набрать до ${currencyFormatter(needSum)}`,
  sumCurrency: (sum: number) => `<b>${currencyFormatter(sum)}</b>`,
  weightRecommendations: 'Рекомендации по кол-ву блюд',
  PERSON_MIN: (min: number): string => `Допустимо минимум ${min} человек`,
  PERSON_MAX: (max: number): string => `Допустимо максимум ${max} человек`
};

export default Locale;
