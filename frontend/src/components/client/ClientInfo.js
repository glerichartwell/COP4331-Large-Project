import { useState } from "react";

import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { purple, red } from "@mui/material/colors";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
// Custom Components
import ClientButton from "./ClientButton.js";
import Navbar from "./Navbar.js";
import MacroEditBox from "./MacroEditBox.js";



const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));
const styling = {
  fontWeight: "bold",
  textAlign: "left",
};


const ClientInfo = ({info}) => {
  

  const firstName = info.firstName
  const middleName = info.middleName
  const lastName = info.lastName
  const phone = info.phone
  const concatheader = firstName + " " + middleName + " " + lastName
  const email = info.email

  const carb = 33;
  const fat = 33;
  const protein = 33;
  const macroinfo = {
    fat: fat,
    protein: protein,
    carb: carb,
  }

  

  
  return (
    <div>
      <Grid container direction='column' >
        <Grid container direction='row'>
          <Grid item sm={12} sx={{display: 'flex', marginBottom: '20px'}}>
            <Avatar sx={{ bgcolor: '#c29bff' }} aria-label="recipe">
              {firstName[0]}
            </Avatar>
            <Typography variant="body2" sx={{marginLeft: '20px', marginTop: '10px', fontSize: 20}} gutterBottom>
              {concatheader}
            </Typography>
          </Grid>
        </Grid>
        <Grid container direction='row'>
          <Navbar info={info}/>
        </Grid>
      </Grid>
    {/* <Avatar sx={{ bgcolor: '#c29bff' }} aria-label="recipe">
      A
    </Avatar>
    <Typography variant="body2" gutterBottom>
      {concatheader}
    </Typography>
    <Typography variant="body2" color="text.secondary">
      {email}
    </Typography>
    <Navbar /> */}
    </div>
  );
}

export default ClientInfo
