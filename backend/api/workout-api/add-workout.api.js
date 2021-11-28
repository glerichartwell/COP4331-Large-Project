// add-workout.api.js - Add Workout Endpoint

// setting up middleware
require("dotenv").config();
const express = require("express");
const client = require("../../db");
const router = express.Router();

router.post("/api/add-workout", async (req, res) => {
  // incoming: workoutName, date, comment, timeToComplete, exercises
  // outgoing: success or error

  var error = "";
  const { name, date, comment, timeToComplete, exercises, numExercises } =
    req.body;

  try {
    const db = client.db();
    var newWorkout = {
      name: name,
      date: date,
      comment: comment,
      timeToComplete: timeToComplete,
      exercises: exercises,
      numExercises: numExercises,
    };

    db.collection("Workouts").insertOne(newWorkout);
  } catch (e) {
    error = e.toString();
  }

  // package data
  var ret = {
    error: error,
  };
  // send data
  res.status(200).json(ret);
});

module.exports = router;
