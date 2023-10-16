import { Theme, SxProps } from '@mui/material/styles';

const styles: Record<string, SxProps<Theme>> = {
  title: {
    mb: 5
  },
  buttons: {
    justifyContent: 'space-between',
    mt: 6,
    '> button': {
      height: ({ spacing }) => spacing(4.5),
      flex: 1,
      py: 0,
      px: 2
    }
  }
};

export default styles;
