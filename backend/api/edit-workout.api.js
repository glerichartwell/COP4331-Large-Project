// edit-workout.api.js - Edit Workout Endpoint

// setting up middleware
require("dotenv").config();
const express = require("express");
const client = require("../db");
const router = express.Router();
const ObjectId = require('mongodb').ObjectId;

router.patch("/api/edit-workout", async (req, res) => {
  // incoming: id, name, date, comment, rating, timeToComplete, trainerEmail, clientEmail
  // outgoing: success or error

  var error = "";
  const {
    id,
    workoutName,
    date,
    comment,
    rating,
    timeToComplete,
    trainerEmail,
    exercises,
  } = req.body;

  const db = client.db();

  // get client from database
  const results = await db.collection("Workouts").find({ _id: ObjectId(id) }).toArray();
  // if results, store data
  if (results.length > 0) {
    // id = results[0]._id;
    var collectionName = "Workouts";
    // if trainerID needs updating
    if (workoutName) {
      db.collection(collectionName).updateOne(
        { _id: ObjectId(id)  },
        { $set: { workoutName: workoutName } }
      );
    }
    // if email needs updating
    if (date) {
      db.collection(collectionName).updateOne(
        { _id: ObjectId(id)  },
        { $set: { date: date } }
      );
    }
    // if firstName needs updating
    if (comment) {
      db.collection(collectionName).updateOne(
        { _id: ObjectId(id)  },
        { $set: { comment: comment } }
      );
    }
    // if middleName needs updating
    if (rating) {
      db.collection(collectionName).updateOne(
        { _id: ObjectId(id)  },
        { $set: { rating: rating } }
      );
    }
    // if lastName needs updating
    if (timeToComplete) {
      db.collection(collectionName).updateOne(
        { _id: ObjectId(id)  },
        { $set: { timeToComplete: timeToComplete } }
      );
    }
    // if height needs updating
    if (trainerEmail) {
      db.collection(collectionName).updateOne(
        { _id: ObjectId(id)  },
        { $set: { trainerEmail: trainerEmail } }
      );
    }
    // if weight needs updating
    if (exercises) {
      db.collection(collectionName).updateOne(
        { _id: ObjectId(id)  },
        { $set: { exercises: exercises } }
      );
    }
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
