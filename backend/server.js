// server.js

// import middleware
const express = require("express");
const cors = require("cors");
require("dotenv").config();

// client admin controllers
var searchClient = require("./api/client-api/admin/search-client.api");
var deleteClient = require("./api/client-api/admin/delete-client.api");
var viewAllClients = require("./api/client-api/admin/view-all-clients.api");

// client controllers
var addClient = require("./api/client-api/add-client.api");
var editClient = require("./api/client-api/edit-client.api");
var searchClientByEmail = require("./api/client-api/search-client-by-email.api");
var viewClientsByTrainer = require("./api/client-api/view-clients-by-trainer.api");

// mood controllers
var addMoodToClient = require("./api/mood-api/add-mood-to-client.api");
var editClientMood = require("./api/mood-api/edit-client-mood.api");
var searchClientMood = require("./api/mood-api/search-client-mood.api");
var viewAllClientMoods = require("./api/mood-api/view-all-client-moods.api");

// sleep controllers
var addSleepToClient = require("./api/sleep-api/add-sleep-to-client.api");
var editClientSleep = require("./api/sleep-api/edit-client-sleep.api");
var searchClientSleep = require("./api/sleep-api/search-client-sleep.api");
var viewAllClientSleep = require("./api/sleep-api/view-all-client-sleep.api");

// macro controllers
var addMacroToClient = require("./api/macro-api/add-macro-to-client.api");
var editClientMacro = require("./api/macro-api/edit-client-macro.api");
var searchClientMacro = require("./api/macro-api/search-client-macro.api");
var viewAllClientMacro = require("./api/macro-api/view-all-client-macro.api");

// workout controllers
var addWorkoutToClient = require("./api/workout-api/add-workout-to-client.api");
var addWorkout = require("./api/workout-api/add-workout.api");
var deleteWorkoutFromClient = require("./api/workout-api/delete-workout-from-client.api");
var deleteWorkout = require("./api/workout-api/delete-workout.api");
var editClientWorkout = require("./api/workout-api/edit-client-workout.api");
var editWorkout = require("./api/workout-api/edit-workout.api");
var getWorkout = require("./api/workout-api/get-workout.api");
var searchClientWorkout = require("./api/workout-api/search-client-workout.api");
var searchWorkout = require("./api/workout-api/search-workout.api");
var viewAllWorkouts = require("./api/workout-api/view-all-workouts.api");
var viewClientWorkoutsByWeek = require("./api/workout-api/view-client-workouts-by-week.api");

// exercise controllers
var addExerciseToWorkout = require("./api/exercise-api/add-exercise-to-workout.api");
var addExercise = require("./api/exercise-api/add-exercise.api");
var deleteExerciseFromWorkout = require("./api/exercise-api/delete-exercise-from-workout.api");
var deleteExercise = require("./api/exercise-api/delete-exercise.api");
var editExercise = require("./api/exercise-api/edit-exercise.api");
var editWorkoutExercise = require("./api/exercise-api/edit-workout-exercise.api");
var getAllExercisesForWorkout = require("./api/exercise-api/get-all-exercises-for-workout.api");
var getExercise = require("./api/exercise-api/get-exercise.api");
var searchExercise = require("./api/exercise-api/search-exercise.api");
var viewAllExercises = require("./api/exercise-api/view-all-exercises.api");

// trainer controllers
var searchTrainer = require("./api/trainer-api/search-trainer.api");

// request info controller
var requestInformationAPI = require("./api/request-info-api/request-info.api");

// determine dashboard controller
var determineDashboardAPI = require("./api/determine-dashboard-api/determine-dashboard.api");

const app = express();
app.use(cors());
app.use(express.json());

// client admin routes
app.use("/", searchClient);
app.use("/", deleteClient);
app.use("/", viewAllClients);

// client routes
app.use("/", addClient);
app.use("/", editClient);
app.use("/", searchClientByEmail);
app.use("/", viewClientsByTrainer);

// mood routes
app.use("/", addMoodToClient);
app.use("/", editClientMood);
app.use("/", searchClientMood);
app.use("/", viewAllClientMoods);

// sleep routes
app.use("/", addSleepToClient);
app.use("/", editClientSleep);
app.use("/", searchClientSleep);
app.use("/", viewAllClientSleep);

// macro routes
app.use("/", addMacroToClient);
app.use("/", editClientMacro);
app.use("/", searchClientMacro);
app.use("/", viewAllClientMacros);

// workout routes
app.use("/", addWorkoutToClient);
app.use("/", addWorkout);
app.use("/", deleteWorkoutFromClient);
app.use("/", deleteWorkout);
app.use("/", editClientWorkout);
app.use("/", editWorkout);
app.use("/", getWorkout);
app.use("/", searchClientWorkout);
app.use("/", searchWorkout);
app.use("/", viewAllWorkouts);
app.use("/", viewClientWorkoutsByWeek);

// exercise routes
app.use("/", addExerciseToWorkout);
app.use("/", addExercise);
app.use("/", deleteExerciseFromWorkout);
app.use("/", deleteExercise);
app.use("/", editExercise);
app.use("/", editWorkoutExercise);
app.use("/", getAllExercisesForWorkout);
app.use("/", getExercise);
app.use("/", searchExercise);
app.use("/", viewAllExercises);

// trainer routes
app.use("/", searchTrainer);

// request info route
app.use("/", requestInformationAPI);

// determine dashboard route
app.use("/", determineDashboardAPI);

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
console.log("listening");
