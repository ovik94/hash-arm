import { useCallback, useEffect, useMemo, useState } from "react";
import { observer } from "mobx-react";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Container,
  Grid,
  IconButton,
  Stack,
  SxProps,
  Typography,
} from "@mui/material";
import { Theme } from "@mui/material/styles";
import { ChevronLeft } from "@mui/icons-material";
import useTitle from "../hooks/useTitle";
import useLocale from "../hooks/useLocale";
import useStore from "../hooks/useStore";
import Loader from "../components/loader/Loader";
import MenuItems from "../components/menu-items/MenuItems";

const styles: Record<string, SxProps<Theme>> = {
  wrapper: {
    py: { xs: 2, sm: 3 },
  },
  card: {
    height: { xs: "140px", sm: "240px" },
  },
};

const Locale = {
  title: "Меню",
};

const MENU_LIST_IMAGES: Record<string, string> = {
  "36012": "public/images/main-menu.jpg",
  "36014": "public/images/child-menu.jpg",
  "36013": "public/images/banquet-menu.jpg",
  "36015": "public/images/semi-finished-menu.jpg",
};

const Menu = () => {
  const locale = useLocale(Locale);
  useTitle(locale.title);

  const {
    menuStore: { fetchMenuList, menuList },
    isLoading,
  } = useStore();

  const [menuGroup, setMenuGroup] = useState("");

  useEffect(() => {
    if (!menuList) {
      fetchMenuList();
    }
  }, [menuList, menuGroup]);

  const onChangeMenuGroup = useCallback((id: string) => {
    setMenuGroup(id);
  }, []);

  const renderMenuList = useMemo(() => {
    if (!menuList) {
      return;
    }

    return (
      <Grid container spacing={2} my={2}>
        {menuList.map((menu) => (
          <Grid key={menu.id} item xs={12} sm={6}>
            <Card onClick={() => onChangeMenuGroup(menu.id)}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  sx={styles.card}
                  image={MENU_LIST_IMAGES[menu.id]}
                  alt="green iguana"
                />
                <CardContent>
                  <Typography gutterBottom variant="h2" component="div">
                    {menu.name}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    );
  }, [menuList, menuGroup, onChangeMenuGroup]);

  const title = useMemo(() => {
    if (!menuGroup) {
      return locale.title;
    }

    const menu = menuList?.find((item) => item.id === menuGroup);
    return menu ? menu.name : locale.title;
  }, [menuList, menuGroup]);

  const onBack = useCallback(() => {
    onChangeMenuGroup("");
  }, []);

  return (
    <Container component="main" maxWidth="lg" sx={styles.wrapper}>
      <Loader isLoading={isLoading} />
      <Stack direction="row" alignItems="center" mb={2}>
        {menuGroup && (
          <IconButton color="primary" onClick={onBack}>
            <ChevronLeft />
          </IconButton>
        )}
        <Typography variant="h3">{title}</Typography>
      </Stack>

      {!menuGroup && renderMenuList}
      {menuGroup && <MenuItems menuId={menuGroup} />}
    </Container>
  );
};

export default observer(Menu);
