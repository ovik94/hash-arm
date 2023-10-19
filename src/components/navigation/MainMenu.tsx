import React, { FC, useCallback } from 'react';
import { observer } from 'mobx-react-lite';
import { List, ListItem, ListItemText } from '@mui/material';
import { useHistory, useRouteMatch } from 'react-router-dom';
import { SystemStyleObject } from '@mui/system/styleFunctionSx/styleFunctionSx';
import { Theme } from '@mui/material/styles';
import useLocale from '../../hooks/useLocale';
import Locale from './locale';
import styles from './styles';
import useStore from '../../hooks/useStore';
import { PrivilegeType } from '../../store/UserStore';

interface IMenuItem {
  title: string;
  path: string;
  privilege?: PrivilegeType;
}

interface IMainMenuProps {
  setTitleTopMenu: (value: string) => void;
  setOpen: (value: boolean) => void;
}

const MainMenu: FC<IMainMenuProps> = ({ setTitleTopMenu, setOpen }) => {
  const locale = useLocale(Locale);
  const { userStore } = useStore();
  const history = useHistory();

  const onClickItem = useCallback((item: IMenuItem) => {
    history.push(item.path);
    setTitleTopMenu(item.title);
    setOpen(false);
  }, [history]);

  const getListItemStyle = (path: string) => {
    const match = useRouteMatch({ path });

    return match && match.isExact ? styles.selected : {} as SystemStyleObject<Theme>;
  };

  return (
    <List component="nav" sx={styles.list}>
      {locale.menu
        .filter((menuItem: IMenuItem) => (menuItem.privilege ? userStore.user.privilege.includes(menuItem.privilege) : true))
        .map((item: IMenuItem) => (
          <div key={item.title}>
            <ListItem
              button
              disableRipple
              onClick={() => onClickItem(item)}
              sx={getListItemStyle(item.path)}
            >
              <ListItemText>
                <div dangerouslySetInnerHTML={{ __html: item.title }} />
              </ListItemText>
            </ListItem>
          </div>
        ))}
    </List>
  );
};

export default observer<IMainMenuProps>(MainMenu);
