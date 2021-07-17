import React, { FunctionComponent } from 'react';
import ReactDOM from 'react-dom';
import { makeStyles } from '@material-ui/core';


const useStyles = makeStyles(() => ({
  root: {
    width: '100%',
    background: '#E5E5E5',
    minHeight: '100vh'
  },
  containerRoot: {
    pointerEvents: 'auto'
  }
}));

const App: FunctionComponent = () => {
  const classes = useStyles();

  return (
      <div className={classes.root}>
        sssssssssssss
      </div>
  );
};

ReactDOM.render(<App/>, document.getElementById('root'));
