import { FC, useEffect, useMemo, useState } from "react";
import { observer } from "mobx-react-lite";
import { Box, Chip, Grid, Stack } from "@mui/material";

import styles from "./styles";
import useStore from "/src/hooks/useStore";
import MenuCard from "../menu-card/MenuCard";

interface IMenuItemsProps {
  menuId: string;
}

const MenuItems: FC<IMenuItemsProps> = ({ menuId }) => {
  const {
    menuStore: { fetchMenu, menu },
  } = useStore();

  const [menuCategoryId, setMenuCategoryId] = useState("");

  const menuById = useMemo(() => menu[menuId], [menu, menuId]);

  const menuCategoryItems = useMemo(
    () =>
      menuById
        ? menuById.find((menuItem) => menuItem.id === menuCategoryId)
        : null,
    [menuById, menuCategoryId]
  );

  const renderMenuItem = useMemo(() => {
    if (!menuCategoryId || !menuCategoryItems) {
      return;
    }

    return (
      <Grid container spacing={2} my={2}>
        {menuCategoryItems.items.map((menuItem) => (
          <Grid key={menuItem.name} item xs={12} sm={3}>
            <MenuCard {...menuItem} />
          </Grid>
        ))}
      </Grid>
    );
  }, [menuCategoryItems, menuCategoryId]);

  const renderMenuCategory = useMemo(() => {
    if (!menuById || menuById.length <= 1) {
      return;
    }

    return (
      <Stack direction="row" sx={styles.menuList} mt={2}>
        {menuById.map((menuItem) => (
          <Chip
            label={menuItem.name}
            onClick={() => setMenuCategoryId(menuItem.id)}
            variant={menuItem.id === menuCategoryId ? "filled" : "outlined"}
            color="secondary"
          />
        ))}
      </Stack>
    );
  }, [menuCategoryId, menuById]);

  useEffect(() => {
    if (menu && !menu[menuId]) {
      fetchMenu(menuId);
    }
  }, [menuId, menu]);

  useEffect(() => {
    if (menuById) {
      setMenuCategoryId(menuById[0].id);
    }
  }, [menuById]);

  return (
    <Box>
      {renderMenuCategory}
      {renderMenuItem}
    </Box>
  );
};

export default observer<IMenuItemsProps>(MenuItems);
