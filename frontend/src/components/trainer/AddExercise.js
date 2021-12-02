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
  InputAdornment
} from "@mui/material";

// const address = "https://courtneygenix.herokuapp.com/api/add-exercise"
const address = "https://localhost:5000/api/add-exercise"

const AddExercise = (props) => {
  const [open, setOpen] = useState(true);
  const [message, setMessage] = useState("");
  const [workoutID, setWorkoutID] = useState(0);
  const [name, setName] = useState();
  const [sets, setSets] = useState();
  const [reps, setReps] = useState();
  const [time, setTime] = useState();
  const [weight, setWeight] = useState();
  const [rest, setRest] = useState();
  const [statButton, setStatButton] = useState(true);
  const [description, setDescription] = useState();

  const navigate = useNavigate();
  //workoutID, name, sets, reps, time, weight, rest

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
    props.closeAddExercise();
  };

  const addExercise = async (event) => {
    //workoutID, name, sets, reps, time, weight, rest
    var obj = {
      trainerID: trainerID,
      workoutID: workoutID,
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
        address,
        {
        method: "POST",
        body: js,
        headers: { "Content-Type": "application/json" },
      });
      setMessage("Exercise Created");

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

  useEffect(() => {
    if (name && sets && (reps || time || description) && weight && rest) {
      setStatButton(false);
    }else {
      setStatButton(true);
    }
  }, [name, sets, reps, time, weight, rest]);

  return (
    <div>
      <Dialog
        open={open}
        fullWidth={true}
        maxWidth="xs"
        onBackdropClick={handleClose}
      >
        <DialogTitle textAlign="center" marginBottom="10px">
          Add Exercise
        </DialogTitle>
        <DialogContent>
          <DialogContentText textAlign="center">
            Enter Exercise Information
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
              sx={{ width: "80%", margin: "5px" }}
              type="text"
              placeholder="Name of Exercise"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
              size="large"
              variant="standard"
            />
            <TextField
              sx={{ width: "80%", margin: "5px" }}
              type="number"
              placeholder="Sets"
              value={sets}
              onChange={(e) => {
                setSets(e.target.value);
              }}
              size="large"
              variant="standard"
            />
            <TextField
              sx={{ width: "80%", margin: "5px" }}
              type="number"
              placeholder="Reps"
              value={reps}
              onChange={(e) => {
                setReps(e.target.value);
              }}
              size="large"
              variant="standard"
            />
            <TextField
              sx={{ width: "80%", margin: "5px" }}
              type="number"
              placeholder="Duration"
              value={time}
              onChange={(e) => {
                setTime(e.target.value);
              }}
              InputProps={{endAdornment: <InputAdornment position="end">seconds</InputAdornment>}}
              size="large"
              variant="standard"
            />
            <TextField
              sx={{ width: "80%", margin: "5px" }}
              type="number"
              placeholder="Weight"
              value={weight}
              onChange={(e) => {
                setWeight(e.target.value);
              }}
              InputProps={{endAdornment: <InputAdornment position="end">lbs</InputAdornment>}}
              size="large"
              variant="standard"
            />
            <TextField
              sx={{ width: "80%", margin: "5px" }}
              type="number"
              placeholder="Rest"
              value={rest}
              onChange={(e) => {
                setRest(e.target.value);
              }}
              InputProps={{endAdornment: <InputAdornment position="end">seconds</InputAdornment>}}
              size="large"
              variant="standard"
            />
            <TextField
              sx={{ width: "80%", margin: "5px" }}
              type="textarea"
              multiline
              rows={3}
              placeholder="Description"
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
              }}
              size="large"
              variant="standard"
            />
            {message}
            <Button
              sx={{ margin: "15px", background: "#28B7CB" }}
              variant="contained"
              onClick={addExercise}
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

export default AddExercise;
