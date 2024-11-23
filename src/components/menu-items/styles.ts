import { Theme } from "@mui/material/styles";
import { SxProps } from "@mui/material";

const styles: Record<string, SxProps<Theme>> = {
  menuList: {
    gap: "8px",
    ml: { xs: -2, sm: 0 },
    mr: { xs: -2, sm: 0 },
    overflowX: { xs: "scroll", sm: "unset" },

    "-ms-overflow-style": "none",
    scrollbarWidth: "none",

    "&::-webkit-scrollbar": {
      display: "none",
    },

    "& .MuiChip-root:first-child": {
      ml: { xs: 2, sm: 0 },
    },

    "& .MuiChip-root:last-child": {
      mr: { xs: 2, sm: 0 },
    },
  },
};

export default styles;
