// get-exercise.api.js - Get Exercise Endpoint

// setting up middleware
require("dotenv").config();
const express = require("express");
const client = require("../../db");
const router = express.Router();
const ObjectId = require("mongodb").ObjectId;

router.post("/api/get-exercise", async (req, res) => {
  // incoming: exerciseID
  // outgoing: success or error

  var error = "";
  var results = "";
  const { exerciseID } = req.body;

  try {
    const db = client.db();
    // find exercise
    results = await db
      .collection("Exercises")
      .find({ _id: ObjectId(exerciseID) })
      .toArray();
  } catch (e) {
    error = e.toString();
  }

  // package data
  var ret = {
    results: results,
    error: error,
  };
  // send data
  res.status(200).json(ret);
});

module.exports = router;
