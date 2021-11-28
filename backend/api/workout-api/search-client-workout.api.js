// search-client-workout.api.js - Search Client Workout Endpoint

// setting up middleware

require("dotenv").config();
const express = require("express");
const client = require("../../db");
const router = express.Router();

router.post("/api/search-client-workout", async (req, res) => {
  // incoming: email, date
  // outgoing: success or error

  var error = "";
  var _ret = [];
  const { email, date } = req.body;

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
      .find({
        "workout.date": date,
        email: email,
        workout: { $elemMatch: { date: date } },
      })
      .toArray();

    if (results.length > 0) {
      var loopLength = results[0].workout.length;
      for (var i = 0; i < loopLength; i++) {
        if (results[0].workout[i].date === date) {
          _ret.push(results[0].workout[i]);
        }
      }
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
