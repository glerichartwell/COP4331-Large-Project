// add-workout-to-client.api.js - Add Workout To Client Endpoint

// setting up middleware
require("dotenv").config();
const express = require("express");
const client = require("../db");
const router = express.Router();

router.post("/api/add-workout-to-client", async (req, res) => {
  // incoming: name, date, comment, rating, timeToComplete, trainerEmail, exercises
  // outgoing: success or error

  // get array of workouts from client,
  // append new object to end of array,
  // keep it sorted if possible

  var error = "";
  const {
    name,
    date,
    comment,
    rating,
    timeToComplete,
    trainerEmail,
    exercises,
  } = req.body;
  const db = client.db();

  var newWorkout = {
    name: name,
    date: date,
    comment: comment,
    rating: rating,
    timeToComplete: timeToComplete,
    trainerEmail: trainerEmail,
    exercises: exercises,
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
