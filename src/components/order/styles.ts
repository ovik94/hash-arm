import { Theme } from '@mui/material/styles';
import { SxProps } from '@mui/material';

const styles: Record<string, SxProps<Theme>> = {
  input: theme => ({
    width: '150px',
    marginTop: theme.spacing(1)
  }),
  orderForm: {
    position: 'relative'
  },
  orderItem: theme => ({
    display: 'flex',
    flexDirection: 'column',
    marginBottom: theme.spacing(2)
  }),
  button: theme => ({
    marginTop: theme.spacing(4),
    width: '100%'
  })
};

export default styles;
