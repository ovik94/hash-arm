import React, { FC, memo } from 'react';
import get from 'lodash/get';
import { Theme, SxProps } from '@mui/material/styles';
import { Controller, useFormContext } from 'react-hook-form';
import { FormControlLabel, Radio, RadioGroup, Typography, FormHelperText, FormControl } from '@mui/material';
import { SystemStyleObject } from '@mui/system/styleFunctionSx/styleFunctionSx';

interface IMuiRadioGroup {
  options: Array<{ value: string; label: string; }>;
  name: string;
  defaultValue?: string;
  disabled?: boolean;
  sx?: SystemStyleObject<Theme>;

  [key: string]: any
}

const styles: Record<string, SxProps<Theme>> = {
  formControl: {
    my: 2,
    width: '100%'
  }
};

const defaultProps = {
  defaultValue: ''
};

const MuiFormRadioGroupComponent: FC<IMuiRadioGroup> = memo(({
  defaultValue = defaultProps.defaultValue,
  name,
  sx,
  options,
  disabled,
  control,
  error,
  ...otherProps
}) => (
  <Controller
    name={name}
    control={control}
    defaultValue={defaultValue}
    render={({ field }) => (
      <FormControl
        sx={[styles.formControl, ...(Array.isArray(sx) ? sx : [sx])]}
        error={Boolean(error?.message)}
      >
        <RadioGroup id={name} {...field} {...otherProps}>
          {
            options.map(option => (
              <FormControlLabel
                value={option.value}
                disabled={disabled}
                control={<Radio size="small" color="primary" />}
                label={<Typography variant="subtitle2">{option.label}</Typography>}
                key={option.value}
              />
            ))
          }
        </RadioGroup>
        {error?.message && <FormHelperText>{error.message}</FormHelperText>}
      </FormControl>
    )}
  />
));

const MuiFormRadioGroup = (props: IMuiRadioGroup) => {
  const methods = useFormContext();
  const error = get(methods.formState.errors, props.name);

  return <MuiFormRadioGroupComponent control={methods.control} error={error} {...props} />;
};

export default MuiFormRadioGroup;
