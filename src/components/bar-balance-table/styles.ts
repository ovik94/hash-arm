import { Theme, SxProps } from '@mui/material/styles';

const styles: Record<string, SxProps<Theme>> = {
  table: {
    my: 3
  },
  tableRow: theme => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover
    }
  }),
  categoryName: {
    m: 2
  }
};

export default styles;
