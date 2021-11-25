// server.js

// import middleware
const express = require("express");
const cors = require("cors");
require("dotenv").config();

// client controllers
var addClient = require("./api/add-client.api");
var editClient = require("./api/edit-client.api");
var searchClient = require("./api/search-client.api");
var searchClientByEmail = require("./api/search-client-by-email.api");
var deleteClient = require("./api/delete-client.api");
var viewAllClients = require("./api/view-all-clients.api");
var viewClientsByTrainer = require("./api/view-clients-by-trainer.api");
var viewClientMood = require("./api/view-client-mood.api");
var viewClientRatings = require("./api/view-client-ratings.api");
var viewClientSleep = require("./api/view-client-sleep.api");

// workout controllers
var addWorkout = require("./api/add-workout.api");
var addWorkoutToClient = require("./api/add-workout-to-client.api");
var editWorkout = require("./api/edit-workout.api");
var searchWorkout = require("./api/search-workout.api");
var deleteWorkout = require("./api/delete-workout.api");
var viewAllWorkouts = require("./api/view-all-workouts.api");
var viewClientWorkoutsByWeek = require("./api/view-client-workouts-by-week.api");

// exercise controllers
var addExercise = require("./api/add-exercise.api");
var editExercise = require("./api/edit-exercise.api");
//var searchExercise = require("./api/search-exercise.api");
var deleteExercise = require("./api/delete-exercise.api");
var viewAllExercises = require("./api/view-all-exercises.api");

// trainer controllers
var searchTrainer = require("./api/search-trainer.api");

// request info controller
var requestInformationAPI = require("./api/request-info.api");

const app = express();
app.use(cors());
app.use(express.json());

// client routes
app.use("/", addClient);
app.use("/", editClient);
app.use("/", searchClient);
app.use("/", searchClientByEmail);
app.use("/", deleteClient);
app.use("/", searchClientByEmail);
app.use("/", viewAllClients);
app.use("/", viewClientsByTrainer);
app.use("/", viewClientMood);
app.use("/", viewClientRatings);
app.use("/", viewClientSleep);

// workout routes
app.use("/", addWorkout);
app.use("/", addWorkoutToClient);
app.use("/", editWorkout);
app.use("/", searchWorkout);
app.use("/", deleteWorkout);
app.use("/", viewAllWorkouts);
app.use("/", viewClientWorkoutsByWeek);

// exercise routes
app.use("/", addExercise);
app.use("/", editExercise);
//app.use("/", searchExercise);
app.use("/", deleteExercise);
app.use("/", viewAllExercises);

// trainer routes
app.use("/", searchTrainer);

// request info routes
app.use("/", requestInformationAPI);

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
  next();
});

app.listen(5000); // start Node + Express server on port 4000
