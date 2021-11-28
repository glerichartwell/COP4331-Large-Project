// add-workout-to-client.api.js - Add Workout To Client API endpoint

// setting up middleware
const express = require("express");
require("dotenv").config();
const client = require("../../db");
const router = express.Router();
const ObjectId = require("mongodb").ObjectId;

router.post("/api/add-workout-to-client", async (req, res) => {
  // incoming: email (required),
  // workoutID, date
  // outgoing: error
  var error = "";
  const { email, date, workoutID } = req.body;

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
      // push to workout
      db.collection(collectionName).updateOne(
        { _id: id },
        {
          $push: {
            workout: {
              date: date,
              workoutID: ObjectId(workoutID),
            },
          },
        }
      );
    } else {
      error = "Client does not exist";
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
