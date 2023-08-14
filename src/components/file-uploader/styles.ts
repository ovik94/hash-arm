import { Theme, SxProps } from '@mui/material/styles';

const styles: Record<string, SxProps<Theme>> = {
  uploadButtonBlock: {
    display: 'flex',
    mt: 3
  },
  uploadHint: {
    ml: 2,
    width: 1 / 2,
    lineHeight: '20px',
    letterSpacing: '0.25px',
    color: 'rgba(0, 0, 0, 0.54)'
  },
  fileItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    position: 'relative',
    mb: 3
  },
  fileItemName: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 2,
    ml: 1
  },
  fileItemClear: {
    position: 'absolute',
    right: 0,
    top: -8
  }
};

export default styles;
