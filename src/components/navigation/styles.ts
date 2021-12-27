import { Theme } from '@mui/material/styles';
import { SxProps } from '@mui/material';

const DRAWER_WIDTH = 240;

const styles: Record<string, SxProps<Theme>> = {
  toolbar: {
    paddingRight: 24 // keep right padding when drawer closed
  },
  appBar: theme => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  }),
  appBarShift: theme => ({
    marginLeft: DRAWER_WIDTH,
    width: `calc(100% - ${DRAWER_WIDTH}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  }),
  userInfo: theme => ({
    display: 'flex',
    alignItems: 'center',
    height: '56px',
    paddingLeft: theme.spacing(2)
  }),
  list: theme => ({
    p: theme.spacing(5, 0)
  }),
  menuButton: {
    marginRight: 36
  },
  menuButtonHidden: {
    display: 'none'
  },
  title: {
    flexGrow: 1
  },
  operatorName: theme => ({
    marginLeft: theme.spacing(1),
    flexGrow: 0
  }),
  drawerPaper: theme => ({
    marginTop: theme.spacing(8),
    position: 'relative',
    whiteSpace: 'nowrap',
    width: DRAWER_WIDTH,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  }),
  drawerPaperClose: theme => ({
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9)
    }
  }),
  selected: theme => ({
    borderRight: `4px solid ${theme.palette.primary.light}`,
    background: theme.palette.action.hover
  })
};

export default styles;
