import React, { FC, useMemo, useState } from 'react';
import clsx from 'clsx';
import { Controller, useFormContext } from 'react-hook-form';
import { createStyles, makeStyles } from '@mui/styles';
import { IconButton, InputAdornment, TextField } from '@mui/material';
import { Theme } from '@mui/material/styles';
import { Visibility, VisibilityOff } from '@mui/icons-material';

export interface IMuiInputProps {
  name: string;
  defaultValue?: string;
  multiline?: boolean;
  minRows?: number;
  maxRows?: number;
  className?: string;
  helperText?: string;

  [otherProps: string]: any;
}

const useStyles = makeStyles((theme: Theme) => createStyles({
  formControl: {
    margin: theme.spacing(2, 0),
    width: '100%'
  }
}));

const MuiFormInput: FC<IMuiInputProps> = ({
  defaultValue = '',
  name,
  className,
  helperText = '',
  type = 'text',
  ...otherProps
}) => {
  const classes = useStyles();
  const {
    control,
    formState: { errors }
  } = useFormContext();
  const error = errors[name];

  const [showPassword, setShowPassword] = useState(false);

  const onClickShowPassword = () => setShowPassword((show) => !show);

  const renderEndAdornment = useMemo(() => {
    if (type === 'password') {
      return (
        <InputAdornment position="end">
          <IconButton onClick={onClickShowPassword} edge="end">
            {showPassword ? <VisibilityOff /> : <Visibility />}
          </IconButton>
        </InputAdornment>
      );
    }
    return undefined;
  }, [type, showPassword]);

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      render={({ field }) => {
        const {
          ref,
          ...otherField
        } = field;
        return (
          <TextField
            className={clsx(classes.formControl, className)}
            variant="outlined"
            fullWidth
            error={Boolean(error?.message)}
            helperText={error?.message || helperText}
            type={showPassword && type === 'password' ? 'text' : type}
            inputRef={ref}
            InputProps={{
              endAdornment: renderEndAdornment
            }}
            {...otherField}
            {...otherProps}
          />
        );
      }}
    />
  );
};

export default MuiFormInput;
