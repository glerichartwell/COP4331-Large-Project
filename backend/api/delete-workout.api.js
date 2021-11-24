// delete-workout.api.js - Delete Workout Endpoint

// setting up middleware
require("dotenv").config();
const express = require("express");
const client = require("../db");
const router = express.Router();

router.delete("/api/delete-workout", async (req, res) => {
  // incoming: workout id
  // outgoing: success or error

  var error = "";
  var results2 = "";
  const { id } = req.body;
  const db = client.db();

  // find client
  const results = await db.collection("Workouts").find({ id: id }).toArray();

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
    var myquery = { email: email.toLowerCase() };
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
