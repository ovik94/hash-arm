import React from 'react';
import { TextField, Typography } from '@material-ui/core';
import { observer } from 'mobx-react';
import useStore from '../hooks/useStore';

const CheckList = () => {
  const store = useStore();

  console.log({ ...store.admin });

  const onSubmit = (event: any) => {
    console.log(event, '111111');
    store.setAdmin({ name: event.target.value });
  };

  return (
    <div>
      <Typography>{store.admin.name}</Typography>
      <TextField onChange={onSubmit} />
    </div>
  );
};

export default observer(CheckList);
