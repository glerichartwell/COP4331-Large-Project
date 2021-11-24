// view-client-workouts-by-week.api.js - View Client Workouts Endpoint

// setting up middleware
require("dotenv").config();
const express = require("express");
const client = require("../db");
const router = express.Router();

router.post("/api/view-client-workouts-by-week", async (req, res) => {
  // incoming: client's email and startDate
  // outgoing: clients or error

  // store array of workout objects in client
  // var newWorkout = {
  //   name: name,
  //   date: date,
  //   comment: comment,
  //   rating: rating,
  //   timeToComplete: timeToComplete,
  //   trainerEmail: trainerEmail,
  //   exercises: exercises,
  // };

  var error = "";
  const { email, startDate } = req.body;
  const db = client.db();

  // get clients
  const client = await db
    .collection("Clients")
    .find({ email: email.toLowerCase() })
    .toArray();

  if (client.length == 0) {
    error = "No clients";
  } else {
    if (client[0].workouts.length == 0) {
      error = "No workouts for this client";
    } else {
      results = client[0].workouts;
    }
  }
  // package data
  var ret = {
    results: results,
    error: error,
  };

  workouts: {
    date: workoutID;
  }
  // send data
  res.status(200).json(ret);
});

module.exports = router;
