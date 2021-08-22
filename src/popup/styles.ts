import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) => createStyles({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: '0px 6px 10px rgba(0, 0, 0, 0.14), 0px 1px 18px rgba(0, 0, 0, 0.12), 0px 3px 5px rgba(0, 0, 0, 0.2)',
    padding: theme.spacing(9),
    position: 'relative'
  },
  small: {
    width: '530px'
  },
  medium: {
    width: '630px'
  },
  large: {
    width: '730px'
  },
  close: {
    position: 'absolute',
    right: theme.spacing(3),
    top: theme.spacing(3)
  }
}));

export default useStyles;
