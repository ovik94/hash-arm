import { makeStyles, createStyles } from '@mui/styles';

const useStyles = makeStyles(() => createStyles({
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
