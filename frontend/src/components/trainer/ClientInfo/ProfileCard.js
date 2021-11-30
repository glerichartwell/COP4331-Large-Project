import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { red } from "@mui/material/colors";
import Avatar from "@mui/material/Avatar";
import Paper from "@mui/material/Paper";

const firstName = "Anit ";
const middleName = " A ";
const lastName = " Bath ";
const phone = "(123) 451-1337";
const concatname = firstName + " " + middleName + " " + lastName;
const email = "bootnob@aol.com";
const birthday = "Feb 20, 1992";
const gender = "Fluid";
const street = "1984 Elm Street";
const city = "Springwood";
const state = "Ohio";
const zippy = 45011;

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

export default function BasicCard() {
  return (
    <Paper
      sx={{
        p: 2,
        margin: "4px 0px 0px 4px",
        width: 275,
        height: 305,
        flexGrow: 1,
        borderColor: "gray",
      }}
      variant="outlined"
    >
      <Grid container spacing={-4}>
        <Grid item xs>
          <Avatar
            sx={{ bgcolor: red[500], width: 56, height: 56 }}
            aria-label="recipe"
          >
            A
          </Avatar>
        </Grid>
        <Grid item xs={6} sm container>
          <Grid item xs container direction="column" spacing={1}>
            <Grid item xs>
              <Typography
                variant="header2"
                gutterBottom
                style={{ fontWeight: "bold" }}
              >
                {concatname}
              </Typography>
              <Typography variant="body2">{birthday}</Typography>
              <Typography variant="body2">Gender: {gender}</Typography>
              <br />
              <Typography variant="header1" style={{ fontWeight: "bold" }}>
                Contact
              </Typography>
              <Typography variant="body2">{email}</Typography>
              <Typography variant="body2">Cell: {phone}</Typography>
              <br />
              <Typography variant="header1" style={{ fontWeight: "bold" }}>
                Address
              </Typography>
              <Typography variant="body2">{street}</Typography>
              <Typography variant="body2">
                {city},{state} {zippy}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
}
