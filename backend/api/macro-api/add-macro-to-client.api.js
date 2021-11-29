// add-macro-to-client.api.js - Add Macro To Client API Endpoint

// setting up middleware and hashing
const express = require("express");
require("dotenv").config();
const client = require("../../db");
const router = express.Router();

router.post("/api/add-macro-to-client", async (req, res) => {
  // incoming: email (required),
  // date, fats, proteins, carbs
  // outgoing: error
  var error = "";
  const { email, date, fats, proteins, carbs } = req.body;

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
      // push to macro
      db.collection(collectionName).update(
        { _id: id },
        {
          $push: {
            macro: {
              date: date,
              fats: fats,
              proteins: proteins,
              carbs: carbs,
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
