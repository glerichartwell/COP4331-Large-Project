import React, { useState, useEffect } from "react";
import Dialog from "@mui/material/Dialog";
import Button from "@mui/material/Button";
import { Autocomplete, Grid, List, ListItem } from "@mui/material";
import TextField from "@mui/material/TextField";
import { DialogContent, DialogTitle } from "@mui/material";
import { InputAdornment } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { LocalizationProvider } from "@mui/lab";
import { DesktopDatePicker } from "@mui/lab";
import './css/EditBox.css'

// const address = "https://courtneygenix.herokuapp.com"
const address ="http://localhost:5000"

const WorkoutEditBox = ({ closeEditBox, info, returningInfo }) => {
  const [showEdit, setShowEdit] = useState(true);
  const [buttonName, setButtonName] = useState("Change");
  const [confirmClick, setConfirmClick] = useState(null);
  const [message, setMessage] = useState("");
  const [addError, setAddError] = useState("");
  const [name, setName] = useState(undefined);
  const [date, setDate] = useState(undefined);
  const [timeToComplete, setTimeToComplete] = useState(undefined);
  const [id, setID] = useState(info.id);
  const [exercise, setExercise] = useState(null);
  const [comment, setComment] = useState(null);

  // const exercises = [
  //   {label: 'Bicep Curls', name: 'Bicep Curls', id: 1},
  //   {label: 'Squats', name: 'Squats', id: 2},
  //   {label: 'Burpees', name: 'Burpees', id: 3},
  // ]

  const removeErrorMessage = () => {
    setAddError("");
  }
  //add ability to add exercises in here
  useEffect(() => {
    window.addEventListener('mouseup', removeErrorMessage)
    return () => {
      window.removeEventListener('mouseup', removeErrorMessage)
    }
  }, [])

  useEffect(() => {
      loadExercises();
  })

  var exercises = [];
  const getExercises = async (event) => {

    try {
      const response = await fetch(
      address + "/api/view-all-exercises",
       {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      var txt = await response.text();
      var res = JSON.parse(txt);

      // save number of exercises
      const numExercises = res.results.length;
      for (var i = 0; i < numExercises; i++) {

        var obj = {
          cardNumber: i,
          id: res.results[i]._id,
          name: res.results[i].name,
          sets: res.results[i].sets,
          reps: res.results[i].reps,
          time: res.results[i].time,
          weight: res.results[i].weight,
          rest: res.results[i].rest,
        }
        exercises.push(obj);
      }
      if (res.error.length > 0) {
        console.log("API Error: " + res.error);
      } else {
        console.log("exercises returned");
      }
    } catch (error) {
      console.log(error.toString());
    }

  
  };
  
  const loadExercises = () => {
    if (exercises.length <= 0)
    {
        // Call search api
        getExercises()
        .then(() => {
          exercises.forEach(exercise => {
            exercise.label = exercise.name
          })
        })
      }
  }

  const EditWorkout = async (event) => {

    // if (date)
    // {
    //   date = new Date(date).toISOString().slice(0,10)
    // }

    var obj = {

      id : id, 
      name: name,
      // date: date,
      exercises: chosenExercises,
      comment: comment,
      timeToComplete: timeToComplete,

    };

    var js = JSON.stringify(obj);
    try {
      const response = await fetch(
        address + "/api/edit-workout", 
        {
        method: "PATCH",
        body: js,
        headers: { "Content-Type": "application/json" },
      });
      setMessage("Workout Edited");

      var txt = await response.text();
      var res = JSON.parse(txt);

      if (res.error.length > 0) {
        console.log(res.error);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const changingFunction = () => {
    setButtonName("Confirm");

    if (confirmClick) {
      EditWorkout();
      closeEditBox();
    }
    setMessage('Click "Confirm" to save these changes.');
    setConfirmClick(true);
  };

  const deleteExercise = (name) => {
    var index = chosenExercises.findIndex(exercise => exercise.name === name);
    setChosenExercises(chosenExercises.slice(0, index).concat(chosenExercises.slice(index+1, chosenExercises.length)))
  }

  const addExercise = (exercise) => {
    
    if (!exercise)
    {
      setAddError("Please choose an exercise.")
    }
    else if (chosenExercises.find(item => item.name === exercise.name))
    {
      setAddError("This exercise is already in the workout!")
    }
    else
    {
      setChosenExercises(chosenExercises.concat([{name: exercise.name, id: exercise.id}]));
    }
  }

  const [chosenExercises, setChosenExercises] = useState([])
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
          <Grid container direction='column' sm={6}>
            <Grid item>
                <TextField placeholder={info.name} label='Name' sx={{ paddingBottom: "10px", width: '90%', margin:'8px', marginBottom: '3px'}} onChange={e => {setName(e.target.value)}} variant='standard' />
              </Grid>
              <Grid item>
              {/* <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DesktopDatePicker
                        label="Date"
                        value={date}
                        allowSameDateSelection={true}
                        onChange={(newValue) => {
                            setDate(newValue);
                          }}
                        renderInput={(params) => <TextField {...params} variant="standard" sx={{ width: '90%', margin:'8px'}}/>}
                        
                    />
                </LocalizationProvider> */}
              </Grid>
              <Grid item>
                <TextField type="number" placeholder={info.timeToComplete} label='Estimated Time to Complete' sx={{ width: '90%', margin:'8px'}} onChange={e => {setTimeToComplete(e.target.value)}}
                            InputProps={{endAdornment: <InputAdornment position="start">minutes</InputAdornment>,}} variant='standard'
                />
              </Grid>
              <Grid item>
                <TextField type='textarea' multiline rows={3} label="Comments" sx={{ width: '90%', margin:'8px'}} onChange={e => {setComment(e.target.value)}} variant='standard'/>
            </Grid>
          </Grid>
          <Grid container direction='column' sm={6}>
              <Grid container direction='row' >
                <Grid item>
                  <Autocomplete 
                    id="exercise-autocomplete"
                    options={exercises}
                    getOptionLabel={(option) => {return option.label}}
                    onChange={(e, value) => {setExercise(value)}}
                    renderInput={(params) => <TextField {...params} label="Exercises" variant='standard' />}
                    sx={{ width: '330px', margin:'8px', marginLeft: '30px', marginBottom: '-15px'}}
                    />
                    <div style={{textAlign: 'center', marginTop: '15px', color: 'purple'}}>{addError}</div>
                </Grid>
                <Grid item>
                  <Button className='add-exercise' variant='text' onClick={() => {addExercise(exercise)}} sx={{minWidth: '1px'}}>Add</Button>
                </Grid>
              </Grid>
            <Grid item >
                <List>
                {chosenExercises.map((exercise) => (
                  <ListItem
                  key={exercise.id}
                  secondaryAction={
                    <IconButton edge="end" aria-label="delete" onClick={() => {deleteExercise(exercise.name)}} sx={{position: 'absolute', right: '0px', top: '-21px'}}>
                        <DeleteIcon  />
                      </IconButton>
                    } 
                    sx={{ width: '330px', margin: '3px', marginLeft: '30px', border: 1, borderColor: '#c2c0c0', borderRadius: 1}}
                    >
                    {exercise.name}
                  </ListItem>
                ))}
                </List>
              </Grid>  
          </Grid>
          </Grid>
          <Grid container direction='column' sx={{textAlign: 'center'}} >
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

export default WorkoutEditBox;
