import React, { FC } from 'react';
import clsx from 'clsx';
import { Controller, useFormContext } from 'react-hook-form';
import { createStyles, makeStyles } from '@mui/styles';
import { Box, Rating, Typography } from '@mui/material';
import { Theme } from '@mui/material/styles';
import { RatingProps } from '@mui/material/Rating/Rating';

export interface IMuiFormRatingProps extends RatingProps {
  name: string;
  defaultValue?: number;
  className?: string;
  helperText?: string;
}

const useStyles = makeStyles((theme: Theme) => createStyles({
  formControl: {
    margin: theme.spacing(2, 0),
    width: '100%'
  }
}));

const MuiFormRating: FC<IMuiFormRatingProps> = ({
  defaultValue,
  name,
  className,
  helperText = ' ',
  size = 'large',
  ...otherProps
}) => {
  const classes = useStyles();
  const { control, formState: { errors } } = useFormContext();
  const error = errors[name];

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      render={({ field }) => {
        const { ref, ...otherField } = field;
        return (
          <Box>
            <Rating
              className={clsx(classes.formControl, className)}
              size={size}
              {...otherField}
              {...otherProps}
            />
            <Typography>{error?.message || helperText}</Typography>
          </Box>
        );
      }}
    />
  );
};

export default MuiFormRating;
