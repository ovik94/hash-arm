import React, { FC } from 'react';
import { Box } from '@mui/material';

interface TabContentProps {
  children: React.ReactNode;
  index: any;
  value: number;
}

const TabContent: FC<TabContentProps> = (props: TabContentProps) => {
  const { children, value, index, ...other } = props;

  return (
    <div hidden={value !== index} {...other}>
      {value === index && (
        <Box p={3}>{children}</Box>
      )}
    </div>
  );
};

export default TabContent;
