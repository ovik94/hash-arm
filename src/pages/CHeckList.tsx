import React from 'react';
import { TextField, Typography } from '@material-ui/core';
import { observer } from 'mobx-react';
import useStore from '../hooks/useStore';

const CheckList = () => {
  const { admin, setAdmin, setCheckList, checkList } = useStore();

  const onSubmit = (event: any) => {
    setAdmin({ name: event.target.value });
  };

  const onSubmitCheckList = (event: any) => {
    setCheckList([{ title: event.target.value }]);
  };

  return (
    <div>

      <TextField variant="outlined" onChange={onSubmit} />
      <TextField variant="outlined" onChange={onSubmitCheckList} />
      <Typography>{admin.name}</Typography>
      {
      checkList.map(item => <Typography>{item.title}</Typography>)
      }
    </div>
  );
};

export default observer(CheckList);
