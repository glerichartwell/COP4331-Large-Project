// edit-workout-exercise.api.js - Edit Workout Exercise Endpoint

// setting up middleware
const express = require("express");
require("dotenv").config();
const client = require("../../db");
const router = express.Router();
const ObjectId = require("mongodb").ObjectId;

router.patch("/api/edit-workout-exercise", async (req, res) => {
  // incoming: workoutID (required),
  // originalExerciseID (required), newExerciseID (required)
  // outgoing: error
  var error = "";
  const { workoutID, originalExerciseID, newExerciseID } = req.body;

  try {
    const db = client.db();
    // get workout from database
    const results = await db
      .collection("Workouts")
      .find({ workoutID: ObjectId(workoutID) })
      .toArray();

    // if results, store data
    if (results.length > 0) {
      id = results[0]._id;
      var collectionName = "Workouts";
      // update workout
      // if new exerciseID
      if (newExerciseID) {
        db.collection(collectionName).updateOne(
          { _id: id, "exercises.exerciseID": originalExerciseID },
          {
            $set: {
              "exercises.$.exerciseID": newExerciseID,
            },
          }
        );
      }
    } else {
      error = "Workout does not exist";
    }
  } catch (e) {
    error = e.toString();
  }

  // package data
  var ret = {
    status: 200,
    error: error,
  };
  // send data
  res.status(200).json(ret);
});

module.exports = router;
