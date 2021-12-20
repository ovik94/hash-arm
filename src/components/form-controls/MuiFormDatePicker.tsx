import React, { FC } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import DatePicker from '@mui/lab/DatePicker';
import TextField from '@mui/material/TextField';

interface IMuiDatePicker {
  name: string;
  label?: string;
  required?: boolean;
  disableFuture?: boolean;
  disabled?: boolean;
}

const MuiFormDatePicker: FC<IMuiDatePicker> = ({
  name,
  label,
  required = false,
  disableFuture = false,
  disabled = false
}) => {
  const { control, formState: { errors } } = useFormContext();
  const error = errors[name];

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => {
        const { onChange, value = null, ...otherFieldProps } = field;

        return (
          <DatePicker
            label={label}
            mask="__.__.____"
            inputFormat="dd.MM.yyyy"
            onChange={onChange}
            value={value}
            disableFuture={disableFuture}
            disabled={disabled}
            renderInput={params => (
              <TextField
                {...params}
                {...otherFieldProps}
                required={required}
                error={Boolean(error)}
                helperText={error?.message}
                InputLabelProps={{ shrink: true }}
              />
            )}
          />
        );
      }}
    />
  );
};

export default MuiFormDatePicker;
