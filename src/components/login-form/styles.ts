import { Theme } from '@mui/material/styles';
import { SxProps } from '@mui/material';

const styles: Record<string, SxProps<Theme>> = {
  loginForm: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    position: 'relative'
  },
  form: {
    width: '100%'
  },
  logo: theme => ({
    mb: theme.spacing(3),
    height: theme.spacing(12)
  }),
  selectItem: {
    display: 'flex',
    alignItems: 'center'
  },
  userInfo: theme => ({
    display: 'flex',
    flexDirection: 'column',
    ml: theme.spacing(2)
  })
};

export default styles;
