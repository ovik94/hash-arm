import React, { FC } from 'react';
import clsx from 'clsx';
import { Controller, useFormContext } from 'react-hook-form';
import { createStyles, makeStyles } from '@mui/styles';
import { TextField } from '@mui/material';

export interface IMuiInputProps {
  name: string;
  defaultValue?: string;
  label?: string;
  multiline?: boolean;
  minRows?: number;
  maxRows?: number;
  className?: string;
  helperText?: string;
  [otherProps: string]: any
}

const useStyles = makeStyles(() => createStyles({
  formControl: {
    width: '100%'
  }
}));

const MuiInput: FC<IMuiInputProps> = ({
  defaultValue = '',
  name,
  className,
  helperText = ' ',
  ...otherProps
}) => {
  const classes = useStyles();
  const { control, formState: { errors } } = useFormContext();
  const error = errors[name];

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      render={({ field }) => {
        const { ref, ...otherField } = field;
        return (
          <TextField
            className={clsx(classes.formControl, className)}
            variant="outlined"
            error={Boolean(error?.message)}
            helperText={error?.message || helperText}
            inputRef={ref}
            {...otherField}
            {...otherProps}
          />
        );
      }}
    />
  );
};

export default MuiInput;
