import React, { FC } from 'react';
import { Autocomplete, TextField } from '@mui/material';
import useLocale from '../hooks/useLocale';

const Locale = {
  clearText: 'Очистить',
  closeText: 'Закрыть',
  noOptionsText: 'Ничего не найдено'
};

export interface IMuiSuggestSelector {
  options: Array<any>;
  getOptionLabel?: (option: any) => string;
  label?: string;
  freeSolo?: boolean;
  onInputChange?: (newValue: string | null) => void;
  onChange?: (option: any) => void;
  value?: any

  [otherProps: string]: any
}

const defaultProps = {
  onInputChange: () => {
  },
  onChange: () => {
  },
  options: []
};

const MuiSuggestSelector: FC<IMuiSuggestSelector> = ({
  options = defaultProps.options,
  getOptionLabel,
  label,
  freeSolo = false,
  onInputChange = defaultProps.onInputChange,
  onChange = defaultProps.onChange,
  value = [],
  ...otherProps
}) => {
  const locale = useLocale(Locale);

  const onInputChangeHandler = (event: any, newValue: string | null) => {
    if (freeSolo) {
      onChange(newValue);
    }

    onInputChange(newValue);
  };

  const onChangeValue = (event: any, newValue: string | null) => {
    onChange(newValue);
  };

  return (
    <Autocomplete
      size="small"
      value={value}
      options={options}
      getOptionLabel={getOptionLabel}
      onChange={onChangeValue}
      freeSolo={freeSolo}
      onInputChange={onInputChangeHandler}
      clearText={locale.clearText}
      closeText={locale.closeText}
      noOptionsText={locale.noOptionsText}
      isOptionEqualToValue={() => true}
      {...otherProps}
      renderInput={params => (
        <TextField
          {...params}
          label={label}
          variant="standard"
        />
      )}
    />
  );
};

export default MuiSuggestSelector;
