import { Theme, SxProps } from '@mui/material/styles';

const styles: Record<string, SxProps<Theme>> = {
  value: {
    borderBottom: '1px solid',
    borderColor: theme => theme.palette.grey[300],
    borderRadius: '4px',
    backgroundColor: theme => theme.palette.grey[100]
  },
  colorBox: {
    width: '28px',
    height: '28px',
    borderRadius: '50%',
    mr: 1
  },
  dragIconBox: {
    display: 'flex'
  },
  dragIcon: {
    fill: theme => theme.palette.grey[500],
    m: 1
  },
  title: {
    flexGrow: 1,
    ml: 1
  },
  editableTextField: {
    flexGrow: 1,

    '.MuiOutlinedInput-root': {
      mr: 3
    },

    '.MuiOutlinedInput-input': {
      p: '6px 14px'
    }
  }
};

export default styles;
