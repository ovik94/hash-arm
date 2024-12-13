import { FC, useEffect, useMemo } from "react";
import { observer } from "mobx-react-lite";
import { Alert, Box, Typography } from "@mui/material";

import styles from "./styles";
import useStore from "/src/hooks/useStore";

const LUNCH_MENU_SRC: Record<number, string> = {
  1: "https://drive.google.com/file/d/1ETC9f_Ees9LqyTSKrBfgAYraZFjF2HDJ/preview?usp=sharing",
  2: "https://drive.google.com/file/d/1kMuw12icCYEGJ4BcKAl3xPF5JJt2U_OJ/preview?usp=sharing",
  3: "https://drive.google.com/file/d/1MnbeDP38ED1FmcbHOi8mTccjCaYLENl_/preview?usp=sharing",
  4: "https://drive.google.com/file/d/1CIZdPl7Wr9wWHVwDy98nw327_F2J0NKA/preview?usp=sharing",
};

const MenuLunch: FC = () => {
  const {
    menuStore: { getLunchWeek, lunchWeek },
  } = useStore();

  useEffect(() => {
    console.log(lunchWeek, "lunchWeek");
    if (!lunchWeek) {
      getLunchWeek();
    }
  }, [lunchWeek]);

  const weekNumber = useMemo(() => {
    if (lunchWeek && !lunchWeek.isHoliday) {
      return lunchWeek.weekNumber;
    }

    if (lunchWeek?.weekNumber) {
      return lunchWeek?.weekNumber === 4 ? 1 : lunchWeek?.weekNumber + 1;
    }

    return null;
  }, [lunchWeek]);

  if (!lunchWeek) {
    return null;
  }

  return (
    <Box sx={styles.wrapper}>
      {!lunchWeek.isHoliday && (
        <Typography variant="body1" mb={2}>
          Меню бизнес-ланча на эту неделю
        </Typography>
      )}

      {lunchWeek.isHoliday && (
        <Box sx={styles.alert}>
          <Alert variant="filled" severity="warning">
            Сегодня выходной день. Можете посмотреть меню на следующую неделю
          </Alert>
        </Box>
      )}

      {weekNumber && <embed src={LUNCH_MENU_SRC[weekNumber]} />}
    </Box>
  );
};

export default observer<{}>(MenuLunch);
