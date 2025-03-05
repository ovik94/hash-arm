import { Theme } from '@mui/material/styles';
import { SxProps } from '@mui/material';

const styles: Record<string, SxProps<Theme>> = {
  table: theme => ({
    margin: theme.spacing(3, 0)
  }),
  tableRow: theme => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover
    }
  })
};

export default styles;
