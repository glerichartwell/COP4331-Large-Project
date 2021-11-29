// edit-client-workout.api.js - Edit Client Workout Endpoint

// setting up middleware
const express = require("express");
require("dotenv").config();
const client = require("../../db");
const router = express.Router();
const ObjectId = require("mongodb").ObjectId;

router.patch("/api/edit-client-workout", async (req, res) => {
  // incoming: email (required),
  // originalDate (required), newDate, newWorkoutID
  // outgoing: error
  var error = "";
  const { email, originalDate, newDate, newWorkoutID } = req.body;

  try {
    const db = client.db();
    // get client from database
    const results = await db
      .collection("Clients")
      .find({ email: email })
      .toArray();

    // if results, store data
    if (results.length > 0) {
      id = results[0]._id;
      var collectionName = "Clients";
      // update workout
      // if new date
      if (newDate) {
        db.collection(collectionName).updateOne(
          { _id: id, "workout.date": originalDate },
          {
            $set: {
              "workout.$.date": newDate,
            },
          }
        );
      }
      if (newWorkoutID) {
        // if new workoutID
        db.collection(collectionName).updateOne(
          { _id: id, "workout.date": originalDate },
          {
            $set: {
              "workout.$.workoutID": ObjectId(newWorkoutID),
            },
          }
        );
      }
    } else {
      error = "Client does not exist";
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
