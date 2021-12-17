import * as yup from 'yup';
import { AnyObject, Maybe } from 'yup/lib/types';

/* eslint-disable no-template-curly-in-string */
yup.setLocale({
  mixed: {
    required: 'Обязательное поле',
    notType: ({ type, originalValue }) => {
      if (type === 'number' && originalValue) {
        return 'Только числа';
      }

      if (originalValue) {
        return 'Неправильный формат';
      }

      return 'Обязательное поле';
    }
  }
});

yup.addMethod<yup.StringSchema>(yup.string, 'isPhone', function (message?: string) {
  return this.test(
    'is-phone',
    message || 'Номер телефона должен состоять из 11 символов',
    (value) => {
      if (!value) {
        return false;
      }

      const clearedValue = value.replace(/[^0-9]/g, '');
      return clearedValue.length === 11;
    }
  );
});

yup.addMethod<yup.NumberSchema>(yup.number, 'length', function (limit: number, message?: string) {
  return this.test(
    'number-has-exact-number-of-digits',
    message || `\${path} должен состоять из ${limit} символов`,
    (value) => {
      if (!value) {
        return false;
      }

      return value.toString().length === limit;
    }
  );
});

declare module 'yup' {
  interface StringSchema<
    TType extends Maybe<string> = string | undefined,
    TContext extends AnyObject = AnyObject,
    TOut extends TType = TType
    > extends yup.BaseSchema<TType, TContext, TOut> {
    isPhone(message?: string): StringSchema<TType, TContext>;
  }

  interface NumberSchema<
    TType extends Maybe<number> = number | undefined,
    TContext extends AnyObject = AnyObject,
    TOut extends TType = TType
    > extends yup.BaseSchema<TType, TContext, TOut> {
    length(value: number, message?: string): NumberSchema<TType, TContext>;
  }
}

export default yup;
