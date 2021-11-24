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
  const { search } = req.body;
  const db = client.db();

  var results, results1, results2;
  var loopLength = 0;
  // find client
  results = await db
    .collection("Clients")
    .find({
      $expr: {
        $regexMatch: {
          input: {
            $concat: ["$firstName", " ", "$lastName", " ", "$email"],
          },
          regex: search,
          options: "i",
        },
      },
    })
    .toArray();
  loopLength += results.length;

  var _ret = [];
  for (var i = 0; i < loopLength; i++) {
    if (results && results[i]) _ret.push(results[i]);
    if (results1 && results1[i]) _ret.push(results1[i]);
    if (results2 && results2[i]) _ret.push(results2[i]);
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
