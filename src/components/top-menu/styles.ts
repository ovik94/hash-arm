import { makeStyles, createStyles } from '@mui/styles';
import { Theme } from '@mui/material/styles';

const useStyles = makeStyles((theme: Theme) => createStyles({
  buttonGroup: {
    display: 'flex',
    height: '56px',
    flexGrow: 1
  },
  buttonBlock: {
    display: 'flex'
  },
  userInfo: {
    display: 'flex',
    alignItems: 'center',
    height: '56px',
    paddingLeft: theme.spacing(2)
  }
}));

export default useStyles;
