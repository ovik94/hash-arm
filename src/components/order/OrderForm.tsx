import React, { FC } from 'react';
import { observer } from 'mobx-react-lite';
import { SubmitHandler, useForm, Controller } from 'react-hook-form';
import { Typography, OutlinedInput, FormHelperText, FormControl, Button } from '@material-ui/core';
import InputLabel from '@material-ui/core/InputLabel';
import useLocale from '../../hooks/useLocale';
import useStyles from './styles';
import Locale from './locale';
import { IContractorNomenclatures } from '../../store/ContractorsStore';
import Loader from '../loader/Loader';
import useStore from '../../hooks/useStore';

interface IForm {
  [id: string]: number | string;
}

interface IOrderForm {
  data: Array<IContractorNomenclatures>;
  onSubmit: SubmitHandler<IForm>;
}

const OrderForm: FC<IOrderForm> = ({ data, onSubmit }: IOrderForm) => {
  const classes = useStyles();
  const locale = useLocale(Locale);
  const { contractorsStore } = useStore();
  const { control, handleSubmit, formState: { errors } } = useForm<IForm>();

  return (
    <div className={classes.orderForm}>
      <Loader isLoading={contractorsStore.isLoadingOrder} />
      <form onSubmit={handleSubmit(onSubmit)}>
        {
          data.map(item => (
            <div className={classes.orderItem} key={item.id}>
              <Typography variant="body2">{item.title}</Typography>
              <Controller
                name={item.id}
                control={control}
                defaultValue=""
                rules={{ required: locale.fieldRequired }}
                render={({ field }) => (
                  <FormControl className={classes.formControl} error={Boolean(errors[item.id]?.message)}>
                    <InputLabel
                      id={`${item.id}-label`}
                      shrink
                      variant="outlined"
                    >
                      {locale.inputLabel(item.unit)}
                    </InputLabel>
                    <OutlinedInput
                      notched
                      margin="none"
                      label={locale.inputLabel(item.unit)}
                      className={classes.input}
                      id={`${item.id}-label`}
                      {...field}
                    />
                    {errors[item.id]?.message && <FormHelperText>{errors[item.id]?.message}</FormHelperText>}
                  </FormControl>
                )}
              />
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
    </div>
  );
};

export default observer<IOrderForm>(OrderForm);
