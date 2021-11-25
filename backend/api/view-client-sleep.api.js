// view-client-sleep.api.js - View Client Sleep Endpoint

// setting up middleware
require("dotenv").config();
const express = require("express");
const client = require("../db");
const router = express.Router();

router.post("/api/view-client-sleep", async (req, res) => {
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
    if (client[0].sleep.length == 0) {
      error = "No sleep ratings for this client";
    } else {
      results = client[0].sleep;
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
