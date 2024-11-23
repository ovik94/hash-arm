import { FC } from "react";
import { Box, Stack, Typography } from "@mui/material";
import { IMenuGroupItem } from "/src/store/MenuStore";
import styles from "./styles";

const MenuCard: FC<IMenuGroupItem> = ({
  name,
  description,
  image,
  price,
  size,
}) => {
  return (
    <Box sx={styles.card}>
      <Box sx={styles.cardImage}>
        <img src={image || "public/images/empty-menu.png"} />
      </Box>

      <Box sx={styles.cardContent}>
        <Typography gutterBottom variant="h3" component="div">
          {name}
        </Typography>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          {description}
        </Typography>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={styles.bottomBlock}
        >
          <Typography variant="caption" sx={{ color: "text.secondary" }}>
            {`${size.weight} ${size.sizeName}`}
          </Typography>
          <Typography variant="h6" sx={styles.price}>
            {price}
          </Typography>
        </Stack>
      </Box>
    </Box>
  );
};

export default MenuCard;
