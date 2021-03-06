// view-all-workouts.api.js - View All Workouts Endpoint

// setting up middleware
require("dotenv").config();
const express = require("express");
const client = require("../../db");
const router = express.Router();

router.get("/api/view-all-workouts", async (req, res) => {
  // incoming:
  // outgoing: clients or error

  var error = "";
  var results = "";

  try {
    const db = client.db();
    // get clients
    results = await db.collection("Workouts").find().toArray();

    if (results.length == 0) {
      error = "No Workouts";
    }
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
