// search-client.api.js - Search Client Endpoint

// setting up middleware
require("dotenv").config();
const express = require("express");
const client = require("../db");
const router = express.Router();

router.post("/api/search-client", async (req, res) => {
  // incoming: firstName, lastName, email
  // outgoing: success or error

  var error = "";
  const { firstName, lastName, email } = req.body;
  const db = client.db();

  // find client
  const results = await db
    .collection("Clients")
    .find({ firstName: firstName.toLowerCase() })
    .toArray();
  const results1 = await db
    .collection("Clients")
    .find({ lastName: lastName.toLowerCase() })
    .toArray();
  const results2 = await db
    .collection("Clients")
    .find({ email: email.toLowerCase() })
    .toArray();

  var loopLength = results.length + results1.length + results2.length;
  var _ret = [];
  for (var i = 0; i < loopLength; i++) {
    if (results[i]) _ret.push(results[i]);
    if (results1[i]) _ret.push(results1[i]);
    if (results2[i]) _ret.push(results2[i]);
  }

  // package data
  var ret = {
    results: _ret,
    error: error,
  };
  // send data
  res.status(200).json(ret);
});

module.exports = router;
