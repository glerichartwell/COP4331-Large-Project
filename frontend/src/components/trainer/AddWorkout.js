import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";

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

const AddWorkout = (props) => {
  const [open, setOpen] = useState(true);
  const [message, setMessage] = useState("");
  const [clientID, setClientID] = useState(0);
  const [exercises, setExercises] = useState([]);
  const [linkedClients, setLinkedClients] = useState([]);
  const [name, setName] = useState();
  const [date, setDate] = useState();
  const [numExercises, setNumExercises] = useState();
  const [timeToComplete, setTimeToComplete] = useState();
  const [statButton, setStatButton] = useState(true);

  const navigate = useNavigate();
  //clientID, Exercise, name, date, reps, time, weight, rest

  var trainerID = null;
  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    console.log(user);
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      trainerID = user["email"];
      console.log("TrainerID: ", trainerID);
      // ...
    } else {
      // Leave for potential future logic
    }
  });

  const handleClose = () => {
    props.closeAddWorkout();
  };

  const addWorkout = async (event) => {
    //workoutID, name, sets, reps, timeToComplete, weight, rest
    var obj = {
      clientID: clientID,
      trainerEmail: trainerID,
      name: name,
      exercises: exercises,
      date: date,
      timeToComplete: timeToComplete,
      numExercises: numExercises,
      comment: "",
      rating: "0",
      linkedClients: linkedClients,
    };
    var js = JSON.stringify(obj);
    try {
      const response = await fetch("http://localhost:5000/api/add-workout", {
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
    console.log(name);

    handleClose();

  };

  useEffect(() => {
    if (name && date && timeToComplete && numExercises) {
      setStatButton(false);
    } else {
      setStatButton(true);
    }
  }, [name, date, timeToComplete, numExercises]);

  return (
    <div>
      <Dialog
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
            {/* workoutID, name, sets, reps, time, weight, rest  */}

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
      </Dialog>
    </div>
  );
};

export default AddWorkout;
