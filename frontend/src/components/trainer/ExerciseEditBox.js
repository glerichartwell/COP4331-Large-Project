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

const ExerciseEditBox = ({ closeEditBox, info, returningInfo }) => {
  const [showEdit, setShowEdit] = useState(true);
  const [buttonName, setButtonName] = useState("Change");
  const [confirmClick, setConfirmClick] = useState(0);
  const [message, setMessage] = useState("");
  const [exerciseName, setExerciseName] = useState();
  const [sets, setSets] = useState();
  const [reps, setReps] = useState();
  const [time, setTime] = useState();
  const [weight, setWeight] = useState();
  const [rest, setRest] = useState();
  const [id, setID] = useState(info.id);


  const confirm = () => {
    closeEditBox(info);
  };


  const EditExercise = async (event) => {
    //workoutID, name, sets, reps, time, weight, rest
    var obj = {
      id: id,
      exerciseName: exerciseName,
      sets: sets,
      reps: reps,
      time: time,
      weight: weight,
      rest: rest,
    };
    var js = JSON.stringify(obj);
    try {
      const response = await fetch("http://localhost:5000/api/edit-exercise", {
        method: "PATCH",
        body: js,
        headers: { "Content-Type": "application/json" },
      });
      setMessage("Exercise Edited");

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
      EditExercise();
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
            <TextField placeholder={info.exerciseName} label='Name' sx={{ paddingBottom:'10px'}} onChange={e => {setExerciseName(e.target.value)}}/>
            <TextField type="number" placeholder={info.reps} label='Reps' sx={{ paddingBottom:'10px'}} onChange={e => {setReps(e.target.value)}}/>
            <TextField type="number" placeholder={info.sets} label='Sets' sx={{ paddingBottom:'10px'}} onChange={e => {setSets(e.target.value)}}/>
            <TextField type="number" placeholder={info.time} label='Duration' sx={{ paddingBottom:'10px'}} onChange={e => {setTime(e.target.value)}}
              InputProps={{endAdornment: <InputAdornment position="start">seconds</InputAdornment>,}}/>
            <TextField type="number" placeholder={info.weight} label='Weight' sx={{ paddingBottom:'10px'}} onChange={e => {setWeight(e.target.value)}}
              InputProps={{endAdornment: <InputAdornment position="start">lbs</InputAdornment>,}}/>
            <TextField type="number" placeholder={info.rest} label="Rest" onChange={e => {setRest(e.target.value)}}
              InputProps={{endAdornment: <InputAdornment position="start">seconds</InputAdornment>,}}/>
            
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

export default ExerciseEditBox;
