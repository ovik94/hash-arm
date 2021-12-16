import React, { FC, ReactNode } from 'react';
import InputLabel from '@mui/material/InputLabel';
import { Theme } from '@mui/material/styles';
import createStyles from '@mui/styles/createStyles';
import makeStyles from '@mui/styles/makeStyles';
import { FieldError, Controller, Control } from 'react-hook-form';
import { OutlinedInput, Select, MenuItem, FormHelperText, FormControl } from '@mui/material';

interface IMuiSelect {
  options: Array<{ value: string; label: string; }>;
  name: string;
  control: Control<any>;
  defaultValue?: string;
  label?: string | ReactNode;
  error?: FieldError;
  validators?: any;
}

const useStyles = makeStyles((theme: Theme) => createStyles({
  formControl: {
    margin: theme.spacing(3, 0),
    width: '100%'
  }
}));

const MuiSelect: FC<IMuiSelect> = ({
  defaultValue = '',
  control,
  name,
  options,
  validators,
  label,
  error
}: IMuiSelect): JSX.Element => {
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
          <Select
            MenuProps={{ variant: 'menu' }}
            variant="outlined"
            id={name}
            input={<OutlinedInput notched label={label} />}
            labelId={`${name}-label`}
            {...field}
          >
            {
              options.map(option => (
                <MenuItem value={option.value} key={option.value}>{option.label}</MenuItem>
              ))
            }
          </Select>
          {error?.message && <FormHelperText>{error.message}</FormHelperText>}
        </FormControl>
      )}
    />
  );
};

export default MuiSelect;
