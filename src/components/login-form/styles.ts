import { Theme } from '@mui/material/styles';
import { SxProps } from '@mui/material';

const styles: Record<string, SxProps<Theme>> = {
  loginForm: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    position: 'relative'
  },
  logo: theme => ({
    m: theme.spacing(6, 2),
    height: theme.spacing(12)
  }),
  selectUserButton: theme => ({
    display: 'block',
    marginTop: theme.spacing(2)
  }),
  selectItem: {
    display: 'flex',
    alignItems: 'center'
  },
  userInfo: theme => ({
    display: 'flex',
    flexDirection: 'column',
    ml: theme.spacing(2)
  }),
  phone: {
    color: 'rgba(0, 0, 0, 0.6)'
  },
  button: theme => ({
    m: theme.spacing(3, 0, 2)
  })
};

export default styles;
