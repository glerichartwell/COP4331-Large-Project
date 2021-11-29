import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { red } from "@mui/material/colors";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
// Custom Components
import ClientButton from "./ClientButton.js";
import Navbar from "./Navbar.js";

const firstName = "Anit ";
const middleName = " A ";
const lastName = " Bath ";
const phone = "(123) 451-1337";
const concatheader = firstName + " " + middleName + " " + lastName + "" + phone;
const email = "bootnob@aol.com";

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

export default function BasicGrid() {
  return (
    <Paper sx={{ p: 2, margin: "4px 0px 0px 4px", maxWidth: 850, flexGrow: 1 }}>
      <Grid container spacing={2} xs={12}>
        <Grid item>
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            A
          </Avatar>
        </Grid>
        <Grid item xs={2} sm container>
          <Grid item xs container direction="column" spacing={2}>
            <Grid item xs>
              <Typography variant="body2" gutterBottom>
                {concatheader}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {email}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <ClientButton />
        </Grid>
        <Grid item>
          <Navbar />
        </Grid>
      </Grid>
    </Paper>
  );
}
