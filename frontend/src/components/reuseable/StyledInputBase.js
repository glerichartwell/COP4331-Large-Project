// StyledInputBase.js

import { InputBase } from "@mui/material";
import { styled, alpha } from '@mui/material/styles';

var StyledInputBase = null;

export default StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: "inherit",
    "& .MuiInputBase-input": {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create("width"),
      width: "100%",
      [theme.breakpoints.up("sm")]: {
        width: "15vw",
        "&:focus": {
          width: "20ch",
        },
      },
    },
  }));