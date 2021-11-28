// search-client-by-email.api.js - Search Client By Email Endpoint

// setting up middleware

require("dotenv").config();
const express = require("express");
const client = require("../../db");
const router = express.Router();

router.post("/api/search-client-by-email", async (req, res) => {
  // incoming: email
  // outgoing: success or error

  var error = "";
  var _ret = [];
  const { email } = req.body;

  try {
    const db = client.db();
    if (email == null) {
      ret = {
        error: "You do not have access to this page.",
      };
      res.status(500).json(ret);
      return;
    }

    // find client
    const results = await db
      .collection("Clients")
      .find({ email: email.toLowerCase() })
      .toArray();

    var loopLength = results.length;

    for (var i = 0; i < loopLength; i++) {
      if (results[i]) _ret.push(results[i]);
    }
  } catch (e) {
    error = e.toString();
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
