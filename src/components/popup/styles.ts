import { Theme, SxProps } from '@mui/material/styles';

const styles: Record<string, SxProps<Theme>> = {
  paper: {
    borderRadius: { xs: 0, sm: '8px' }
  },
  content: {
    backgroundColor: 'background.paper',
    boxShadow: {
      sm: '0px 6px 10px rgba(0, 0, 0, 0.14), 0px 1px 18px rgba(0, 0, 0, 0.12), 0px 3px 5px rgba(0, 0, 0, 0.2)',
      xs: 'none'
    },
    py: 8,
    px: { xs: 2, sm: 8 },
    width: { xs: '100%', sm: 'auto' },
    height: { xs: '100vh', sm: 'auto' },
    position: 'relative'
  },
  close: {
    position: 'absolute',
    zIndex: 10,
    right: theme => theme.spacing(2),
    top: theme => theme.spacing(2),
    fill: 'none',
    color: theme => theme.palette.grey[500]
  }
};

export default styles;
