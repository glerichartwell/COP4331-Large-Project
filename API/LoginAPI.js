// LoginAPI.js - Login Endpoint

// setting up middleware and hashing
const express = require("express");
const cors = require("cors");
require("dotenv").config();
const client = require("../db");
const bcrypt = require("bcrypt");
const router = express.Router();

router.post("/api/login", async (req, res, next) => {
  // incoming: login, password
  // outgoing: id, firstName, lastName, error

  var error = "";
  var id = -1;
  var fn = "";
  var ln = "";
  const { login, password } = req.body;
  const db = client.db();

  // get trainer or client from database no hash
  const trainerResults = await db
    .collection("Trainer")
    .find({ email: login, password: password })
    .toArray();
  const clientResults = await db
    .collection("Client")
    .find({ email: login, password: password })
    .toArray();

  // get trainer or client from database (hash)
  // const trainerResults = await db
  //   .collection("Trainer")
  //   .find({ email: login })
  //   .toArray();
  // const clientResults = await db
  //   .collection("Client")
  //   .find({ email: login })
  //   .toArray();

  // Determine if it is a trainer or client logging in.
  const results =
    trainerResults.length > clientResults.length
      ? trainerResults
      : clientResults;
  var isTrainer = trainerResults.length > clientResults.length ? true : false;

  // Load hash from the db, which was preivously stored
  // bcrypt.compare(password, results[0].password, function (err, res) {
  //   // if res == true, save info
  //   if (res) {
  //     if (results.length > 0) {
  //       id = results[0]._id;
  //       fn = results[0].firstName;
  //       ln = results[0].lastName;
  //     }
  //   } else {
  //     // else wrong password, don't save
  //     isTrainer = false;
  //   }
  // });

  // if results, store data
  if (results.length > 0) {
    id = results[0]._id;
    fn = results[0].firstName;
    ln = results[0].lastName;
    var date = new Date();
    var collectionName = isTrainer > 0 ? "Trainer" : "Client";
    db.collection(collectionName).updateOne(
      { _id: id },
      { $set: { lastLoggedIn: date.toISOString() } }
    );
  }
  // package data
  var ret = {
    id: id,
    firstName: fn,
    lastName: ln,
    isTrainer: isTrainer,
    lastLoggedIn: date.toISOString(),
    error: "",
  };
  // send data
  res.status(200).json(ret);
});

module.exports = router;
