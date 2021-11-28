// search-exercise.api.js - Search Exercises Endpoint

// setting up middleware
require("dotenv").config();
const express = require("express");
const client = require("../db");
const router = express.Router();

router.post("/api/search-exercise", async (req, res) => {
  // incoming: name
  // outgoing: success or error

  var error = "";
  const { name } = req.body;
  const db = client.db();

  // find exercises
  const results = await db
    .collection("Exercises")
    .find({ name: { $regex: name + ".*", $options: "i" } })
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
