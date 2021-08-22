const Locale = {
  headCells: [
    {
      id: 'title',
      label: 'Название'
    },
    {
      id: 'unit',
      label: 'Ед.измерения'
    },
    {
      id: 'price',
      label: 'Цена'
    }
  ],
  inputLabel: (unit: string) => `Кол-во, ${unit}`,
  orderButtonLabel: 'Отправить'
};

export default Locale;
