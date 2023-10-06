import { SxProps } from '@mui/material';
import { Theme } from '@mui/material/styles';

const styles: Record<string, SxProps<Theme>> = {
  order: {
    display: 'flex',
    justifyContent: 'space-between',
    mt: 3
  },
  menuCategory: {
    width: '40%',
    maxHeight: '520px'
  },
  orderList: {
    width: '60%',
    position: 'relative',
    ml: 4,
    p: 2
  },
  item: {
    display: 'flex',
    alignItems: 'center'
  },
  counter: {
    display: 'flex',
    alignItems: 'center',
    my: 0,
    mx: 1
  },
  positionItem: {
    my: 2,
    mx: 0
  },
  itemTitle: {
    flexGrow: 4
  },
  itemPrice: {
    mr: 3
  },
  itemCount: {
    my: 0,
    mx: 0,
    textWrap: 'nowrap'
  },
  menuType: {
    mb: 2
  }
};

export default styles;
