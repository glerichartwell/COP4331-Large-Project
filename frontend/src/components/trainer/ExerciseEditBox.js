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

import "./css/EditBox.css"

const address = "https://courtneygenix.herokuapp.com"
// const address ="http://localhost:5000"

const ExerciseEditBox = ({ closeEditBox, info, setRefresh, returningInfo }) => {
  const [showEdit, setShowEdit] = useState(true);
  const [buttonName, setButtonName] = useState("Change");
  const [confirmClick, setConfirmClick] = useState(0);
  const [message, setMessage] = useState("");
  const [name, setName] = useState();
  const [sets, setSets] = useState();
  const [reps, setReps] = useState();
  const [time, setTime] = useState();
  const [weight, setWeight] = useState();
  const [rest, setRest] = useState();
  const [description, setDescription] = useState();
  const [id, setID] = useState(info.id);


  const EditExercise = async (event) => {
    //workoutID, name, sets, reps, time, weight, rest
    var obj = {
      id: id,
      name: name,
      sets: sets,
      reps: reps,
      time: time,
      weight: weight,
      rest: rest,
      description: description,
    };
    var js = JSON.stringify(obj);
    try {
      const response = await fetch(
        address + "/api/edit-exercise", 
        {
        method: "PATCH",
        body: js,
        headers: { "Content-Type": "application/json" },
      });

      var txt = await response.text();
      var res = JSON.parse(txt);

      setRefresh((refresh) => !refresh)
      if (res.error.length > 0) {
        console.log(res.error);
      }
    } catch (error) {
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
    setMessage('Click "Confirm" to save these changes.')
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
          <DialogTitle textAlign="center" marginBottom='10px'>
            {info.type}: {info.name}
          </DialogTitle>
          <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
          >
            <TextField placeholder={info.name} label='Name' sx={{ width: '85%', paddingBottom:'10px'}} onChange={e => {setName(e.target.value)}} variant='standard' />
            <TextField type="number" placeholder={info.sets} label='Sets' sx={{ width: '85%', paddingBottom:'10px'}} onChange={e => {setSets(e.target.value)}} variant='standard' />
            <TextField type="number" placeholder={info.reps} label='Reps' sx={{ width: '85%', paddingBottom:'10px'}} onChange={e => {setReps(e.target.value)}} variant='standard' />
            <TextField type="number" placeholder={info.time} label='Duration' sx={{ width: '85%', paddingBottom:'10px'}} onChange={e => {setTime(e.target.value)}}
              InputProps={{endAdornment: <InputAdornment position="start">seconds</InputAdornment>}} variant='standard' />
            <TextField type="number" placeholder={info.weight} label='Weight' sx={{ width: '85%', paddingBottom:'10px'}} onChange={e => {setWeight(e.target.value)}}
              InputProps={{endAdornment: <InputAdornment position="start">lbs</InputAdornment>}} variant='standard' />
            <TextField type="number" placeholder={info.rest} label="Rest" sx={{ width: '85%', paddingBottom:'10px'}} onChange={e => {setRest(e.target.value)}}
              InputProps={{endAdornment: <InputAdornment position="start">seconds</InputAdornment>}} variant='standard' />
            <TextField type='textarea' multiline rows={3} placeholder={info.description} label='Description' sx={{width: '85%',}} onChange={e => setDescription(e.target.value)} variant='standard' />
            
            {/* changing buttons and functionality */}
            <div style={{textAlign: 'center', marginTop: '15px'}}>{message}</div>
            <Button
              className='edit-box-button'
              variant="outlined"
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
