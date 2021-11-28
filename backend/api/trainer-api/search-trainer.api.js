// search-trainer.api.js - Search Trainer Endpoint

// setting up middleware
require("dotenv").config();
const express = require("express");
const client = require("../../db");
const router = express.Router();

router.post("/api/search-trainer", async (req, res) => {
  // incoming: email
  // outgoing: success or error

  var error = "";
  var results = "";
  const { email } = req.body;

  try {
    const db = client.db();
    // find trainer
    results = await db
      .collection("Trainers")
      .find({ email: email.toLowerCase() })
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
