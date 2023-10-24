const Locale = {
  cells: [
    {
      id: 'code',
      label: 'Код розыгрыша'
    },
    {
      id: 'description',
      label: 'Описание'
    },
    {
      id: 'content',
      label: 'Варианты выигрыша'
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
  deleteConfirm: (code: string) => ({
    title: 'Подтвердить удаление',
    text: `Вы точно хотите удалить розыгрыш ${code}?`,
    acceptLabel: 'Удалить'
  })
};

export default Locale;
