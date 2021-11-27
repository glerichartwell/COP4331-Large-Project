import React from "react";
import { useState, useEffect } from "react";
import "./css/ClientDisplay.css";

import Grid from "@mui/material/Grid";
import { Divider, TextField, InputAdornment } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from '@mui/icons-material/Search'; 


import AddClient from "./AddClient";
import ExerciseCard from "./ExerciseCard2";
import ClientDashboard from "../client/ClientInfoView";
import ExerciseEditBox from "./ExerciseEditBox";

const ExerciseDisplay = () => {
  // allow results of api to be rendered on page after loading
  const [arrayChange, setArrayChange] = useState();
  const [objectArray, setObjectArray] = useState();
  const [showAddClient, setShowAddClient] = useState(false);
  const [showEditBox, setShowEditBox] = useState(false);
  const [clientDashHolder, setClientDashHolder] = useState();
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

  var exercises;
  var cardArray = [];
  var objects = [];
  var cardNumber = 0;

  const getExercise = async (event) => {
    const address = "http://localhost:5000/api/view-all-exercises";
    //event.preventDefault();

    var obj1 = { trainerID: trainerID };
    var js = JSON.stringify(obj1);

    try {
      const response = await fetch(
      address,
       {
        method: "GET",
        // body: js,
        headers: { "Content-Type": "application/json" },
      });

      var txt = await response.text();
      var res = JSON.parse(txt);
      exercises = res;

      // save number of exercises
      const numexercises = exercises.results.length;

      for (var i = 0; i < numexercises; i++) {

        var obj = new Object();
        obj["cardNumber"] = i;
        obj["id"] = exercises.results[i]._id;
        obj["exerciseName"] = exercises.results[i].exerciseName;
        obj["sets"] = exercises.results[i].sets;
        obj["reps"] = exercises.results[i].reps;
        obj["time"] = exercises.results[i].time;
        obj["weight"] = exercises.results[i].weight;
        obj["rest"] = exercises.results[i].rest;
        objects.push(obj);
      }
      //can access numexercises from trainer database
      for (var i = 0; i < numexercises; i++) {
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
            <ExerciseCard
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
        console.log("exercises returned");
      }
    } catch (error) {
      console.log(error.toString());
    }
  };

  const DisplayExercise = () => {
    // console.log("render");

    // allow results of api to be rendered on page after loading
    useEffect(() => {
      console.log("render array changed");
      getExercise()
        .then((result) => setArrayChange(cardArray))
        .then((result) => setObjectArray(objects));
    }, []);

    //firebase component to return trainer profile info
    // var trainerID = 1; //getFirebaseID()
  };

  const edit = (info) => {
    // pass information from relavent card to editbox
    setEdit(<ExerciseEditBox closeEditBox={closeEditBox} info={info} />);
    setShowEdit(true);
  };

  const closeEditBox = () => {
    setShowEdit(false);
    refresh();
  };

  const [query, setQuery] = useState(null);
  return (
    <div>
      <TextField 
          className='search-bar' 
          type="search" 
          value={query}
          onChange={e => setQuery(e.target.value)}
          variant='outlined' 
          size='small'
          InputProps={{startAdornment: <InputAdornment><SearchIcon sx={{color: 'white'}}/></InputAdornment>,}}
          sx={{
              position: 'fixed',
              marginLeft: '1px',
              opacity: 0.4,
              right: '1vw',
              marginTop:'-44px',
              zIndex: 5000,
              maxWidth: '30%',
              minWidth: '20%',
              '& .MuiInputBase-root': {
                color: '#300130',
                background: '#ac99be',
              },
              '& label.Mui-focused': {
                color: 'white',
              },
              '& .MuiInput-underline:after': {
                borderBottomColor: 'white',
              },
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: '#6f4792',
                  opacity: 0.3
                },
                '&:hover fieldset': {
                  background: 'white',
                  borderColor: 'white',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#3d013d',
                },
              },
            }} />
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
        {/* loop through json of exercises and create components */}
        {DisplayExercise()}
        {arrayChange}

        {showEdit ? Edit : null}
      </Grid>
    </div>
  );
};

export default ExerciseDisplay;
