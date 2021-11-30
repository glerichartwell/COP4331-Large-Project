// view-client-workouts-by-date-range.api.js - View Client Workouts By Date Range Endpoint

// setting up middleware
require("dotenv").config();
const express = require("express");
const client = require("../../db");
const router = express.Router();

router.post("/api/view-client-workouts-by-date-range", async (req, res) => {
  // incoming: client's email (required), startDate (ISOString), endDate (ISOString)
  // outgoing: clients or error

  var error = "";
  var weeklyWorkouts = [];
  const { email, startDate, endDate } = req.body;

  try {
    const db = client.db();
    // get clients
    const clients = await db
      .collection("Clients")
      .find({ email: email }).collation(
        { locale: 'en', strength: 2 }
      ).toArray();


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
