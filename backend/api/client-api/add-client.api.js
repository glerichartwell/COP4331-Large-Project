// add-client.api.js - Add Client Endpoint

// setting up middleware
require("dotenv").config();
const express = require("express");
const client = require("../../db");
const router = express.Router();
const nodemailer = require("nodemailer");

router.post("/api/add-client", async (req, res) => {
  // incoming: trainerID (trainer's email), email
  // outgoing: email, success or error

  var error = "";
  const { trainerID, email } = req.body;

  try {
    const db = client.db();
    // check if email is already associated with a trainer or client
    const trainerResults = await db
      .collection("Trainers")
      .find({ email: email }).collation(
        { locale: 'en', strength: 2 }
      ).toArray();
    const clientResults = await db
      .collection("Clients")
      .find({ email: email }).collation(
        { locale: 'en', strength: 2 }
      ).toArray();

    // Determine if trainer or client already exists
    const results =
      trainerResults.length > clientResults.length
        ? trainerResults
        : clientResults;
    // if results,then user already exists
    if (results.length > 0) {
      error = "Error: User already exists.";
    } else {
      var newUser = {
        trainerID: trainerID,
        email: email,
        firstName: "",
        middleName: "",
        lastName: "",
        height: "",
        weight: "",
        gender: "",
        age: "",
        phone: "",
        birthday: "",
        city: "",
        startDate: "",
        lastLoggedIn: "",
        workout: [],
        mood: [],
        sleep: [],
        macro: [],
      };
      db.collection("Clients").insertOne(newUser);

      // send email to trainer
      var transporter = nodemailer.createTransport({
        service: process.env.EMAIL,
        auth: {
          user: process.env.ADMINEMAIL,
          pass: process.env.ADMINPASSWORD,
        },
      });
      // send email to client
      var emailToClient = {
        from: process.env.ADMINEMAIL,
        to: email,
        subject: "Thanks For Contacting CourtneyGenix!",
        text:
          "Hello, future client!" +
          "\n\nPlease click the following link: " +
          "https://courtneygenix.herokuapp.com/register?email=" +
          email +
          " to create your account." +
          "\n\n\nSincerely, \nThe CourtneyGenix Team",
      };

      transporter.sendMail(emailToClient, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log("Email sent: " + info.response);
        }
      });
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
