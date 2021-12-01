// edit-client-sleep.api.js - Edit Client Sleep Endpoint

// setting up middleware
const express = require("express");
require("dotenv").config();
const client = require("../../db");
const router = express.Router();

router.patch("/api/edit-client-sleep", async (req, res) => {
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
      .collation({ locale: "en", strength: 2 })
      .toArray();

    // if results, store data
    if (results.length > 0) {
      id = results[0]._id;
      var collectionName = "Clients";
      // if sleep needs updating
      const sleepResults = await db
        .collection(collectionName)
        .find({ _id: id, "sleep.date": date })
        .toArray();

      if (sleepResults.length > 0) {
        db.collection(collectionName).updateOne(
          { _id: id, "sleep.date": date },
          {
            $set: {
              "sleep.$.rating": rating,
            },
          }
        );
      } else {
        db.collection(collectionName).updateOne(
          { _id: id },
          {
            $push: {
              sleep: {
                date: date,
                rating: rating,
              },
            },
          }
        );
      }
    } else {
      error = "Client does not exist";
    }
  } catch (e) {
    error = e.toString();
  }

  // package data
  var ret = {
    status: 200,
    error: error,
  };
  // send data
  res.status(200).json(ret);
});

module.exports = router;
