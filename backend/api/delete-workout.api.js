// delete-workout.api.js - Delete Workout Endpoint

// setting up middleware
require("dotenv").config();
const express = require("express");
const client = require("../db");
const router = express.Router();
const ObjectId = require("mongodb").ObjectId;

router.delete("/api/delete-workout", async (req, res) => {
  // incoming: workout id
  // outgoing: success or error

  var error = "";
  var results2 = "";
  const { id } = req.body;
  const db = client.db();

  // find client
  const results = await db
    .collection("Workouts")
    .find({ _id: ObjectId(id) })
    .toArray();

  if (results.length === 0) {
    error = "Workout does not exist";
    // package data
    var ret = {
      results: results2,
      error: error,
    };
    // send data
    res.status(200).json(ret);
  } else {
    var myquery = { _id: ObjectId(id) };
    db.collection("Workouts").deleteOne(myquery, function (err, obj) {
      if (err) {
        error = "DB Error";
        console.log(err);
      } else {
        results2 = "Workout Deleted";
        // console.log(obj);
      }
      // package data
      var ret = {
        results: results2,
        error: error,
      };
      // send data
      res.status(200).json(ret);
    });
  }
});

module.exports = router;
