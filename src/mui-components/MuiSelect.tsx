import React, { FC } from 'react';
import { MenuItem, Select, InputLabel, Input, FormControl } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

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

const useStyles = makeStyles((theme: Theme) => createStyles({
  control: {
    margin: theme.spacing(1),
    minWidth: 250
  }
}));

const MuiSelect: FC<IMuiSelect> = ({ value, id, label, onChange, options, renderItem, ...otherProps }: IMuiSelect): JSX.Element => {
  const classes = useStyles();

  const onChangeOption = (event: React.ChangeEvent<{ name?: string | undefined; value: unknown; }>): void => {
    console.log(event.target.value, 'value');
    onChange(event.target.value as string);
  };

  console.log('File: MuiSelect.tsx, Function: MuiSelect,  otherProps: ', otherProps);
  return (
    <FormControl className={classes.control}>
      { label && <InputLabel id="select-label">{label}</InputLabel> }
      <Select
        labelId="select-label"
        id={id}
        value={value || ''}
        onChange={onChangeOption}
        input={<Input />}
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
