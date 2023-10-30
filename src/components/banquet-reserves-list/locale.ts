const Locale = {
  cells: [
    {
      id: 'data',
      label: 'Дата'
    },
    {
      id: 'name',
      label: 'Имя'
    },
    {
      id: 'phone',
      label: 'Телефон'
    },
    {
      id: 'personsCount',
      label: 'Кол-во человек'
    },
    {
      id: 'totalAmount',
      label: 'Сумма'
    },
    {
      id: 'edit',
      label: ''
    },
    {
      id: 'delete',
      label: ''
    }
  ],
  deleteConfirm: (name: string) => ({
    title: 'Подтвердить удаление',
    text: `Вы точно хотите удалить банкет на имя ${name}?`,
    acceptLabel: 'Удалить'
  })
};

export default Locale;
