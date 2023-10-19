const Locale = {
  nameLabel: 'Вопрос',
  confirmDeleteLocale: (title?: string) => ({
    title: 'Удалить',
    text: `Удалить вопрос «${title || ''}»?`,
    acceptLabel: 'Удалить'
  })
};

export default Locale;
