import React, { FC } from 'react';
import { FieldError, Controller, Control } from 'react-hook-form';
import DatePicker from '@mui/lab/DatePicker';
import TextField from '@mui/material/TextField';

interface IMuiDatePicker {
  control: Control<any>;
  name: string;
  label?: string;
  error?: FieldError;
  required?: boolean;
  disableFuture?: boolean;
  disabled?: boolean;
}

const MuiDatePicker: FC<IMuiDatePicker> = ({
  control,
  name,
  label,
  error,
  required = false,
  disableFuture = false,
  disabled = false
}) => {
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
            renderInput={(params) => {
              return (
                <TextField
                  {...params}
                  {...otherFieldProps}
                  required={required}
                  error={Boolean(error)}
                  helperText={error?.message}
                  InputLabelProps={{ shrink: true }}
                />
              );
            }}
          />
        );
      }}
    />
  );
};

export default MuiDatePicker;
