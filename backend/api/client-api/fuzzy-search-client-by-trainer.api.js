// fuzzy-search-client-by-trainer.api.js - Fuzzy Search Client By Trainer Endpoint

// setting up middleware
require("dotenv").config();
const express = require("express");
const client = require("../../db");
const router = express.Router();

router.post("/api/fuzzy-search-client-by-trainer", async (req, res) => {
  // incoming: trainerID (trainer's email), firstName, lastName, email
  // outgoing: success or error

  var error = "";
  const { trainerID, search } = req.body;

  var results = "";

  try {
    const db = client.db();
    // find clients
    results = await db
      .collection("Clients")
      .find({
        $and: [
          { trainerID: trainerID },
          {
            $expr: {
              $regexMatch: {
                input: {
                  $concat: ["$firstName", " ", "$lastName", " ", "$email"],
                },
                regex: search,
                options: "i",
              },
            },
          },
        ],
      })
      .collation({ locale: "en", strength: 2 }).toArray();
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
