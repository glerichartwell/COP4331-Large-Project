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
import { Box } from "@mui/system";
import "./css/Chart.css"

const Charts = ({displayMacroEdit}) => {

  const [open, setOpen] = useState(false);
  const carb = 33;
  const fat = 33;
  const protein = 33;
  const info = {
    fat: fat,
    protein: protein,
    carb: carb,
  }
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
        position: 'relative',
        margin: "4px 0px 0px 4px",
        flexGrow: 1,
        borderColor: "gray",
      }}
      variant="outlined"
    >
    <Box sx={{display: 'flex', position: 'absolute', bottom: 30, left: 50 }}>
      <Chart
            width={"300px"}
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
    </Box>
    <Box sx={{display: 'flex', position: 'absolute', top: 5, right: 10, }}>
      <Button className='edit-btn' variant='text' onClick={displayMacroEdit}>
        <EditIcon />
      </Button>
    </Box>
        
    </Paper>
  );
}

export default Charts