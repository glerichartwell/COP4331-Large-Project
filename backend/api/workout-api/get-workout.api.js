// get-workout.api.js - Get Workout Endpoint

// setting up middleware
require("dotenv").config();
const express = require("express");
const client = require("../../db");
const router = express.Router();
const ObjectId = require("mongodb").ObjectId;

router.post("/api/get-workout", async (req, res) => {
  // incoming: workoutID
  // outgoing: success or error

  var error = "";
  var results = "";
  const { workoutID } = req.body;

  try {
    const db = client.db();
    // find workout
    results = await db
      .collection("Workouts")
      .find({ _id: ObjectId(workoutID) })
      .toArray();
  } catch (e) {
    error = e.toString();
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
