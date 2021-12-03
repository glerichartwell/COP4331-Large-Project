// server.js


const PORT = process.env.PORT || 5000

// import middleware
const express = require("express");
const cors = require("cors");
require("dotenv").config();

// client admin controllers
var searchClient = require("./backend/api/client-api/admin/search-client.api");
var deleteClient = require("./backend/api/client-api/admin/delete-client.api");
var viewAllClients = require("./backend/api/client-api/admin/view-all-clients.api");

// client controllers
var addClient = require("./backend/api/client-api/add-client.api");
var editClient = require("./backend/api/client-api/edit-client.api");
var searchClientByEmail = require("./backend/api/client-api/search-client-by-email.api");
var viewClientsByTrainer = require("./backend/api/client-api/view-clients-by-trainer.api");
var fuzzySearchClientByTrainer = require("./backend/api/client-api/fuzzy-search-client-by-trainer.api");

// mood controllers
var addMoodToClient = require("./backend/api/mood-api/add-mood-to-client.api");
var editClientMood = require("./backend/api/mood-api/edit-client-mood.api");
var searchClientMood = require("./backend/api/mood-api/search-client-mood.api");
var viewAllClientMoods = require("./backend/api/mood-api/view-all-client-moods.api");

// sleep controllers
var addSleepToClient = require("./backend/api/sleep-api/add-sleep-to-client.api");
var editClientSleep = require("./backend/api/sleep-api/edit-client-sleep.api");
var searchClientSleep = require("./backend/api/sleep-api/search-client-sleep.api");
var viewAllClientSleep = require("./backend/api/sleep-api/view-all-client-sleep.api");

// macro controllers
var addMacroToClient = require("./backend/api/macro-api/add-macro-to-client.api");
var editClientMacro = require("./backend/api/macro-api/edit-client-macro.api");
var searchClientMacro = require("./backend/api/macro-api/search-client-macro.api");
var viewAllClientMacro = require("./backend/api/macro-api/view-all-client-macros.api");

// workout controllers
var addWorkoutToClient = require("./backend/api/workout-api/add-workout-to-client.api");
var addWorkout = require("./backend/api/workout-api/add-workout.api");
var deleteWorkoutFromClient = require("./backend/api/workout-api/delete-workout-from-client.api");
var deleteWorkout = require("./backend/api/workout-api/delete-workout.api");
var editClientWorkout = require("./backend/api/workout-api/edit-client-workout.api");
var editWorkout = require("./backend/api/workout-api/edit-workout.api");
var getWorkout = require("./backend/api/workout-api/get-workout.api");
var searchClientWorkout = require("./backend/api/workout-api/search-client-workout.api");
var searchWorkout = require("./backend/api/workout-api/search-workout.api");
var viewAllWorkouts = require("./backend/api/workout-api/view-all-workouts.api");
var viewClientWorkoutsByWeek = require("./backend/api/workout-api/view-client-workouts-by-week.api");
var viewClientWorkoutsByDateRange = require("./backend/api/workout-api/view-client-workouts-by-date-range.api");

// exercise controllers
var addExerciseToWorkout = require("./backend/api/exercise-api/add-exercise-to-workout.api");
var addExercise = require("./backend/api/exercise-api/add-exercise.api");
var deleteExerciseFromWorkout = require("./backend/api/exercise-api/delete-exercise-from-workout.api");
var deleteExercise = require("./backend/api/exercise-api/delete-exercise.api");
var editExercise = require("./backend/api/exercise-api/edit-exercise.api");
var editWorkoutExercise = require("./backend/api/exercise-api/edit-workout-exercise.api");
var getAllExercisesForWorkout = require("./backend/api/exercise-api/get-all-exercises-for-workout.api");
var getExercise = require("./backend/api/exercise-api/get-exercise.api");
var searchExercise = require("./backend/api/exercise-api/search-exercise.api");
var viewAllExercises = require("./backend/api/exercise-api/view-all-exercises.api");

// trainer controllers
var searchTrainer = require("./backend/api/trainer-api/search-trainer.api");

// request info controller
var requestInformationAPI = require("./backend/api/request-info-api/request-info.api");

// determine dashboard controller
var determineDashboardAPI = require("./backend/api/determine-dashboard-api/determine-dashboard.api");

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
app.use("/", fuzzySearchClientByTrainer);

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
app.use("/", viewAllClientMacro);

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
app.use("/", viewClientWorkoutsByDateRange);

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


const path = require('path')

const whitelist = ['http://localhost:3000', 'http://localhost:5000', 'http://courtneygenix.herokuapp.com']
const corsOptions = {
  origin: function (origin, callback) {
    console.log("** Origin of request " + origin)
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      console.log("Origin acceptable")
      callback(null, true)
    } else {
      console.log("Origin rejected")
      callback(new Error('Not allowed by CORS'))
    }
  }
}

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

app.use(express.static('build'));


// AFTER defining routes: Anything that doesn't match what's above, send back index.html; (the beginning slash ('/') in the string is important!)
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '/build/index.html'))
})
app.listen(PORT); // start Node + Express server on port 4000
console.log("listening", PORT);
