import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) => createStyles({
  loginForm: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    position: 'relative'
  },
  logo: {
    margin: theme.spacing(6, 2),
    height: theme.spacing(12)
  },
  button: {
    margin: theme.spacing(3, 0, 2)
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 300
  },
  selectUserButton: {
    display: 'block',
    marginTop: theme.spacing(2)
  }
}));

export default useStyles;
