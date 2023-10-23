import { Theme, SxProps } from '@mui/material/styles';

const styles: Record<string, SxProps<Theme>> = {
  title: {
    flexGrow: 1
  },
  button: {
    width: 'auto !important'
  },
  nomenclatureItem: {
    '.MuiFormControl-root': {
      width: '200px'
    },
    '.MuiTextField-root': {
      margin: '8px 0px'
    },
    '.MuiInputLabel-root': {
      top: '-8px'
    },
    '.MuiInputBase-input': {
      p: 1
    }
  }
};

export default styles;
