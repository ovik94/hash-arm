import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) => createStyles({
  formControl: {
    margin: theme.spacing(0, 2),
    minWidth: '100px'
  },
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
