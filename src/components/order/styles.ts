import { makeStyles, createStyles } from '@mui/styles';
import { Theme } from '@mui/material/styles';

const useStyles = makeStyles((theme: Theme) => createStyles({
  input: {
    width: '150px',
    marginTop: theme.spacing(1)
  },
  orderForm: {
    position: 'relative'
  },
  orderItem: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: theme.spacing(2)
  },
  button: {
    marginTop: theme.spacing(4),
    width: '100%'
  }
}));

export default useStyles;
