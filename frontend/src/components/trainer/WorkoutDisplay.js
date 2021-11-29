import React from "react";
import { useState, useEffect } from "react";

import Grid from "@mui/material/Grid";
import { Divider, TextField, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

import WorkoutCard from "./WorkoutCard2";
import WorkoutEditBox from "./WorkoutEditBox";
import AddWorkout from "./AddWorkout";

import AddIcon from "@mui/icons-material/Add";
import { Button } from "@mui/material";

const WorkoutDisplay = () => {
  // allow results of api to be rendered on page after loading
  const [arrayChange, setArrayChange] = useState();
  const [objectArray, setObjectArray] = useState();
  const [showEditBox, setShowEditBox] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [Edit, setEdit] = useState();
  const [update, setUpdate] = useState(false);
  const [query, setQuery] = useState("");
  const [refresh, setRefresh] = useState(false);
  const [showAddWorkout, setShowAddWorkout] = useState(false);

  const openEditBox = () => {
    setShowEditBox(true);
  };

  //firebase component to return trainer profile info
  var trainerID = "g.erichartwell@gmail.com"; //getFirebaseID()

  var Workouts;
  var cardArray = [];
  var objects = [];
  var cardNumber = 0;

  const deleteWorkout = async (info) => {
    const address = "http://localhost:5000/api/delete-workout";

    var obj1 = { id: info.id };
    var js = JSON.stringify(obj1);

    try {
      const response = await fetch(address, {
        method: "DELETE",
        body: js,
        headers: { "Content-Type": "application/json" },
      });

      var txt = await response.text();
      var res = JSON.parse(txt);

      // after deleting, refresh component
      setRefresh(!refresh);

      if (res.error.length > 0) {
        console.log("API Error: " + res.error);
      } else {
        console.log(info.name + " workout deleted.");
      }
    } catch (error) {
      console.log(error.toString());
    }
  };

  const getWorkouts = async (event) => {
    const address = "http://localhost:5000/api/view-all-workouts";
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
        obj["name"] = Workouts.results[i].name;
        obj["clientID"] = Workouts.results[i].clientID;
        obj["trainerEmail"] = Workouts.results[i].trainerEmail;
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
              deleteCard={deleteCard}
              assignWorkout={assignWorkout}
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

  const searchWorkouts = async (event) => {
    const address = "http://localhost:5000/api/search-workout";

    var obj1 = { name: query };
    var js = JSON.stringify(obj1);

    try {
      const response = await fetch(address, {
        method: "POST",
        body: js,
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
        obj["name"] = Workouts.results[i].name;
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
              deleteCard={deleteCard}
              assignWorkout={assignWorkout}
              closeEditBox={closeEditBox}
            />
          </Grid>
        );
      }

      if (res.error.length > 0) {
        console.log("API Error: " + res.error);
      } else {
        console.log("Workouts returned");
        console.log(Workouts);
      }
    } catch (error) {
      console.log(error.toString());
    }
  };

  const DisplayWorkout = () => {
    useEffect(() => {
      if (query) {
        console.log("Query: ", query);
        // Call search api
        searchWorkouts()
          .then((result) => setArrayChange(cardArray))
          .then((result) => setObjectArray(objects));
      } else {
        console.log("No query: ", query);
        getWorkouts()
          .then((result) => setArrayChange(cardArray))
          .then((result) => setObjectArray(objects));
      }
    }, [query, refresh]);

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
    setRefresh(!refresh);
  };

  const deleteCard = (info) => {
    // pass information from relavent card to editbox
    if (
      window.confirm(
        "Are you sure you would like to permanently delete " + info.name + "?"
      )
    ) {
      deleteWorkout(info);
    }
    // alert("Are you sure you would like to delete " + info.name + "?");
    // // setShowEdit(true);
  };

  // present component to add clients
  const assignWorkout = (info) => {
    console.log("add client adding component dummy");
  }

  const closeAddWorkout = () => {
    setShowAddWorkout(false);
    setRefresh(!refresh);
  };

  const addItem = () => {
    setShowAddWorkout(true);
    setRefresh(!refresh);

  };


  return (
    <div>
      
      {showAddWorkout ? <AddWorkout closeAddWorkout={closeAddWorkout} /> : null}

      <Button
        onClick={addItem}
        variant="outlined"
        sx={{
          position: "fixed",
          right: "21.5vw",
          height: "42px",
          background: "#866d9c",
          borderColor: "#6f4792",
          color: "#ffffff",
          marginLeft: "1px",
          marginTop: "-44px",
          zIndex: 5000,
          "&:hover": {
            background: "#b19cbe",
            borderColor: "#6f4792",
            color: "#6f4792",
          },
        }}
      >
        <AddIcon />
      </Button>
      <TextField
        className="search-bar"
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        variant="outlined"
        size="small"
        InputProps={{
          startAdornment: (
            <InputAdornment>
              <SearchIcon sx={{ color: "white" }} />
            </InputAdornment>
          ),
        }}
        sx={{
          position: "fixed",
          marginLeft: "1px",
          opacity: 0.4,
          right: "1vw",
          marginTop: "-44px",
          zIndex: 5000,
          maxWidth: "30%",
          minWidth: "20%",
          "& .MuiInputBase-root": {
            color: "#300130",
            background: "#ac99be",
          },
          "& label.Mui-focused": {
            color: "white",
          },
          "& .MuiInput-underline:after": {
            borderBottomColor: "white",
          },
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: "#6f4792",
              opacity: 0.3,
            },
            "&:hover fieldset": {
              background: "white",
              borderColor: "white",
            },
            "&.Mui-focused fieldset": {
              borderColor: "#3d013d",
            },
          },
        }}
      />
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
