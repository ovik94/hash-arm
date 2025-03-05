const Locale = {
  activate: 'Активировать',
  hasActive: 'Активен',
  subtitle: (code: number, activationDate?: string,) => (activationDate ? `Дата: ${activationDate} | Код: ${code}` : ''),
  sendImage: 'Отправить изображение в Telegram'
};

export default Locale;
