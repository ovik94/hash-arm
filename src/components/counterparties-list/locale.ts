const Locale = {
  cells: [
    {
      id: 'name',
      label: 'Имя'
    },
    {
      id: 'type',
      label: 'Тип'
    },
    {
      id: 'companyName',
      label: 'Название компании'
    },
    {
      id: 'phone',
      label: 'Номер телефона'
    },
    {
      id: 'description',
      label: 'Описание'
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
    text: `Вы точно хотите удалить контрагента ${name}?`,
    acceptLabel: 'Удалить'
  })
};

export default Locale;
