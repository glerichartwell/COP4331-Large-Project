// view-client-mood.api.js - View Client Mood Endpoint

// setting up middleware
require("dotenv").config();
const express = require("express");
const client = require("../db");
const router = express.Router();

router.post("/api/view-client-mood", async (req, res) => {
  // incoming: client's email
  // outgoing: clients or error

  var error = "";
  const { email } = req.body;
  const db = client.db();

  // get clients
  const client = await db
    .collection("Clients")
    .find({ email: email.toLowerCase() })
    .toArray();

  if (client.length == 0) {
    error = "No client";
  } else {
    if (client[0].mood.length == 0) {
      error = "No moods for this client";
    } else {
      results = client[0].mood;
    }
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
