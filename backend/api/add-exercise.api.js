// add-exercise.api.js - Add Exercise Endpoint

// setting up middleware
require("dotenv").config();
const express = require("express");
const client = require("../db");
const router = express.Router();

router.post("/api/add-exercise", async (req, res) => {
  // incoming: workoutID, name, sets, reps, time, weight, rest
  // outgoing: success or error

  var error = "";
  const { workoutID, name, sets, reps, time, weight, rest } = req.body;
  const db = client.db();

  var newExercise = {
    workoutID: workoutID,
    name: name,
    sets: sets,
    reps: reps,
    time: time,
    weight: weight,
    rest: rest,
  };

  db.collection("Exercises").insertOne(newExercise);

  // package data
  var ret = {
    error: error,
  };
  // send data
  res.status(200).json(ret);
});

module.exports = router;
