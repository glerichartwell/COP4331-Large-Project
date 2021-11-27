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

  var results;

  // find clients
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

  // package data
  var ret = {
    results: results,
    error: error,
  };
  // send data
  res.status(200).json(ret);
});

module.exports = router;
