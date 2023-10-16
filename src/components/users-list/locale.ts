const Locale = {
  cells: [
    {
      id: 'name',
      label: 'Имя'
    },
    {
      id: 'role',
      label: 'Права / Роль'
    },
    {
      id: 'phone',
      label: 'Номер телефона'
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
    text: `Вы точно хотите удалить сотрудника ${name}?`,
    acceptLabel: 'Удалить'
  })
};

export default Locale;
