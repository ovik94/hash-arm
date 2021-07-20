import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) => createStyles({
  wrapper: {
    position: 'absolute',
    width: '100%',
    height: '100%'
  },
  progress: {
    position: 'absolute',
    top: 'calc(50% - 20px)',
    left: 'calc(50% - 20px)',
    zIndex: 1
  }
}));

export default useStyles;
