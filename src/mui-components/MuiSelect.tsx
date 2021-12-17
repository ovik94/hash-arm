import React, { FC } from 'react';
import { MenuItem, Select, InputLabel, OutlinedInput, FormControl } from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select/SelectInput';

interface IMuiSelect {
  id: string;
  // eslint-disable-next-line react/require-default-props
  value?: string;
  // eslint-disable-next-line react/require-default-props
  label?: string;
  // eslint-disable-next-line react/require-default-props
  renderItem?: (option: { label: string, value: string }) => JSX.Element;
  onChange: (value: string) => void;
  options: Array<{ label: string, value: string }>;

  [key: string]: any
}

const MuiSelect: FC<IMuiSelect> = ({
  value,
  id,
  label,
  onChange,
  options,
  renderItem,
  ...otherProps
}: IMuiSelect): JSX.Element => {
  const onChangeOption = (event: SelectChangeEvent): void => {
    onChange(event.target.value as string);
  };

  return (
    <FormControl style={{ margin: '8px', width: '100%' }}>
      {label && <InputLabel id={`${id}-select-label`}>{label}</InputLabel>}
      <Select
        labelId="select-label"
        id={id}
        value={value || ''}
        onChange={onChangeOption}
        input={<OutlinedInput label={label} />}
        {...otherProps}
      >
        {options.map(option => (
          <MenuItem value={option.value} key={option.value}>
            {
              renderItem ? renderItem(option) : option.label
            }
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default MuiSelect;
