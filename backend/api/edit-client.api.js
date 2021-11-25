// editclient.api.js - Edit Client Endpoint

// setting up middleware
const express = require("express");
require("dotenv").config();
const client = require("../db");
const router = express.Router();

router.patch("/api/edit-client", async (req, res) => {
  // incoming: email (required), trainerID, firstName, middleName, lastName,
  // height, weight, gender, age, phone, birthday, city, startDate, lastLoggedIn, workouts
  // outgoing: error
  var error = "";
  const {
    trainerID,
    email,
    firstName,
    middleName,
    lastName,
    height,
    weight,
    gender,
    age,
    phone,
    birthday,
    city,
    startDate,
    lastLoggedIn,
    workouts,
    ratings,
    sleep,
    mood,
  } = req.body;
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
    // if trainerID needs updating
    if (trainerID) {
      db.collection(collectionName).updateOne(
        { _id: id },
        { $set: { trainerID: trainerID } }
      );
    }
    // // if email needs updating
    if (email) {
      db.collection(collectionName).updateOne(
        { _id: id },
        { $set: { email: email } }
      );
    }
    // if firstName needs updating
    if (firstName) {
      db.collection(collectionName).updateOne(
        { _id: id },
        { $set: { firstName: firstName } }
      );
    }
    // if middleName needs updating
    if (middleName) {
      db.collection(collectionName).updateOne(
        { _id: id },
        { $set: { middleName: middleName } }
      );
    }
    // if lastName needs updating
    if (lastName) {
      db.collection(collectionName).updateOne(
        { _id: id },
        { $set: { lastName: lastName } }
      );
    }
    // if height needs updating
    if (height) {
      db.collection(collectionName).updateOne(
        { _id: id },
        { $set: { height: height } }
      );
    }
    // if weight needs updating
    if (weight) {
      db.collection(collectionName).updateOne(
        { _id: id },
        { $set: { weight: weight } }
      );
    }
    // if gender needs updating
    if (gender) {
      db.collection(collectionName).updateOne(
        { _id: id },
        { $set: { gender: gender } }
      );
    }
    // if age needs updating
    if (age) {
      db.collection(collectionName).updateOne(
        { _id: id },
        { $set: { age: age } }
      );
    }
    // if phone needs updating
    if (phone) {
      db.collection(collectionName).updateOne(
        { _id: id },
        { $set: { phone: phone } }
      );
    }
    // if birthday needs updating
    if (birthday) {
      db.collection(collectionName).updateOne(
        { _id: id },
        { $set: { birthday: birthday } }
      );
    }
    // if city needs updating
    if (city) {
      db.collection(collectionName).updateOne(
        { _id: id },
        { $set: { city: city } }
      );
    }
    // if startDate needs updating
    if (startDate) {
      db.collection(collectionName).updateOne(
        { _id: id },
        { $set: { startDate: startDate } }
      );
    }
    // if lastLoggedIn needs updating
    if (lastLoggedIn) {
      db.collection(collectionName).updateOne(
        { _id: id },
        { $set: { lastLoggedIn: lastLoggedIn } }
      );
    }
    // if workouts needs updating
    if (workouts) {
      db.collection(collectionName).updateOne(
        { _id: id },
        { $set: { workouts: workouts } }
      );
    }
    // if ratings needs updating
    if (ratings) {
      db.collection(collectionName).updateOne(
        { _id: id },
        { $set: { ratings: ratings } }
      );
    }
    // if mood needs updating
    if (mood) {
      db.collection(collectionName).updateOne(
        { _id: id },
        { $set: { mood: mood } }
      );
    }
    // if sleep needs updating
    if (sleep) {
      db.collection(collectionName).updateOne(
        { _id: id },
        { $set: { sleep: sleep } }
      );
    }
  } else {
    error = "Client does not exist";
  }
  // package data
  var ret = {
    status: 200,
    error: "",
  };
  // send data
  res.status(200).json(ret);
});

module.exports = router;
