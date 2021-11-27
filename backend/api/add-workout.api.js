// add-workout.api.js - Add Workout Endpoint

// setting up middleware
require("dotenv").config();
const express = require("express");
const client = require("../db");
const router = express.Router();

router.post("/api/add-workout", async (req, res) => {
  // incoming: workoutName, date, comment, rating, timeToComplete, trainerEmail, exercises
  // outgoing: success or error

  var error = "";
  const {
    workoutName,
    date,
    comment,
    rating,
    timeToComplete,
    trainerEmail,
    exercises,
    numExercises,

  } = req.body;
  const db = client.db();

  var newWorkout = {
    workoutName: workoutName,
    date: date,
    comment: comment,
    rating: rating,
    timeToComplete: timeToComplete,
    trainerEmail: trainerEmail,
    exercises: exercises,
    numExercises: numExercises,

  };

  db.collection("Workouts").insertOne(newWorkout);

  // package data
  var ret = {
    error: error,
  };
  // send data
  res.status(200).json(ret);
});

module.exports = router;
