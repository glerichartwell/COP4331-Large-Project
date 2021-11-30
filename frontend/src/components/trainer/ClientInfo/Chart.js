import Chart from "react-google-charts";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import EditIcon from "@mui/icons-material/Edit";
import React, { useState, useEffect } from "react";
import IconButton from "@material-ui/core/IconButton";
import TextField from "@mui/material/TextField";
import CloseIcon from "@mui/icons-material/Close";
import Dialog from "@mui/material/Dialog";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

export default function Charts() {
  const carb = 13;
  const fat = 10;
  const protein = 15;
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Paper
      sx={{
        p: 2,
        margin: "4px 0px 0px 4px",
        width: 250,
        height: 250,
        flexGrow: 1,
        borderColor: "gray",
      }}
      variant="outlined"
    >
      <Grid container spacing={1} direction="row">
        <Grid item xs={10.5} container>
          <Chart
            width={"250px"}
            height={"200px"}
            chartType="PieChart"
            loader={<div>Loading Chart</div>}
            data={[
              ["Task", "Hours per Day"],
              ["Carbs", carb],
              ["Fat", fat],
              ["Protein", protein],
            ]}
            options={{
              title: "Macromolecule Ratio",
            }}
            rootProps={{ "data-testid": "1" }}
          />
        </Grid>
        <div>
          <EditIcon onClick={handleClickOpen} />
        </div>
      </Grid>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle sx={{ m: 0, p: 2 }}>
          Edit Macro Goals
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={1} direction="row">
            <Grid item xs={10.5} container spacing={2}>
              <Grid item>
                <TextField
                  id="standard-helperText"
                  label="Fat"
                  defaultValue={fat}
                  variant="standard"
                />
              </Grid>
              <Grid item>
                <TextField
                  id="standard-helperText"
                  label="Carbs"
                  defaultValue={carb}
                  variant="standard"
                />
              </Grid>
              <Grid item>
                <TextField
                  id="standard-helperText"
                  label="Protein"
                  defaultValue={protein}
                  variant="standard"
                />
              </Grid>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </Paper>
  );
}
