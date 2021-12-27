import { Theme } from '@mui/material/styles';
import { SxProps } from '@mui/system';
import { SystemStyleObject } from '@mui/system/styleFunctionSx/styleFunctionSx';

const getSxProp = (prop: SxProps<Theme> | SystemStyleObject<Theme>, theme: Theme): SystemStyleObject<Theme> => {
  if (typeof prop === 'function') {
    return prop(theme);
  }

  return prop as SystemStyleObject<Theme>;
};

export default getSxProp;
