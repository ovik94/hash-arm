const Locale = {
  editTitle: 'Редактирование вопроса',
  addTitle: 'Добавление вопроса',
  titleLabel: 'Вопрос *',
  typeLabel: 'Тип *',
  requiredLabel: 'Вопрос обязательный',
  subtitleLabel: 'Подсказка',
  optionsLabel: 'Варианты ответа',
  optionsHelper: 'Заполняй варианты через знак ";", если все правильно снизу появятся написанные варианты',
  requestTypes: [
    { value: 'textInput', label: 'Текстовое поле' },
    { value: 'textArea', label: 'Большое текстовое поле' },
    { value: 'select', label: 'Выбрать один вариант' },
    { value: 'selectOtherVariant', label: 'Выбрать один вариант или предложить свой' },
    { value: 'rating', label: 'Оценка' },
    { value: 'selectGroupString', label: 'Группа вопросов с выбором одного текстового варианта' },
    { value: 'selectGroupNumber', label: 'Группа вопросов с выбором одного числового варианта' }
  ]
};

export default Locale;
