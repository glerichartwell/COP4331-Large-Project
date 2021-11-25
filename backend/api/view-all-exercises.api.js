// view-all-exercises.api.js - View All Exercises Endpoint

// setting up middleware
require("dotenv").config();
const express = require("express");
const client = require("../db");
const router = express.Router();

router.get("/api/view-all-exercises", async (req, res) => {
  // incoming:
  // outgoing: clients or error

  var error = "";
  const db = client.db();

  // get clients
  const results = await db.collection("Exercises").find().toArray();

  if (results.length == 0) {
    error = "No Excercises";
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
