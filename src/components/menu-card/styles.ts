import { Theme } from "@mui/material/styles";
import { SxProps } from "@mui/material";

const styles: Record<string, SxProps<Theme>> = {
  card: {
    display: "flex",
    flexDirection: "column",
    background: "white",
    height: "100%",
    borderRadius: "8px",
    boxShadow:
      "0px 2px 8px 0px rgba(44, 46, 51, .08), 0px 1px 1px 0px rgba(44, 46, 51, .04);",
  },
  cardImage: {
    height: { xs: "140px", sm: "240px" },
    backgroundColor: "#F5F4F2",

    "& img": {
      width: "100%",
      height: "100%",
      borderRadius: "8px",
      borderBottomLeftRadius: "unset",
      borderBottomRightRadius: "unset",
      objectFit: "cover",
    },
  },

  cardContent: {
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
    padding: "16px",
  },
  bottomBlock: {
    alignItems: "end",
    flexGrow: 1,
  },
  price: {
    color: (theme: Theme) => theme.palette.primary.main,
  },
};

export default styles;
