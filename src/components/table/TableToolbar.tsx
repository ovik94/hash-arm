import React, { FC, useEffect, useState } from 'react';
import clsx from 'clsx';
import { Typography, Toolbar, IconButton, Input, InputAdornment, InputLabel, FormControl } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import ClearIcon from '@material-ui/icons/Clear';
import useLocale from '../../hooks/useLocale';
import Locale from './locale';
import useStyles from './styles';

interface ITableToolbarProps {
  numSelected: number;
  onDelete: () => void;
  isSearchable: boolean;
  // eslint-disable-next-line react/require-default-props
  onChangeSearchField?: (value: string) => void;
}

const TableToolbar: FC<ITableToolbarProps> = ({
  numSelected,
  onDelete,
  isSearchable,
  onChangeSearchField
}: ITableToolbarProps) => {
  const classes = useStyles();
  const locale = useLocale(Locale);
  const [value, setValue] = useState<string>('');

  const onChangeSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const onClearSearchValue = () => {
    setValue('');
  };

  useEffect(() => {
    if (onChangeSearchField) {
      onChangeSearchField(value);
    }
  }, [value]);

  return (
    <Toolbar
      className={clsx(classes.toolbar, {
        [classes.highlight]: numSelected > 0
      })}
    >
      {numSelected > 0 ? (
        <Typography className={classes.toolbarTitle} color="inherit" variant="subtitle1">
          {locale.selectedLabel(numSelected)}
        </Typography>
      ) : (
        <Typography className={classes.toolbarTitle} variant="h6">
          {locale.toolbarTitle}
        </Typography>
      )}
      {
        isSearchable && (
          <Input
            id="clear"
            placeholder={locale.searchLabel}
            onChange={onChangeSearch}
            value={value}
            endAdornment={
              value && (
                <InputAdornment position="end">
                  <IconButton onClick={onClearSearchValue} size="small">
                    <ClearIcon />
                  </IconButton>
                </InputAdornment>
              )
            }
          />
        )
      }
      {numSelected > 0 && (
        <IconButton onClick={onDelete}>
          <DeleteIcon />
        </IconButton>
      )}
    </Toolbar>
  );
};

export default TableToolbar;