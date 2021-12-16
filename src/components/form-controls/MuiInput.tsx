import React, { FC } from 'react';
import InputLabel from '@mui/material/InputLabel';
import { Theme } from '@mui/material/styles';
import createStyles from '@mui/styles/createStyles';
import makeStyles from '@mui/styles/makeStyles';
import { FieldError, Controller, Control } from 'react-hook-form';
import { OutlinedInput, FormHelperText, FormControl } from '@mui/material';

interface IMuiInput {
  name: string;
  control: Control<any>;
  defaultValue?: string;
  label?: string;
  error?: FieldError;
  validators?: any;
  multiline?: boolean;
  minRows?: number;
  maxRows?: number;
  [otherProps: string]: any
}

const useStyles = makeStyles((theme: Theme) => createStyles({
  formControl: {
    margin: theme.spacing(3, 0),
    width: '100%'
  }
}));

const MuiInput: FC<IMuiInput> = ({
  defaultValue = '',
  control,
  name,
  validators,
  label,
  error,
  ...otherProps
}: IMuiInput) => {
  const classes = useStyles();

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      rules={validators}
      render={({ field }) => (
        <FormControl className={classes.formControl} error={Boolean(error?.message)}>
          {label && <InputLabel id={`${name}-label`} shrink variant="outlined">{label}</InputLabel>}
          <OutlinedInput
            notched
            label={label}
            id={`${name}-label`}
            {...field}
            {...otherProps}
          />
          {error?.message && <FormHelperText>{error.message}</FormHelperText>}
        </FormControl>
      )}
    />
  );
};

export default MuiInput;
