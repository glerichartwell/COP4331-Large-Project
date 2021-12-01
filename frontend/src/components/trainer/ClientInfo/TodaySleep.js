import * as React from "react";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";

const bull = (
  <Box
    component="span"
    sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
  >
    •
  </Box>
);
const normaltext = {
  fontSize: "12px",
};

const dangar = {
  color: "red",
  fontSize: "12px",
};

/**
<CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
 */

export default function BasicCard({info, todaySleepRating}) {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClickii = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const openi = Boolean(anchorEl);
  const id = openi ? "simple-popover" : undefined;

  const handleChange = (newValue) => {
    setValueii(newValue);
  };

  const [rating, setValue] = React.useState(2);

  const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

  const [value, setValueii] = React.useState(new Date("2014-08-18T21:11:54"));
  return (
    <Paper
      sx={{
        p: 2,
        margin: "4px 0px 0px 4px",
        width: 250,
        height: 150,
        flexGrow: 1,
        borderColor: "gray",
      }}
      variant="outlined"
    >
      <Typography variant="header2" gutterBottom style={{ fontWeight: "bold" }}>
        Today's Sleep
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}></Grid>

        <Grid item xs container direction="column" spacing={1}>
          <Rating
            name="size-large"
            size="large"
            sx={{ position: 'absolute', fontSize: "42 vh", left: "15%", top: "50%" }}
            value={todaySleepRating}

            readOnly
          />
          <Grid item xs={12}></Grid>
          <Grid item xs={12}></Grid>
        </Grid>

        <Grid item xs>
          <br />
        </Grid>
      </Grid>
    </Paper>
  );
}
