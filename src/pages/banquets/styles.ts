import { Theme } from '@mui/material/styles';
import { SxProps } from '@mui/material';

const styles: Record<string, SxProps<Theme>> = {
  title: theme => ({
    mb: theme.spacing(4)
  }),
  item: {
    display: 'flex',
    alignItems: 'center'
  },
  counter: theme => ({
    display: 'flex',
    alignItems: 'center',
    margin: theme.spacing(0, 1)
  }),
  positionItem: theme => ({
    margin: theme.spacing(2, 0)
  }),
  itemTitle: {
    flexGrow: 4
  },
  itemPrice: theme => ({
    mr: theme.spacing(3)
  }),
  itemCount: theme => ({
    m: theme.spacing(0, 2)
  }),
  menuType: theme => ({
    mb: theme.spacing(2)
  }),
  order: theme => ({
    display: 'flex',
    justifyContent: 'space-between',
    mt: theme.spacing(3),

    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column-reverse'
    }
  }),
  orderList: theme => ({
    width: '60%',
    ml: theme.spacing(4),
    p: theme.spacing(2),

    [theme.breakpoints.down('sm')]: {
      width: '100%',
      m: 0
    }
  }),
  menuCategory: theme => ({
    width: '40%',
    maxHeight: '520px',

    [theme.breakpoints.down('sm')]: {
      width: '100%',
      m: 0
    }
  }),
  footer: theme => ({
    display: 'flex',
    flexDirection: 'column',
    mt: theme.spacing(2)
  }),
  sum: theme => ({
    display: 'flex',
    justifyContent: 'space-between',
    m: theme.spacing(2, 0)
  }),
  sale: theme => ({
    display: 'flex',
    justifyContent: 'space-between',
    m: theme.spacing(1, 0)
  }),
  saleInput: {
    width: '100px'
  }
};

export default styles;
