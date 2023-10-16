import React, { FC, ReactNode } from 'react';
import InputLabel from '@mui/material/InputLabel';
import { Theme } from '@mui/material/styles';
import createStyles from '@mui/styles/createStyles';
import makeStyles from '@mui/styles/makeStyles';
import { Controller, useFormContext } from 'react-hook-form';
import { OutlinedInput, Select, MenuItem, FormHelperText, FormControl } from '@mui/material';

interface IMuiSelect {
  options: Array<{ value: string; label: string; }>;
  name: string;
  defaultValue?: string;
  label?: string | ReactNode;
  validators?: any;
  renderItem?: (option: { label: string, value: string }) => JSX.Element;
}

const useStyles = makeStyles((theme: Theme) => createStyles({
  formControl: {
    margin: theme.spacing(2, 0),
    width: '100%'
  }
}));

const MuiFormSelect: FC<IMuiSelect> = ({
  defaultValue = '',
  name,
  options,
  validators,
  label,
  renderItem
}: IMuiSelect): JSX.Element => {
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
          {label && <InputLabel id={`${name}-label`} variant="outlined">{label}</InputLabel>}
          <Select
            MenuProps={{ variant: 'menu' }}
            variant="outlined"
            id={name}
            input={<OutlinedInput label={label} />}
            labelId={`${name}-label`}
            {...field}
          >
            {
              options.map(option => (
                <MenuItem value={option.value} key={option.value}>
                  {renderItem ? renderItem(option) : option.label}
                </MenuItem>
              ))
            }
          </Select>
          {error?.message && <FormHelperText>{error.message}</FormHelperText>}
        </FormControl>
      )}
    />
  );
};

export default MuiFormSelect;
