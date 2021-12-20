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
  ...otherProps
}) => {
  const locale = useLocale(Locale);
  const [values, setValues] = React.useState<Array<any>>([]);

  const onInputChangeHandler = (event: any, newValue: string | null) => {
    if (freeSolo) {
      onChange(newValue);
    }

    onInputChange(newValue);
  };

  return (
    <Autocomplete
      value={values}
      options={options}
      getOptionLabel={getOptionLabel}
      onChange={(event: any, newValue: string | null) => {
        setValues([]);
        onChange(newValue);
      }}
      freeSolo={freeSolo}
      onInputChange={onInputChangeHandler}
      clearText={locale.clearText}
      closeText={locale.closeText}
      noOptionsText={locale.noOptionsText}
      {...otherProps}
      renderInput={params => (
        <TextField
          {...params}
          label={label}
          variant="outlined"
        />
      )}
    />
  );
};

export default MuiSuggestSelector;
