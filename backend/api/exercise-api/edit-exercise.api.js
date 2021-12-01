// edit-exercise.api.js - Edit Exercise Endpoint

// setting up middleware
require("dotenv").config();
const express = require("express");
const client = require("../../db");
const router = express.Router();
const ObjectId = require("mongodb").ObjectId;

router.patch("/api/edit-exercise", async (req, res) => {
  // incoming: exerciseID, name, sets, reps, time, weight, rest
  // outgoing: success or error

  var error = "";
  const { id, name, sets, reps, time, weight, height, rest } = req.body;

  try {
    const db = client.db();
    // get client from database
    const results = await db
      .collection("Exercises")
      .find({ _id: ObjectId(id) })
      .toArray();

    // if results, store data
    if (results.length > 0) {
      // id = results[0]._id;
      var collectionName = "Exercises";
      // if name needs updating
      if (name) {
        db.collection(collectionName).updateOne(
          { _id: ObjectId(id) },
          { $set: { name: name } }
        );
      }
      // if sets needs updating
      if (sets) {
        db.collection(collectionName).updateOne(
          { _id: ObjectId(id) },
          { $set: { sets: sets } }
        );
      }
      // if reps needs updating
      if (reps) {
        db.collection(collectionName).updateOne(
          { _id: ObjectId(id) },
          { $set: { reps: reps } }
        );
      }
      // if time needs updating
      if (time) {
        db.collection(collectionName).updateOne(
          { _id: ObjectId(id) },
          { $set: { time: time } }
        );
      }
      // if weight needs updating
      if (weight) {
        db.collection(collectionName).updateOne(
          { _id: ObjectId(id) },
          { $set: { weight: weight } }
        );
      }
      // if height needs updating
      if (height) {
        db.collection(collectionName).updateOne(
          { _id: ObjectId(id) },
          { $set: { height: height } }
        );
      }
      // if rest needs updating
      if (rest) {
        db.collection(collectionName).updateOne(
          { _id: ObjectId(id) },
          { $set: { rest: rest } }
        );
      }
    } else {
      error = "Exercise does not exist";
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
