import React from "react";
import { useState, useEffect } from "react";

import Grid from "@mui/material/Grid";
import { Divider } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

import AddWorkout from "./AddWorkout";
import WorkoutCard from "./WorkoutCard2";
import WorkoutEditBox from "./WorkoutEditBox";

const WorkoutDisplay = () => {
  // allow results of api to be rendered on page after loading
  const [arrayChange, setArrayChange] = useState();
  const [objectArray, setObjectArray] = useState();
  const [showAddWorkout, setShowAddWorkout] = useState(false);
  const [showEditBox, setShowEditBox] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [Edit, setEdit] = useState();
  const [update, setUpdate] = useState(false);

  // const [cardNumber, setCardNumber] = useState(0);

  const openEditBox = () => {
    setShowEditBox(true);
  };
  const refresh = () => {
    setUpdate((update) => !update);
    console.log(update);
  }

  //firebase component to return trainer profile info
  var trainerID = "g.erichartwell@gmail.com"; //getFirebaseID()

  var Workouts;
  var cardArray = [];
  var objects = [];
  var cardNumber = 0;

  const getWorkout = async (event) => {
    const address = "http://localhost:5000/api/view-all-Workouts";
    //event.preventDefault();

    var obj1 = { trainerID: trainerID };
    var js = JSON.stringify(obj1);

    try {
      const response = await fetch(address, {
        method: "GET",
        // body: js,
        headers: { "Content-Type": "application/json" },
      });

      var txt = await response.text();
      var res = JSON.parse(txt);
      Workouts = res;

      // save number of Workouts
      const numWorkouts = Workouts.results.length;

      for (var i = 0; i < numWorkouts; i++) {

        var obj = new Object();
        obj["cardNumber"] = i;
        obj["id"] = Workouts.results[i]._id;
        obj["workoutName"] = Workouts.results[i].workoutName;
        obj["clientID"] = Workouts.results[i].clientID;
        obj["trainerEmail"] = Workouts.results[i].trainerID;
        obj["exercises"] = Workouts.results[i].exercises;
        obj["date"] = Workouts.results[i].date;
        obj["timeToComplete"] = Workouts.results[i].timeToComplete;
        obj["numExercises"] = Workouts.results[i].numExercises;
        obj["comment"] = Workouts.results[i].comment;
        obj["rating"] = Workouts.results[i].rating;
        objects.push(obj);
      }
      //can access numWorkouts from trainer database
      for (var i = 0; i < numWorkouts; i++) {
        cardArray.push(
          <Grid
            key={objects[i].id}
            className="custom-cards"
            textAlign="center"
            item
            width="3px"
            xs={12}
            sm={6}
            md={4}
            lg={3}
          >
            <WorkoutCard
              dbInfo={objects[i]}
              // opens edit box
              edit={edit}
              closeEditBox={closeEditBox}
            />
          </Grid>
        );
      }

      if (res.error.length > 0) {
        console.log("API Error: " + res.error);
      } else {
        console.log("Workouts returned");
      }
    } catch (error) {
      console.log(error.toString());
    }
  };

  const DisplayWorkout = () => {
    // console.log("render");

    // allow results of api to be rendered on page after loading
    useEffect(() => {
      console.log("render array changed");
      getWorkout()
        .then((result) => setArrayChange(cardArray))
        .then((result) => setObjectArray(objects));
    }, []);

    //firebase component to return trainer profile info
    // var trainerID = 1; //getFirebaseID()
  };

  const edit = (info) => {
    // pass information from relavent card to editbox
    setEdit(<WorkoutEditBox closeEditBox={closeEditBox} info={info} />);
    setShowEdit(true);
  };

  const closeEditBox = () => {
    setShowEdit(false);
    refresh();
  };

  return (
    <div>
      <Grid
        container
        className="outerContainer"
        spacing={4}
        paddingTop="1%"
        direction="row"
        justify="flex-start"
        alignItems="flex-start"
        alignContent="stretch"
        wrap="wrap"
      >
        {/* loop through json of Workouts and create components */}
        {DisplayWorkout()}
        {arrayChange}

        {showEdit ? Edit : null}
      </Grid>
    </div>
  );
};

export default WorkoutDisplay;
