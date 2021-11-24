// view-clients-by-trainer.api.js - View Clients By Trainer Endpoint

// setting up middleware
require("dotenv").config();
const express = require("express");
const client = require("../db");
const router = express.Router();

router.post("/api/view-clients-by-trainer", async (req, res) => {
  // incoming: trainerID
  // outgoing: clients or error

  var error = "";
  const { trainerID } = req.body;
  const db = client.db();

  // get clients
  const results = await db
    .collection("Clients")
    .find({ trainerID: trainerID.toLowerCase() })
    .toArray();
  // const results = await db.collection("Clients").find().toArray();

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
