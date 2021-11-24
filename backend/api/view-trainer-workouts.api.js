// view-trainer-workouts.api.js - View Trainer Workouts Endpoint

// setting up middleware
require("dotenv").config();
const express = require("express");
const client = require("../db");
const router = express.Router();

router.post("/api/view-trainer-workouts", async (req, res) => {
  // incoming: trainer's email
  // outgoing: clients or error

  var error = "";
  const { email } = req.body;
  const db = client.db();

  // get clients
  const results = await db
    .collection("Workouts")
    .find({ trainerEmail: email.toLowerCase() })
    .toArray();

  if (results.length == 0) {
    error = "No Workouts";
  }
  // package data
  var ret = {
    results: results,
    error: error,
  };
  // send data
  res.status(200).json(ret);
});

module.exports = router;
