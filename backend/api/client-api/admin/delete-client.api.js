// delete-client.api.js - Delete Client Endpoint

// setting up middleware
require("dotenv").config();
const express = require("express");
const client = require("../../../db");
const router = express.Router();

router.delete("/api/delete-client", async (req, res) => {
  // incoming: email
  // outgoing: success or error

  var error = "";
  var results2 = "";
  const { email } = req.body;
  console.log(email)

  try {
    const db = client.db();
    // find client
    const results = await db
      .collection("Clients")
      .find({ email: email.toLowerCase() })
      .toArray();

    if (results.length === 0) {
      error = "Client does not exist";
      // package data
      var ret = {
        results: results2,
        error: error,
      };
      // send data
      res.status(200).json(ret);
    } else {
      var myquery = { email: email.toLowerCase() };
      db.collection("Clients").deleteOne(myquery, function (err, obj) {
        if (err) {
          error = "DB Error";
          console.log(err);
        } else {
          results2 = "Client Deleted";
          // console.log(obj);
        }
        // package data
        var ret = {
          results: results2,
          error: error,
        };
        // send data
        res.status(200).json(ret);
      });
    }
  } catch (e) {
    error = e.toString();
  }
});

module.exports = router;
