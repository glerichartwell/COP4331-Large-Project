// add-exercise-to-workout.api.js - Add Exercise To Workout API endpoint

// setting up middleware
const express = require("express");
require("dotenv").config();
const client = require("../../db");
const router = express.Router();
const ObjectId = require("mongodb").ObjectId;

router.post("/api/add-exercise-to-workout", async (req, res) => {
  // incoming: workoutID, exerciseID, name (name of exercise)
  // outgoing: error
  var error = "";
  const { workoutID, exerciseID, name } = req.body;

  try {
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
              name: name,
            },
          },
        }
      );
      db.collection(collectionName).updateOne(
        { _id: id },
        {
          $set: { numExercises: results[0].exercises.length + 1 },
        }
      );
    } else {
      error = "Workout does not exist";
    }
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
