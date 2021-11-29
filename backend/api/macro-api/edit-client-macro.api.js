// edit-client-macro.api.js - Edit Client Macro Endpoint

// setting up middleware
const express = require("express");
require("dotenv").config();
const client = require("../../db");
const router = express.Router();

router.patch("/api/edit-client-macro", async (req, res) => {
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
      // update macro
      // if fats need updating
      if (fats) {
        db.collection(collectionName).updateOne(
          { _id: id, "macro.date": date },
          {
            $set: {
              "macro.$.fats": fats,
            },
          }
        );
      }
      // if proteins need updating
      if (proteins) {
        db.collection(collectionName).updateOne(
          { _id: id, "macro.date": date },
          {
            $set: {
              "macro.$.proteins": proteins,
            },
          }
        );
      }
      // if carbs need updating
      if (carbs) {
        db.collection(collectionName).updateOne(
          { _id: id, "macro.date": date },
          {
            $set: {
              "macro.$.carbs": carbs,
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
