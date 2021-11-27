// add-exercise-to-workout.api.api.js - Add Exercise To Workout API endpoint

// setting up middleware
const express = require("express");
require("dotenv").config();
const client = require("../db");
const router = express.Router();
const ObjectId = require("mongodb").ObjectId;

router.post("/api/add-exercise-to-workout.api", async (req, res) => {
  // incoming: workoutID, exerciseID
  // outgoing: error
  var error = "";
  const { workoutID, exerciseID } = req.body;
  const db = client.db();

  // get workout from database
  const results = await db
    .collection("Workouts")
    .find({ _id: ObjectId(workoutID) })
    .toArray();

  // if results, store data
  if (results.length > 0) {
    id = results[0]._id;

    var collectionName = "Workouts";
    // push to exercises
    db.collection(collectionName).updateOne(
      { _id: id },
      {
        $push: {
          exercises: {
            exerciseID: ObjectId(exerciseID),
          },
        },
      }
    );
  } else {
    error = "Workout does not exist";
  }
  // package data
  var ret = {
    error: error,
  };
  // send data
  res.status(200).json(ret);
});

module.exports = router;
