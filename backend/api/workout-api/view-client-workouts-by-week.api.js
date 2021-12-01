// view-client-workouts-by-week.api.js - View Client Workouts Endpoint

// setting up middleware
require("dotenv").config();
const express = require("express");
const client = require("../../db");
const router = express.Router();

router.post("/api/view-client-workouts-by-week", async (req, res) => {
  // incoming: client's email (required), startDate (ISOString)
  // outgoing: clients or error

  var error = "";
  var weeklyWorkouts = [];
  const { email, startDate } = req.body;

  try {
    const db = client.db();
    // get clients
    const clients = await db
      .collection("Clients")
      .find({ email: email}).collation(
        { locale: 'en', strength: 2 }
      ).toArray();

    // receive iso startDate string and get date range
    var getDateBounds = new Date(startDate);
    console.log(getDateBounds.toISOString());
    var endDate = getDateBounds.setDate(getDateBounds.getDate() + 6);
    endDate = new Date(endDate).toISOString();
    console.log(endDate);

    if (clients && clients.length == 0) {
      error = "No clients";
    } else {
      if (clients[0].workout.length == 0) {
        error = "No workouts for this client";
      } else {
        // get workouts within date range
        const clients = await db
          .collection("Clients")
          .find({ email: email }).collation(
            { locale: 'en', strength: 2 }
          ).toArray();
        for (var i = 0; i < clients[0].workout.length; i++) {
          var dateToCheck = clients[0].workout[i].date;
          if (dateToCheck <= endDate && dateToCheck >= startDate) {
            weeklyWorkouts.push(clients[0].workout[i]);
          }
        }
      }
    }
  } catch (e) {
    error = e.toString();
  }

  // package data
  var ret = {
    results: weeklyWorkouts,
    error: error,
  };

  // send data
  res.status(200).json(ret);
});

module.exports = router;
