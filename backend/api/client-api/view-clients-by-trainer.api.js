// view-clients-by-trainer.api.js - View Clients By Trainer Endpoint

// setting up middleware
require("dotenv").config();
const express = require("express");
const client = require("../../db");
const router = express.Router();

router.post("/api/view-clients-by-trainer", async (req, res) => {
  // incoming: trainerID (trainer's email)
  // outgoing: clients or error

  var error = "";
  var results = "";
  const { trainerID } = req.body;

  try {
    const db = client.db();
    // get clients
    results = await db
      .collection("Clients")
      .find({ trainerID: trainerID.toLowerCase() })
      .toArray();

    if (results.length == 0) {
      error = "No Clients";
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
