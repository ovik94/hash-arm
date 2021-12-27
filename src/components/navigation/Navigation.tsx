import React, { FC, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Drawer, Divider } from '@mui/material';
import MainMenu from './MainMenu';
import TopMenu from './TopMenu';
import styles from './styles';
import getSxProp from '../utils/getSxProp';
import useLocale from '../../hooks/useLocale';

const Navigation: FC = ({ children }) => {
  const [open, setOpen] = useState(false);
  const locale = useLocale();
  const [titleTopMenu, setTitleTopMenu] = useState<string>(locale.title);

  return (
    <>
      <TopMenu setOpen={setOpen} open={open} title={titleTopMenu} />
      {children}
      <Drawer
        variant="persistent"
        sx={open ?
          theme => ({ ...getSxProp(styles.drawerPaper, theme) }) :
          styles.drawerPaperClose}
        open={open}
        anchor="left"
      >
        <Divider />
        <MainMenu setTitleTopMenu={setTitleTopMenu} setOpen={setOpen} />
      </Drawer>
    </>
  );
};

export default observer(Navigation);
