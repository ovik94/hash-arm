import { currencyFormatter } from '../../core/locale/locale';

const Locale = {
  title: 'Заказ банкетов',
  nameLabel: 'Имя',
  phoneLabel: 'Номер телефона',
  personsCount: 'Кол-во гостей',
  dateLabel: 'Дата и время банкета',
  PERSON_MIN: (min: number): string => `Допустимо минимум ${min} человек`,
  PERSON_MAX: (max: number): string => `Допустимо максимум ${max} человек`,
  buttonLabel: 'Далее',
  sumCurrency: (sum: number) => `<b>${currencyFormatter(sum)}</b>`,
  sumLabel: 'Сумма заказа',
  addSaleLabel: 'Добавить скидку',
  addCommentLabel: 'Добавить комментарий',
  totalAmountLabel: 'Итого',
  serviceFeeLabel: 'Процент за обслуживание (12%)',
  saleLabel: 'Скидка',
  commentLabel: 'Комментарий',
  saveButton: 'Сохранить'
};

export default Locale;
