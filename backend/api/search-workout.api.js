// search-workout.api.js - Search Workouts Endpoint

// setting up middleware
require("dotenv").config();
const express = require("express");
const client = require("../db");
const router = express.Router();

router.post("/api/search-workout", async (req, res) => {
  // incoming: name
  // outgoing: success or error

  var error = "";
  const { name } = req.body;
  const db = client.db();

  // find trainer
  const results = await db
    .collection("Workouts")
    .find({ name: name.toLowerCase() })
    .toArray();

  // package data
  var ret = {
    results: results,
    error: error,
  };
  // send data
  res.status(200).json(ret);
});

module.exports = router;
