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
import { DesktopDatePicker, LocalizationProvider } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import "./css/Chart.css"

const Charts = ({displayMacroEdit, macros}) => {
  const [date, setDate] = useState()
  const [open, setOpen] = useState(false);
  var carbs = 0;
  var fats = 0;
  var proteins = 0;
  var info;
  if (macros)
  {
      fats =  parseInt(macros.fats);
      proteins = parseInt(macros.proteins);
      carbs = parseInt(macros.carbs);
  }
  
  
  console.log("Macros: ", fats, proteins, carbs)


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
              ["Carbs", carbs],
              ["Fat", fats],
              ["Protein", proteins],
            ]}
            options={{
              title: "Macro Goals",
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