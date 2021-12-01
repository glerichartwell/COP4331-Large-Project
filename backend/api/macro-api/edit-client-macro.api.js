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
      .collation({ locale: "en", strength: 2 })
      .toArray();

    // if results, store data
    if (results.length > 0) {
      id = results[0]._id;
      var collectionName = "Clients";
      // if mood needs updating
      const macroResults = await db
        .collection(collectionName)
        .find({ _id: id, "macro.date": date })
        .toArray();

      if (macroResults.length > 0) {
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
