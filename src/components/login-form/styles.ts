import { makeStyles, createStyles } from '@mui/styles';
import { Theme } from '@mui/material/styles';

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
  selectUserButton: {
    display: 'block',
    marginTop: theme.spacing(2)
  },
  selectItem: {
    display: 'flex',
    alignItems: 'center'
  },
  userInfo: {
    display: 'flex',
    flexDirection: 'column',
    marginLeft: theme.spacing(2)
  },
  phone: {
    color: 'rgba(0, 0, 0, 0.6)'
  }
}));

export default useStyles;
