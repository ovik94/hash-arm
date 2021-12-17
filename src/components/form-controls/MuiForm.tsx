import React, { FC } from 'react';
import { SubmitHandler, FormProvider, UseFormReturn } from 'react-hook-form';

interface IMuiFormProps {
  // @ts-ignore
  methods: UseFormReturn<any, object>;
  onSubmit: SubmitHandler<any>;
}

const MuiForm: FC<IMuiFormProps> = ({
  methods,
  onSubmit,
  children
}) => {
  const { handleSubmit } = methods;

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        {children}
      </form>
    </FormProvider>
  );
};

export default MuiForm;
