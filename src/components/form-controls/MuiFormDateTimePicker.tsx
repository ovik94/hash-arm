import React, { FC } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import { DateTimePicker } from '@mui/lab';
import { createStyles, makeStyles } from '@mui/styles';
import clsx from 'clsx';

interface IMuiDateTimePicker {
  name: string;
  label?: string;
  required?: boolean;
  className?: string;
  disabled?: boolean;
}

const useStyles = makeStyles(() => createStyles({
  formControl: {
    width: '100%'
  }
}));

const MuiFormDatePicker: FC<IMuiDateTimePicker> = ({
  name,
  label,
  required = false,
  disabled = false,
  className
}) => {
  const classes = useStyles();
  const { control, formState: { errors } } = useFormContext();
  const error = errors[name];

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => {
        const { onChange, value = null, ...otherFieldProps } = field;

        return (
          <DateTimePicker
            label={label}
            mask="__.__.____ __:__"
            inputFormat="dd.MM.yyyy hh:mm"
            onChange={onChange}
            value={value}
            disabled={disabled}
            renderInput={params => (
              <TextField
                {...params}
                {...otherFieldProps}
                className={clsx(classes.formControl, className)}
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
