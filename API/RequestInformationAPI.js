// RequestInformationAPI.js - Request Information Endpoint

// setting up middleware and hashing
const express = require("express");
const cors = require("cors");
require("dotenv").config();
const client = require("../db");
const router = express.Router();
const nodemailer = require("nodemailer");

router.post("/api/requestInformation", async (req, res, next) => {
  // They should input their email, first and last name and then
  // the API should email that information to Courtney. If you
  // could implement it to choose the trainer with the fewest
  // clients already or something like that it would be bonus.

  // incoming: email, firstName, lastName
  // outgoing: email to trainer, success or error

  var error = "";
  var trainerFirstName = "";
  var trainerLastName = "";
  var trainerEmail = "";
  const {
    firstName,
    lastName,
    email,
    phone,
    work,
    goal,
    challengeAnswer,
    seriousness,
    prevTrainer,
    commitAnswer,
  } = req.body;
  const db = client.db();

  // get trainer with lowest number of clients
  const trainerResults = await db
    .collection("Trainer")
    .find()
    .sort({ numClients: 1 })
    .limit(1)
    .toArray();

  // if results, store trainer data
  if (trainerResults.length > 0) {
    trainerEmail = trainerResults[0].email;
    trainerFirstName = trainerResults[0].firstName;
    trainerLastName = trainerResults[0].lastName;

    var informationRequest = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      phone: phone,
      work: work,
      goal: goal,
      challengeAnswer: challengeAnswer,
      seriousness: seriousness,
      prevTrainer: prevTrainer,
      commitAnswer: commitAnswer,
    };
    db.collection("InformationRequests").insertOne(informationRequest);
  } else {
    error = "database error";
  }

  // send email to trainer
  var transporter = nodemailer.createTransport({
    service: process.env.EMAIL,
    auth: {
      user: process.env.ADMINEMAIL,
      pass: process.env.ADMINPASSWORD,
    },
  });

  // prep email to trainer
  var emailToTrainer = {
    from: process.env.ADMINEMAIL,
    to: trainerEmail,
    subject: "CourtneyGenix - New Info Request!",
    text:
      "Hello, " +
      trainerFirstName +
      " " +
      trainerLastName +
      "\n\nA new information request has been made on CourtneyGenix.\n\n" +
      "Requester Data:\n" +
      "First Name: " +
      firstName +
      "\n" +
      "Last Name: " +
      lastName +
      "\n" +
      "Email: " +
      email +
      "\n" +
      "Phone: " +
      phone +
      "\n" +
      "Work: " +
      work +
      "\n" +
      "Goal: " +
      goal +
      "\n" +
      "Challenge Answer: " +
      challengeAnswer +
      "\n" +
      "Seriousness: " +
      seriousness +
      "\n" +
      "Commit Answer: " +
      commitAnswer +
      "\n" +
      "\n\nSincerely, \nAdmin",
  };

  transporter.sendMail(emailToTrainer, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });

  // option to send client a thank you email
  // var emailToClient = {
  //   from: process.env.ADMINEMAIL,
  //   to: clientEmail,
  //   subject: "Thanks For Contacting CourtneyGenix!",
  //   text:
  //     "Hello, " +
  //     trainerFirstName +
  //     " " +
  //     trainerLastName +
  //     "\n\nThank you for your interest in becoming a " +
  //     "client with CourtneyGenix! \n\nOne of our " +
  //     "qualified trainers will be contacting you " +
  //     "shortly with more information on how to begin " +
  //     "your journey towards a healthier lifestyle. " +
  //     "\n\n\nSincerely, \nThe CourtneyGenix Team",
  // };

  // transporter.sendMail(emailToClient, function (error, info) {
  //   if (error) {
  //     console.log(error);
  //   } else {
  //     console.log("Email sent: " + info.response);
  //   }
  // });

  // package data
  var ret = {
    firstName: firstName,
    lastName: lastName,
    email: email,
    error: error,
  };
  // send data
  res.status(200).json(ret);
});

module.exports = router;
