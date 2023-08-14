const Locale = {
  title: 'Добавление файла',
  text: 'Чтобы присвоить категорию выберите файл на компьютере',
  hint: 'Можно загрузить только<br>1 файл',
  button: 'Выбрать файл',
  state: {
    loaded: 'Загружен',
    processed: 'Обработан',
    error: 'Не обработан'
  },
  size: (size: number) => `${(size / 1024 / 1024).toFixed(2)} МБ`
};

export default Locale;
