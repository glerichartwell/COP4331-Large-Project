// add-exercise.api.js - Add Exercise Endpoint

// setting up middleware
require("dotenv").config();
const express = require("express");
const client = require("../../db");
const router = express.Router();

router.post("/api/add-exercise", async (req, res) => {
  // incoming: name, sets, reps, time, weight, rest
  // outgoing: success or error

  var error = "";
  const { name, sets, reps, time, weight, rest, description } = req.body;

  try {
    const db = client.db();
    var newExercise = {
      name: name,
      sets: sets,
      reps: reps,
      time: time,
      weight: weight,
      rest: rest,
      description: description,
    };

    db.collection("Exercises").insertOne(newExercise);
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
