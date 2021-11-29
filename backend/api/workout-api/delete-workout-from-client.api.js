// delete-workout-from-client.api.js - Delete Workout From Client API endpoint

// setting up middleware
const express = require("express");
require("dotenv").config();
const client = require("../../db");
const router = express.Router();
const ObjectId = require("mongodb").ObjectId;

router.post("/api/delete-workout-from-client", async (req, res) => {
  // incoming: email, workoutID
  // outgoing: error
  var error = "";
  const { email, workoutID } = req.body;

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
      // push to exercises
      db.collection(collectionName).updateOne(
        { _id: id },
        { $pull: { workouts: { workoutID: ObjectId(workoutID) } } }
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
