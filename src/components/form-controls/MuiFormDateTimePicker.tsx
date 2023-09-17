import React, { FC, memo } from 'react';
import get from 'lodash/get';
import { Controller, useFormContext } from 'react-hook-form';
import { Theme } from '@mui/material/styles';
import { TextFieldProps } from '@mui/material/TextField/TextField';
import { SystemStyleObject } from '@mui/system/styleFunctionSx/styleFunctionSx';
import { DateTimePicker } from '@mui/x-date-pickers';

interface IMuiDateTimePicker {
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

export const defaultProps: Partial<IMuiDateTimePicker> = {
  required: false,
  textFieldProps: {}
};

const MuiDateTimePickerComponent: FC<IMuiDateTimePicker> = memo<IMuiDateTimePicker>(({
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
          <DateTimePicker
            label={label}
            onChange={onChange}
            value={value}
            ampm={false}
            {...otherProps}
            slotProps={{
              textField: {
                fullWidth: true,
                sx: [styles.formControl, ...(Array.isArray(sx) ? sx : [sx])],
                variant: 'outlined',
                required: Boolean(required),
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

const MuiFormDateTimePicker = (props: IMuiDateTimePicker) => {
  const methods = useFormContext();
  const error = get(methods.formState.errors, props.name);

  return <MuiDateTimePickerComponent control={methods.control} error={error} {...props} />;
};

export default MuiFormDateTimePicker;
