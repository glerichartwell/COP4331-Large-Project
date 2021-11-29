// search-exercise.api.js - Search Exercises Endpoint

// setting up middleware
require("dotenv").config();
const express = require("express");
const client = require("../../db");
const router = express.Router();

router.post("/api/search-exercise", async (req, res) => {
  // incoming: name
  // outgoing: success or error

  var error = "";
  var results = "";
  const { name } = req.body;

  try {
    const db = client.db();
    // find exercises
    results = await db
      .collection("Exercises")
      .find({ name: { $regex: name + ".*", $options: "i" } })
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
