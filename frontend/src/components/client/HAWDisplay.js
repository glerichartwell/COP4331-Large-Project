import { useState } from "react";
import { styled } from "@mui/material/styles";

import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { Card } from "@mui/material";
import { Box } from "@mui/system";

export default function HAWDisplay() {
  const [expanded, setExpanded] = useState(false);
  const [rating, setValue] = useState(2);
  const [open, setOpen] = useState(true);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleClick = () => {
    setOpen(!open);
  };

  // stuff
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClickii = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const openPopoverMenu = Boolean(anchorEl);
  // const id = openPopoverMenu ? "simple-popover" : undefined;

  const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));

  return (
    <Grid
      container
      className="outerContainer"
      spacing={1}
      paddingTop="1%"
      direction="row"
      justify="flex-start"
      alignItems="flex-start"
      alignContent="stretch"
      wrap="wrap"
    >
      <Grid item xs={6}>
        <Box
          sx={{
            width: "37vw",
            height: "30vh",
            backgroundColor: "lightgrey",
            "&:hover": {
              backgroundColor: "grey",
              opacity: [0.9, 0.8, 0.7],
            },
          }}
        >
          Sleep component
        </Box>
      </Grid>

      <Grid item xs={6}>
        <Box
          sx={{
            width: "37vw",
            height: "30vh",
            backgroundColor: "lightgrey",
            "&:hover": {
              backgroundColor: "grey",
              opacity: [0.9, 0.8, 0.7],
            },
          }}
        >
          Mood component
        </Box>
      </Grid>

      <Grid item xs={12}>
        <Box
          sx={{
            width: "74.8vw",
            height: "40vh",
            alignContent: "center",
            backgroundColor: "lightgrey",
            "&:hover": {
              backgroundColor: "grey",
              opacity: [0.9, 0.8, 0.7],
            },
          }}
        >
          Macros Component
        </Box>
      </Grid>
    </Grid>
  );
}
