import React, { FC, useCallback } from 'react';
import { observer } from 'mobx-react-lite';
import { List, ListItem, ListItemText } from '@mui/material';
import useLocale from '../../hooks/useLocale';
import Locale from './locale';
import { useHistory, useRouteMatch } from "react-router-dom";
import styles from "./styles";
import { SystemStyleObject } from "@mui/system/styleFunctionSx/styleFunctionSx";
import { Theme } from "@mui/material/styles";

interface IMenuItem {
  title: string;
  path: string;
}

interface IMainMenuProps {
  setTitleTopMenu: (value: string) => void;
  setOpen: (value: boolean) => void;
}

const MainMenu: FC<IMainMenuProps> = ({ setTitleTopMenu, setOpen }) =>  {
  const locale = useLocale(Locale);
  const history = useHistory();

  const onClickItem = useCallback((item: IMenuItem) => {
    history.push(item.path);
    setTitleTopMenu(item.title);
    setOpen(false);
  }, [history]);

  const getListItemStyle = (path: string) => {
    const match = useRouteMatch({ path });

    return match && match.isExact ? styles.selected : {} as SystemStyleObject<Theme>;
  }

  return (
    <List component="nav" sx={styles.list}>
      {locale.menu.map((item: IMenuItem) => (
        <div key={item.title}>
          <ListItem
            button
            disableRipple
            onClick={() => onClickItem(item)}
            sx={getListItemStyle(item.path)}
          >
            <ListItemText>
              <div dangerouslySetInnerHTML={{ __html: item.title }}/>
            </ListItemText>
          </ListItem>
        </div>
      ))}
    </List>
  );
};

export default observer<IMainMenuProps>(MainMenu);
