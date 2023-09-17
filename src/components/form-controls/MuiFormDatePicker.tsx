import React, { FC, memo } from 'react';
import get from 'lodash/get';
import { Controller, useFormContext } from 'react-hook-form';
import { Theme } from '@mui/material/styles';
import { TextFieldProps } from '@mui/material/TextField/TextField';
import { SystemStyleObject } from '@mui/system/styleFunctionSx/styleFunctionSx';
import { DatePicker } from '@mui/x-date-pickers';

interface IMuiDatePicker {
  name: string;
  label?: string;
  required?: boolean;
  sx?: SystemStyleObject<Theme>;
  textFieldProps?: Partial<TextFieldProps>;
  [key: string]: any;
}

const styles = {
  formControl: {
    my: 2,
    width: '100%'
  }
};

export const defaultProps: Partial<IMuiDatePicker> = {
  required: false,
  textFieldProps: {}
};

const MuiDatePickerComponent: FC<IMuiDatePicker> = memo<IMuiDatePicker>(({
  name,
  label,
  required = defaultProps.required,
  textFieldProps = defaultProps.textFieldProps,
  sx,
  control,
  error,
  ...otherProps
}) => {
  const aggregatedProps: Record<string, any> = {};
  const onFocus = () => {
    // показать календарь
    if (aggregatedProps.onFocus) {
      aggregatedProps.onFocus();
    }
  };
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => {
        const { onChange, value = null, ...otherFieldProps } = field;

        return (
          <DatePicker
            label={label}
            onChange={onChange}
            value={value}
            {...otherProps}
            slotProps={{
              textField: {
                autoComplete: 'off',
                sx: [styles.formControl, ...(Array.isArray(sx) ? sx : [sx])],
                required,
                error: Boolean(error),
                helperText: error?.message,
                onFocus,
                ...otherFieldProps,
                ...textFieldProps
              }
            }}
          />
        );
      }}
    />
  );
});

const MuiFormDatePicker = (props: IMuiDatePicker) => {
  const methods = useFormContext();
  const error = get(methods.formState.errors, props.name);

  return <MuiDatePickerComponent control={methods.control} error={error} {...props} />;
};

export default MuiFormDatePicker;
