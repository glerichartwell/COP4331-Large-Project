// view-all-client-moods.api.js - View All Client Moods Endpoint

// setting up middleware
require("dotenv").config();
const express = require("express");
const client = require("../../db");
const router = express.Router();

router.post("/api/view-all-client-moods", async (req, res) => {
  // incoming: client's email
  // outgoing: clients or error

  var error = "";
  var results = "";
  const { email } = req.body;

  try {
    const db = client.db();
    // get clients
    const clients = await db
      .collection("Clients")
      .find({ email: email.toLowerCase() })
      .toArray();

    if (clients.length == 0) {
      error = "No client";
    } else {
      if (clients[0].mood.length == 0) {
        error = "No moods for this client";
      } else {
        results = clients[0].mood;
      }
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
