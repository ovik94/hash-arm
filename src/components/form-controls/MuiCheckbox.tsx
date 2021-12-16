import React, { FC } from 'react';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import createStyles from '@mui/styles/createStyles';
import makeStyles from '@mui/styles/makeStyles';
import { FieldError, Controller, Control } from 'react-hook-form';
import { Checkbox, FormControlLabel, Typography } from '@mui/material';

interface IMuiCheckbox {
  name: string;
  label: string;
  control: Control<any>;
  defaultValue?: boolean;
  error?: FieldError;
  validators?: any;
}

const useStyles = makeStyles(() => createStyles({
  formControl: {
    width: '100%'
  }
}));

const MuiRadioGroup: FC<IMuiCheckbox> = ({
  defaultValue = false,
  label,
  control,
  name,
  validators,
  error
}) => {
  const classes = useStyles();

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      rules={validators}
      render={({ field }) => (
        <FormControl className={classes.formControl} error={Boolean(error?.message)}>
          <FormControlLabel
            control={<Checkbox {...field} color="primary" size="small" />}
            label={<Typography variant="subtitle2">{label}</Typography>}
          />
          {error?.message && <FormHelperText>{error.message}</FormHelperText>}
        </FormControl>
      )}
    />
  );
};

export default MuiRadioGroup;
