import { Theme, SxProps } from '@mui/material/styles';

const styles: Record<string, SxProps<Theme>> = {
  value: {
    backgroundColor: '#fff',
    borderBottom: '1px solid',
    borderColor: theme => theme.palette.grey[300],

    '& .MuiSvgIcon-root': {
      // fill: theme => theme.palette.grey[500]
    }
  },
  header: {
    backgroundColor: theme => theme.palette.grey[200],
    height: '32px',
    pl: 9
  },
  name: {
    flexGrow: 1,
    pl: 2
  },
  dragIcon: {
    m: 2
  },
  editableTextField: {
    flexGrow: 1,

    '.MuiOutlinedInput-root': {
      width: '500px',
      ml: 2
    },

    '.MuiOutlinedInput-input': {
      p: '6px 14px'
    }
  }
};

export default styles;
