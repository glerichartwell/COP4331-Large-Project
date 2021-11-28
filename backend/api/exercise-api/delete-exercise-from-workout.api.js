// delete-exercise-from-workout.api.js - Delete Exercise From Workout API endpoint

// setting up middleware
const express = require("express");
require("dotenv").config();
const client = require("../../db");
const router = express.Router();
const ObjectId = require("mongodb").ObjectId;

router.post("/api/delete-exercise-from-workout", async (req, res) => {
  // incoming: workoutID, exerciseID
  // outgoing: error
  var error = "";
  const { workoutID, exerciseID } = req.body;

  try {
    const db = client.db();
    // get workout from database
    const results = await db
      .collection("Workouts")
      .find({ _id: ObjectId(workoutID) })
      .toArray();
    // console.log(workoutID);
    // if results, store data
    if (results.length > 0) {
      id = results[0]._id;

      var collectionName = "Workouts";
      // push to exercises
      db.collection(collectionName).updateOne(
        { _id: id },
        { $pull: { exercises: { exerciseID: ObjectId(exerciseID) } } }
      );
      db.collection(collectionName).updateOne(
        { _id: id },
        {
          $set: { numExercises: results[0].exercises.length - 1 },
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
