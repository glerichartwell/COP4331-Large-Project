// add-mood-to-client.api.js - Add Mood To Client API endpoint

// setting up middleware and hashing
const express = require("express");
require("dotenv").config();
const client = require("../../db");
const router = express.Router();

router.post("/api/add-mood-to-client", async (req, res) => {
  // incoming: email (required),
  // date, rating
  // outgoing: error
  var error = "";
  const { email, date, rating } = req.body;

  try {
    const db = client.db();
    // get client from database
    const results = await db
      .collection("Clients")
      .find({ email: email })
      .toArray();

    // if results, store data
    if (results.length > 0) {
      id = results[0]._id;
      var collectionName = "Clients";
      // push to mood
      db.collection(collectionName).updateOne(
        { _id: id },
        {
          $push: {
            mood: {
              date: date,
              rating: rating,
            },
          },
        }
      );
    } else {
      error = "Client does not exist";
    }
  } catch (e) {
    error = e.toString();
  }

  // package data
  var ret = {
    error: error,
  };
  // send data
  res.status(200).json(ret);
});

module.exports = router;
