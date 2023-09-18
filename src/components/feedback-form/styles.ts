import { SxProps } from '@mui/material';
import { Theme } from '@mui/material/styles';

const styles: Record<string, SxProps<Theme>> = {
  wrapper: {
    mb: 10,

    '& .MuiMobileStepper-positionStatic': {
      mb: 2,
      backgroundColor: 'transparent'
    },

    '& .MuiLinearProgress-root': {
      width: '100%'
    }
  },
  buttons: {
    position: 'fixed',
    width: { xs: 'calc(100% - 32px)', sm: '386px' },
    bottom: '0',
    backgroundColor: '#fff',
    padding: '16px',
    borderRadius: '8px',

    '& button': {
      width: '50%'
    },

    '& :first-of-type': {
      mr: 2
    }
  }
};

export default styles;
