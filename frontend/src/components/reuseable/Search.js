// Search.js

import { styled, alpha } from '@mui/material/styles';

var Search = null;

export default Search = styled("div")(({ theme }) => ({
    position: "absolute",
    right: 15,
    left: 10,
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 10,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  }));