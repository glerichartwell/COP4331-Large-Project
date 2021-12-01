import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { red } from "@mui/material/colors";
import Avatar from "@mui/material/Avatar";
import Paper from "@mui/material/Paper";
import formatDate from "../../utils/formatDate";



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

export default function BasicCard({info}) {
  
  const firstName = info.firstName
  const middleName = info.middleName
  const lastName = info.lastName
  const phone = info.phone
  const concatname = firstName + " " + middleName + " " + lastName;
  const email = info.email
  const birthday = formatDate(info.birthday)
  const gender = info.gender
  const city = info.city



  return (
    <Paper
      sx={{
        p: 2,
        margin: "4px 0px 0px 4px",
        flexGrow: 1,
        borderColor: "gray",
      }}
      variant="outlined"
    >
      <Grid container spacing={-4}>
        <Grid item xs>
          <Avatar
            sx={{ bgcolor: '#c29bff', width: 56, height: 56 }}
            aria-label="recipe"
          >
            A
          </Avatar>
        </Grid>
        <Grid item xs={6} sm container sx={{marginTop: '60px', marginLeft: '-120px'}}>
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
              <Typography variant="body2">Phone: {phone}</Typography>
              <br />
              <Typography variant="header1" style={{ fontWeight: "bold" }}>
                City
              </Typography>
              <Typography variant="body2">
                {city}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
}
