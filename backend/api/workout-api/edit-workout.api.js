// edit-workout.api.js - Edit Workout Endpoint

// setting up middleware
require("dotenv").config();
const express = require("express");
const client = require("../../db");
const router = express.Router();
const ObjectId = require("mongodb").ObjectId;

router.patch("/api/edit-workout", async (req, res) => {
  // incoming: id, name, date, comment, timeToComplete, clientEmail
  // outgoing: success or error

  var error = "";
  const { id, name, date, comment, timeToComplete, exercises } = req.body;

  try {
    const db = client.db();
    // get client from database
    const results = await db
      .collection("Workouts")
      .find({ _id: ObjectId(id) })
      .toArray();
    // if results, store data
    if (results.length > 0) {
      // id = results[0]._id;
      var collectionName = "Workouts";
      // if name needs updating
      if (name) {
        db.collection(collectionName).updateOne(
          { _id: ObjectId(id) },
          { $set: { name: name } }
        );
      }
      // if date needs updating
      if (date) {
        db.collection(collectionName).updateOne(
          { _id: ObjectId(id) },
          { $set: { date: date } }
        );
      }
      // if comment needs updating
      if (comment) {
        db.collection(collectionName).updateOne(
          { _id: ObjectId(id) },
          { $set: { comment: comment } }
        );
      }
      // if timeToComplete needs updating
      if (timeToComplete) {
        db.collection(collectionName).updateOne(
          { _id: ObjectId(id) },
          { $set: { timeToComplete: timeToComplete } }
        );
      }
      // if exercises needs updating
      if (exercises) {
        db.collection(collectionName).updateOne(
          { _id: ObjectId(id) },
          { $set: { exercises: exercises } }
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
    error: error,
  };
  // send data
  res.status(200).json(ret);
});

module.exports = router;
