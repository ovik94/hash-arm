import React, { FC } from 'react';
import { observer } from 'mobx-react-lite';
import { SubmitHandler, useForm, Controller } from 'react-hook-form';
import { Typography, OutlinedInput, FormHelperText, FormControl, Button } from '@material-ui/core';
import InputLabel from '@material-ui/core/InputLabel';
import useLocale from '../../hooks/useLocale';
import useStyles from './styles';
import Locale from './locale';
import { IContractorNomenclatures } from '../../store/ContractorsStore';

interface IForm {
  [id: string]: number
}

interface IOrderForm {
  data: Array<IContractorNomenclatures>;
  onSubmit: SubmitHandler<IForm>;
}

const OrderForm: FC<IOrderForm> = ({ data, onSubmit }: IOrderForm) => {
  const classes = useStyles();
  const locale = useLocale(Locale);
  const { control, handleSubmit, formState: { errors } } = useForm<IForm>();

  console.log({ ...data }, 'data');
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {
        data.map(item => (
          <div className={classes.orderItem} key={item.id}>
            <Typography variant="subtitle1" className={classes.orderItemTitle}>{item.title}</Typography>
            <Controller
              name={item.id}
              control={control}
              defaultValue={0}
              rules={{ required: locale.fieldRequired }}
              render={({ field }) => (
                <FormControl className={classes.formControl} error={Boolean(errors[item.id]?.message)}>
                  <InputLabel id={`${item.id}-label`} shrink variant="outlined">{locale.inputLabel}</InputLabel>
                  <OutlinedInput
                    notched
                    label={locale.inputLabel}
                    className={classes.input}
                    id={`${item.id}-label`}
                    {...field}
                  />
                  {errors[item.id]?.message && <FormHelperText>{errors[item.id]?.message}</FormHelperText>}
                </FormControl>
              )}
            />
            <Typography variant="body2">{item.unit}</Typography>
          </div>
        ))
      }
      <Controller
        name="button"
        control={control}
        render={({ field }) => (
          <Button
            type="submit"
            className={classes.button}
            variant="contained"
            color="primary"
            {...field}
          >
            {locale.orderButtonLabel}
          </Button>
        )}
      />
    </form>
  );
};

export default observer<IOrderForm>(OrderForm);
