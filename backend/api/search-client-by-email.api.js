// search-client-by-email.api.js - Search Client By Email Endpoint

// setting up middleware
require("dotenv").config();
const express = require("express");
const client = require("../db");
const router = express.Router();

router.post("/api/search-client-by-email", async (req, res) => {
  // incoming: email
  // outgoing: success or error

  var error = "";
  const { email } = req.body;
  const db = client.db();

  // find client
  const results = await db
    .collection("Clients")
    .find({ email: email.toLowerCase() })
    .toArray();

  // package data
  var ret = {
    results: results,
    error: error,
  };
  // send data
  res.status(200).json(ret);
});

module.exports = router;
