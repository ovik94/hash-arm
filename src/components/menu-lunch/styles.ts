import { Theme } from "@mui/material/styles";
import { SxProps } from "@mui/material";

const styles: Record<string, SxProps<Theme>> = {
  wrapper: {
    "& embed": {
      width: "100%",
      height: "calc(100vh - 130px)",
      border: "none",
    },
  },
  alert: {
    mb: 2,
  },
};

export default styles;
