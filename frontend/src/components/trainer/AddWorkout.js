import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { Autocomplete } from "@mui/material";
import { List, ListItem, IconButton } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import { getAuth, onAuthStateChanged } from "firebase/auth";

import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  Grid,
  TextField,
} from "@mui/material";
import { InputAdornment } from "@mui/material";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { LocalizationProvider } from "@mui/lab";
import { DesktopDatePicker } from "@mui/lab";

// const address = "https://courtneygenix.herokuapp.com/api/view-all-exercises";
const address = "https://localhost:5000/api/view-all-exercises";

const AddWorkout = (props) => {
  const [open, setOpen] = useState(true);
  const [message, setMessage] = useState("");
  const [name, setName] = useState();
  const [date, setDate] = useState();
  const [timeToComplete, setTimeToComplete] = useState();
  const [statButton, setStatButton] = useState(true);
  const [comment, setComment] = useState(null);
  const [addError, setAddError] = useState("");
  const [exercise, setExercise] = useState(null);
  const [buttonName, setButtonName] = useState("Add");
  const [disableAdd, setDisableAdd] = useState(true);


  const navigate = useNavigate();
  //clientID, Exercise, name, date, reps, time, weight, rest


  const auth = getAuth();
  const user = auth.currentUser;
  const trainerEmail = user.email;

  const handleClose = () => {
    props.closeAddWorkout();
  };

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

  useEffect(() => {
    console.log("disabled: ", disableAdd)
    console.log("name: ", name)
    console.log("date: ", date)
    console.log("timeToComplete: ", timeToComplete)
    console.log("comment: ", comment)
    console.log("chosenExercises: ", chosenExercises)
    if (name || date || timeToComplete || comment || (chosenExercises.length > 0))
    {
      setDisableAdd(false);
    }
    else
    {
      setDisableAdd(true);
    }
  })

  var exercises = [];
  const getExercises = async (event) => {
    console.log("Retrieving exercises from database...")
    

    try {
      const response = await fetch(
      address,
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
      console.log("exercises loaded")
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
        console.log("Before Exercises: ", exercises)
        // Call search api
        getExercises()
        .then(() => {
          exercises.forEach(exercise => {
            exercise.label = exercise.name
          })
        })
        console.log("After Exercises: ", exercises)
      }
  }

  const deleteExercise = (name) => {
    var index = chosenExercises.findIndex(exercise => exercise.name == name);
    setChosenExercises(chosenExercises.slice(0, index).concat(chosenExercises.slice(index+1, chosenExercises.length)))
  }

  const addExercise = (exercise) => {
    
    if (!exercise)
    {
      setAddError("Please choose an exercise.")
    }
    else if (chosenExercises.find(item => item.name == exercise.name))
    {
      setAddError("This exercise is already in the workout!")
    }
    else
    {
      setChosenExercises(chosenExercises.concat([{name: exercise.name, id: exercise.id}]));
    }
  }

  const addWorkout = async (event) => {
    //workoutID, name, sets, reps, timeToComplete, weight, rest

    // if (date)
    // {
    //   date = new Date(date).toISOString().slice(0,10)
    // }
    
    var obj = {
      trainerEmail: trainerEmail,
      name: name,
      exercises: chosenExercises,
      // date: date
      timeToComplete: timeToComplete,
      comment: comment,
    };

    var js = JSON.stringify(obj);

    try {
      const response = await fetch(
        address, {
        method: "POST",
        body: js,
        headers: { "Content-Type": "application/json" },
      });
      setMessage("workout Created");

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

  const closeAdd = () => {
    addWorkout();
    props.closeAddWorkout();

  }

  const [chosenExercises, setChosenExercises] = useState([])
  return (
    <div>
      <Dialog
        open={open}
        fullWidth={true}
        maxWidth="md"
        onBackdropClick={handleClose}
      >
        <DialogContent className="edit-box">
          <DialogTitle textAlign="center">
            Add workout
          </DialogTitle>
          <Grid container direction='row'>
          <Grid container direction='column' sm={6}>
            <Grid item>
                <TextField placeholder={name} variant='standard' label="Name of workout" sx={{ paddingBottom: "10px", width: '90%', margin:'8px', marginBottom: '3px'}} onChange={e => {setName(e.target.value)}}/>
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
                <TextField type="number" variant='standard' placeholder={timeToComplete} label='Estimated Time to Complete' sx={{ width: '90%', margin:'8px'}} onChange={e => {setTimeToComplete(e.target.value)}}
                            InputProps={{endAdornment: <InputAdornment position="start">minutes</InputAdornment>,}}
                />
              </Grid>
              <Grid item>
                <TextField type='textarea' variant='standard' multiline rows={3} value={comment} label="Comments" sx={{ width: '90%', margin:'8px'}} onChange={e => {setComment(e.target.value)}}/>
            </Grid>
          </Grid>
          <Grid container direction='column' sm={6}>
              <Grid container direction='row' >
                <Grid item>
                  {console.log("exercises: ", exercises)}
                  <Autocomplete 
                    id="exercise-autocomplete"
                    options={exercises}
                    getOptionLabel={(option) => {return option.label}}
                    onChange={(e, value) => {console.log("subset: ", value); setExercise(value)}}
                    renderInput={(params) => <TextField {...params} variant='standard' label="Exercises" />}
                    sx={{ width: '330px', margin:'8px', marginLeft: '30px', marginBottom: '-15px'}}
                    />
                    <div style={{textAlign: 'center', marginTop: '15px', color: 'purple'}}>{addError}</div>
                </Grid>
                <Grid item>
                  <Button className='add-exercise' variant='text' onClick={() => {console.log("exercise being added: ", exercise); addExercise(exercise)}} sx={{minWidth: '1px'}}>Add</Button>
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
                    {console.log("Exercise in list: ", exercise)}
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
                onClick={closeAdd}
                disabled={disableAdd}
              >
                {buttonName}
              </Button>
          </Grid>
        </DialogContent>
      </Dialog>
      {/* Old */}
      {/* <Dialog
        open={open}
        fullWidth={true}
        maxWidth="xs"
        onBackdropClick={handleClose}
      >
        <DialogTitle textAlign="center" marginBottom="10px">
          Add workout
        </DialogTitle>
        <DialogContent>
          <DialogContentText textAlign="center">
            Enter workout Information
          </DialogContentText>
          <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
            marginTop="25px"
          >
            workoutID, name, sets, reps, time, weight, rest 
            <TextField
              sx={{ width: "250px", margin: "5px" }}
              id="email"
              placeholder="Name of workout"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
              size="large"
              variant="standard"
            />
            <TextField
              sx={{ width: "250px", margin: "5px" }}
              id="email"
              type="date"
              placeholder="Date"
              value={date}
              onChange={(e) => {
                setDate(e.target.value);
              }}
              size="large"
              variant="standard"
            />
            <TextField
              sx={{ width: "250px", margin: "5px" }}
              id="email"
              type="number"
              placeholder="Time to Complete"
              value={timeToComplete}
              onChange={(e) => {
                setTimeToComplete(e.target.value);
              }}
              size="large"
              variant="standard"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="start">minutes</InputAdornment>
                ),
              }}
            />
            <TextField
              sx={{ width: "250px", margin: "5px" }}
              id="email"
              type="number"
              placeholder="Number of Exercises"
              value={numExercises}
              onChange={(e) => {
                setNumExercises(e.target.value);
              }}
              size="large"
              variant="standard"
            />
            {message}
            <Button
              sx={{ margin: "15px", background: "#28B7CB" }}
              variant="contained"
              onClick={addWorkout}
              disabled={statButton}
            >
              Add
            </Button>
          </Grid>
        </DialogContent>
      </Dialog>*/}
    </div> 
  );
};

export default AddWorkout;