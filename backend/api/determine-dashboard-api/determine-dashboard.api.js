// determine-dashboard.api.js - Determine Dashboard Endpoint

// setting up middleware
const express = require("express");
require("dotenv").config();
const client = require("../../db");
const router = express.Router();

router.post("/api/determine-dashboard", async (req, res) => {
  // incoming: email
  // outgoing: true/false, or error

  var error = "";
  var isTrainer = false;
  const { email } = req.body;

  try {
    const db = client.db();
    // get trainer or client from database
    const trainerResults = await db
      .collection("Trainers")
      .find({ email: email })
      .toArray();
    const clientResults = await db
      .collection("Clients")
      .find({ email: email })
      .toArray();

    // Determine if it is a trainer or client logging in.
    const results =
      trainerResults.length > clientResults.length
        ? trainerResults
        : clientResults;

    // if results, store data
    if (results.length > 0) {
      isTrainer = trainerResults.length > clientResults.length ? true : false;
    } else {
      error = "User does not exist";
    }
  } catch (e) {
    error = e.toString();
  }

  // package data
  var ret = {
    isTrainer: isTrainer,
    error: error,
  };
  // send data
  res.status(200).json(ret);
});

module.exports = router;
