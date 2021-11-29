import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import Radio from "@mui/material/Radio";
import Button from "@mui/material/Button";
import { Autocomplete, Box, Grid, List, ListItem } from "@mui/material";
import Slider from "@mui/material/Slider";
import TextField from "@mui/material/TextField";
import { FormControlLabel } from "@mui/material";
import RadioGroup from "@mui/material/RadioGroup";
import DialogActions from "@mui/material/DialogActions";
import { DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { InputAdornment } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search'
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import './css/EditBox.css'

const WorkoutEditBox = ({ closeEditBox, info, returningInfo }) => {
  const [showEdit, setShowEdit] = useState(true);
  const [buttonName, setButtonName] = useState("Change");
  const [confirmClick, setConfirmClick] = useState(0);
  const [message, setMessage] = useState("");
  const [name, setName] = useState();
  const [date, setDate] = useState();
  const [timeToComplete, setTimeToComplete] = useState();
  const [numExercises, setNumExercises] = useState();
  const [id, setID] = useState(info.id);

  const exercises = [
    {label: 'Bicep Curls', id: '1'},
    {label: 'Squats', id: '2'},
    {label: 'Burpees', id: '3'},
  ]


  //add ability to add exercises in here


  const confirm = () => {
    closeEditBox(info);
  };

  const EditWorkout = async (event) => {

    var obj = {

      id : id, 
      name: name,
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
    setMessage('Click "Confirm" to save these changes.');
    setConfirmClick(true);
  };

  const deleteExercise = (name) => {
    var index = chosenExercises.findIndex(exercise => exercise.name == name);
    console.log(chosenExercises.slice(0, index).concat(chosenExercises.slice(index+1, chosenExercises.length)))
    setChosenExercises(chosenExercises.slice(0, index).concat(chosenExercises.slice(index+1, chosenExercises.length)))
  }

  const [chosenExercises, setChosenExercises] = useState([{name: "Bicep Curls", id: '9821374923874'}, 
                                                          {name: 'Squats', id: '9821345343874'}, 
                                                          {name: 'Burpees', id: '9821334233874'}])
  return (
    <div>
      <Dialog
        open={showEdit}
        fullWidth={true}
        maxWidth="md"
        onBackdropClick={() => {
          closeEditBox();
        }}
      >
        <DialogContent className="edit-box">
          <DialogTitle textAlign="center">
            {info.type}: {info.name}
          </DialogTitle>
          <Grid container direction='row'>
          <Grid container direction="column" sm={6}>
            <Grid item>
              <TextField placeholder={info.name} label='Name' sx={{ width: '90%', margin:'8px'}} onChange={e => {setName(e.target.value)}}/>
            </Grid>
            <Grid item>
              <TextField type="date" placeholder={info.date} sx={{ width: '90%', margin:'8px'}} onChange={e => {setDate(e.target.value)}}/>
            </Grid>
            <Grid item>
              <TextField type="number" placeholder={info.timeToComplete} label='Estimated Time to Complete' sx={{ width: '90%', margin:'8px'}} onChange={e => {setTimeToComplete(e.target.value)}}
                InputProps={{endAdornment: <InputAdornment position="start">minutes</InputAdornment>,}}/>
            </Grid>
            <Grid item>
              <TextField type='textarea' multiline rows={3} label="Comments" sx={{ width: '90%', margin:'8px'}}/>
            </Grid>
            {/* changing buttons and functionality */}
          </Grid>
          <Grid container direction='column' sm={6} sx={{textAlign: 'right'}}>
            <Autocomplete 
              id="exercise-autocomplete"
              options={exercises}
              renderInput={(params) => <TextField {...params} label="Exercises" />}
              sx={{ width: '90%', margin:'8px'}}
              />
              <List>
              {chosenExercises.map((exercise) => (
                <ListItem 
                  secondaryAction={
                    <IconButton edge="end" aria-label="delete" onClick={() => {deleteExercise(exercise.name)}}>
                      <DeleteIcon />
                    </IconButton>
                  }
                  sx={{ width: '95%', marginLeft: '-5px'}}
                  >
                  {exercise.name}
                </ListItem>
              ))}
              </List>
          </Grid>
          </Grid>
              <div style={{textAlign: 'center', marginTop: '15px'}}>{message}</div>
              <Button
                className='edit-box-button'
                variant="outlined"
                onClick={changingFunction}
              >
                {buttonName}
              </Button>
          
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default WorkoutEditBox;
