import React from "react";
import { useState, useEffect } from "react";
import "./ClientDisplay.css";

import Grid from "@mui/material/Grid";
import { Divider } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

import AddClient from "./AddClient";
import ExerciseCard from "./ExerciseCard2";
import ClientDashboard from "./ClientInfoView";
import EditBox from "./EditBox";

const ExerciseDisplay = () => {
  // allow results of api to be rendered on page after loading
  const [arrayChange, setArrayChange] = useState();
  const [objectArray, setObjectArray] = useState();
  const [showAddClient, setShowAddClient] = useState(false);
  const [showEditBox, setShowEditBox] = useState(false);
  const [clientDashHolder, setClientDashHolder] = useState();
  const [showEdit, setShowEdit] = useState(false);
  const [Edit, setEdit] = useState();

  // const [cardNumber, setCardNumber] = useState(0);

  const openEditBox = () => {
    setShowEditBox(true);
  };


  //firebase component to return trainer profile info
  var trainerID = 1; //getFirebaseID()

  var clients;
  var cardArray = [];
  var objects = [];
  var cardNumber = 0;

  const getExercise = async (event) => {
    const address = "http://localhost:5000/api/view-clients";
    //event.preventDefault();

    var obj1 = { trainerID: trainerID };
    var js = JSON.stringify(obj1);

    try {
      const response = await fetch(address, {
        method: "POST",
        body: js,
        headers: { "Content-Type": "application/json" },
      });

      var txt = await response.text();
      var res = JSON.parse(txt);
      clients = res;

      // save number of clients
      const numClients = clients.results.length;

      for (var i = 0; i < numClients; i++) {
        var obj = new Object();
        obj["cardNumber"] = i;
        obj["firstName"] = clients.results[i].firstName;
        obj["middleName"] = clients.results[i].middleName;
        obj["lastName"] = clients.results[i].lastName;
        obj["height"] = clients.results[i].height;
        obj["weight"] = clients.results[i].weight;
        obj["gender"] = clients.results[i].gender;
        obj["age"] = clients.results[i].age;
        obj["phone"] = clients.results[i].phone;
        obj["birthday"] = clients.results[i].birthday;
        obj["city"] = clients.results[i].city;
        obj["startDate"] = clients.results[i].startDate;
        obj["lastLoggedIn"] = clients.results[i].lastLoggedIn;
        objects.push(obj);
      }
      //can access numclients from trainer database
      for (var i = 0; i < numClients; i++) {
        cardArray.push(
          <Grid
            className="custom-cards"
            textAlign="center"
            item
            width="3px"
            xs={12}
            sm={6}
            md={4}
            lg={3}
          >
            <ExerciseCard edit={edit} closeEditBox={closeEditBox}/>
          </Grid>
        );
      }

      if (res.error.length > 0) {
        console.log("API Error: " + res.error);
      } else {
        console.log("Clients returned");
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
    setEdit(<EditBox 
      closeEditBox={closeEditBox}
      info={info}
      />);
    setShowEdit(true);

  };

  const closeEditBox = () => {
    setShowEdit(false);
  }


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
        {/* loop through json of clients and create components */}
        {DisplayExercise()}
        {arrayChange}

        {showEdit ? Edit : null}
      </Grid>
    </div>
  );
};

export default ExerciseDisplay;
