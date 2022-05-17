import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { red } from "@mui/material/colors";
import Avatar from "@mui/material/Avatar";
import Paper from "@mui/material/Paper";
import formatDate from "../../../utils/formatDate";



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
  const height = info.height
  const weight = info.weight
  const age = info.age



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
      <Grid container>
        <Grid item xs={12} sx={{paddingBottom: '1.5rem'}}>
          <Avatar
            sx={{ bgcolor: '#c29bff', width: 56, height: 56 }}
            aria-label="recipe"
          >
            {concatname[0]}
          </Avatar>
        </Grid>
        <Grid item xs={12} sm>
          <Typography
            variant="header2"
            gutterBottom
            style={{ fontWeight: "bold" }}
          >
            {concatname}
          </Typography>
          <Typography variant="body2">Birthday: {birthday}</Typography>
          <Typography variant="body2" sx={{paddingBottom: '15px'}}>Gender: {gender}</Typography>
          <Typography variant="header1" sx={{ fontWeight: "bold", paddingTop: '5px' }}>
            Contact
          </Typography>
          <Typography variant="body2">{email}</Typography>
          <Typography variant="body2" sx={{paddingBottom: '15px'}}>Phone: {phone} <br /> City: {city}</Typography>
          <Typography variant="header1" style={{ fontWeight: "bold" }}>
            Info
          </Typography>
          <Typography
            variant="body2"
            sx={{ textAlign: "left", fontSize: '14px' }}
          >
            Height: {height} in
            <br />
            Weight: {weight} lb 
            <br />
            Gender: {gender}
            <br />
            {/* Age: {age}
            <br /> */}
            Phone: {phone}
            <br />
            Birthday: {birthday}
          </Typography>
        </Grid>
      </Grid>
    </Paper>
  );
}
