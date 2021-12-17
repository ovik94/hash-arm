import React, { FC } from 'react';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import createStyles from '@mui/styles/createStyles';
import makeStyles from '@mui/styles/makeStyles';
import { Controller, useFormContext } from 'react-hook-form';
import { Checkbox, FormControlLabel, Typography } from '@mui/material';

interface IMuiCheckbox {
  name: string;
  label: string;
  defaultValue?: boolean;
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
  name,
  validators
}) => {
  const classes = useStyles();
  const { control, formState: { errors } } = useFormContext();
  const error = errors[name];

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
