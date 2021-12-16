import { makeStyles, createStyles } from '@mui/styles';
import { Theme } from '@mui/material/styles';

const useStyles = makeStyles((theme: Theme) => createStyles({
  input: {
    width: '100px'
  },
  orderForm: {
    position: 'relative'
  },
  orderItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing(2)
  },
  button: {
    marginTop: theme.spacing(4),
    width: '100%'
  }
}));

export default useStyles;
