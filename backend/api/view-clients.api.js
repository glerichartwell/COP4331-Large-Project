// view-clients.api.js - View Clients Endpoint

// setting up middleware and hashing
require("dotenv").config();
const express = require("express");
const client = require("../db");
const router = express.Router();

router.get("/api/view-clients", async (req, res) => {
  // incoming:
  // outgoing: clients or error

  var error = "";
  const db = client.db();

  // get clients
  const results = await db.collection("Client").find().toArray();

  if (results.length == 0) {
    error = "No Clients";
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
