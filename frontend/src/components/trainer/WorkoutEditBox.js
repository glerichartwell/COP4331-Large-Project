import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import Radio from "@mui/material/Radio";
import Button from "@mui/material/Button";
import { Box, Grid } from "@mui/material";
import Slider from "@mui/material/Slider";
import TextField from "@mui/material/TextField";
import { FormControlLabel } from "@mui/material";
import RadioGroup from "@mui/material/RadioGroup";
import DialogActions from "@mui/material/DialogActions";
import { DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { InputAdornment } from "@mui/material";

const WorkoutEditBox = ({ closeEditBox, info, returningInfo }) => {
  const [showEdit, setShowEdit] = useState(true);
  const [buttonName, setButtonName] = useState("Change");
  const [confirmClick, setConfirmClick] = useState(0);
  const [message, setMessage] = useState("");
  const [workoutName, setWorkoutName] = useState();
  const [date, setDate] = useState();
  const [timeToComplete, setTimeToComplete] = useState();
  const [numExercises, setNumExercises] = useState();
  const [id, setID] = useState(info.id);


  //add ability to add exercises in here


  const confirm = () => {
    closeEditBox(info);
  };

  const EditWorkout = async (event) => {

    var obj = {

      id : id, 
      workoutName: workoutName,
      date: date,
      timeToComplete: timeToComplete,
      numExercises: numExercises,

    };
    console.log(id);
    var js = JSON.stringify(obj);
    try {
      const response = await fetch("http://localhost:5000/api/edit-workout", {
        method: "PATCH",
        body: js,
        headers: { "Content-Type": "application/json" },
      });
      setMessage("Workout Edited");

      var txt = await response.text();
      var res = JSON.parse(txt);

      if (res.error.length > 0) {
        console.log(res.error);
        setMessage(res.error);
      }
    } catch (error) {
      setMessage(error);
      console.log(error);
    }
  };

  const changingFunction = () => {
    setButtonName("Confirm");
    console.log(info.id);

    if (confirmClick) {
      EditWorkout();
      closeEditBox();
    }
    setConfirmClick(true);
  };


  return (
    <div>
      <Dialog
        open={showEdit}
        fullWidth={true}
        maxWidth="xs"
        onBackdropClick={() => {
          closeEditBox();
        }}
      >
        <DialogContent>
          <DialogTitle textAlign="center">
            {info.type}: {info.name}
          </DialogTitle>
          <DialogContentText textAlign="center" marginBottom="20px">
            Click "Change" then "Confirm" when finished
          </DialogContentText>
          <Grid
            container
            direction="column"
            // justifyContent="center"
            // alignItems="center"
          >
            <TextField placeholder={info.workoutName} label='Name' sx={{ paddingBottom:'10px'}} onChange={e => {setWorkoutName(e.target.value)}}/>
            <TextField type="date" placeholder={info.date} sx={{ paddingBottom:'10px'}} onChange={e => {setDate(e.target.value)}}/>
            <TextField type="number" placeholder={info.timeToComplete} label='Duration' sx={{ paddingBottom:'10px'}} onChange={e => {setTimeToComplete(e.target.value)}}
              InputProps={{endAdornment: <InputAdornment position="start">seconds</InputAdornment>,}}/>
            <TextField type="number" placeholder={info.numExercises} label="Number of Exercise" onChange={e => {setNumExercises(e.target.value)}}/>
            <TextField label="Exercise" sx={{ paddingBottom:'10px'}} onChange={e => {setDate(e.target.value)}}/>

            {/* changing buttons and functionality */}
            <Button
              sx={{ margin: "15px", background: "#28B7CB" }}
              variant="contained"
              onClick={changingFunction}
            >
              {buttonName}
            </Button>
          </Grid>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default WorkoutEditBox;
