import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) => createStyles({
  toolbar: {
    minHeight: '56px',
    padding: 0
  },
  appBar: {
    marginBottom: '48px',
    height: '56px'
  },
  armName: {
    padding: theme.spacing(2),
    fontWeight: 500,
    fontSize: '15px',
    lineHeight: '24px',
    letterSpacing: '-0.2px',
    color: '#FFFFFF'
  },
  buttonGroup: {
    display: 'flex',
    height: '56px',
    flexGrow: 1
  },
  buttonBlock: {
    display: 'flex'
  },
  button: {
    fontSize: '14px',
    fontWeight: 500,
    lineHeight: '16px',
    letterSpacing: '0.75px',
    padding: theme.spacing(2)
  },
  userInfo: {
    display: 'flex',
    alignItems: 'center',
    height: '56px',
    paddingLeft: theme.spacing(2)
  },
  userName: {
    margin: theme.spacing(0, 1),
    color: '#FFFFFF'
  }
}));

export default useStyles;
