import { AlertColor } from '@mui/material';
import { SxProps, Theme } from '@mui/material/styles';

const styles = (props: { type: AlertColor } = { type: 'success' }): Record<string, SxProps<Theme>> => ({
  alert: {
    my: 2,
    backgroundColor: theme => theme.palette[props.type].light,
    color: theme => theme.palette[props.type].main,

    '& .MuiSvgIcon-root': {
      fill: theme => theme.palette[props.type].main
    }
  }
});

export default styles;
