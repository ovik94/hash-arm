import { makeStyles, Theme, createStyles, lighten } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    width: '100%'
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2)
  },
  table: {
    minWidth: 750
  },
  count: {
    '& input': {
      padding: theme.spacing(1)
    }
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1
  },
  toolbar: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1)
  },
  highlight: {
    display: 'flex',
    color: theme.palette.secondary.main,
    backgroundColor: lighten(theme.palette.secondary.light, 0.85)
  },
  toolbarTitle: {
    marginRight: theme.spacing(2)
  },
  searchInput: {
    flexGrow: 5
  },
  button: {
    marginRight: theme.spacing(2)
  }
}));

export default useStyles;
