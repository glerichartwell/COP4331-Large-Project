import React from "react";
import { useState, useEffect } from "react";
import "./ClientDisplay.css";

import { getAuth, onAuthStateChanged } from "@firebase/auth";

import { Box } from "@mui/system";
import Grid from "@mui/material/Grid";
import { Divider } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

import AddClient from "./AddClient";
import ClientCard from "./ClientCard2";
import ClientInfoView from "./ClientInfoView";

const ClientDisplay = () => {
  // allow results of api to be rendered on page after loading
  const [arrayChange, setArrayChange] = useState();
  const [objectArray, setObjectArray] = useState();
  const [showAddClient, setShowAddClient] = useState(false);
  const [showClientDash, setShowClientDash] = useState(false);
  const [clientDashHolder, setClientDashHolder] = useState();
  // const [cardNumber, setCardNumber] = useState(0);

  const openAddClient = () => {
    setShowAddClient(true);
  };
  const closeAddClient = () => {
    setShowAddClient(false);
  };


  //firebase component to return trainer profile info
  var trainerID = 'g.erichartwell@gmail.com'; //getFirebaseID()
  
  const handleClick = e => {
    e.stopPropagation();
  };
  
  var trainerID = null;
  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    console.log(user);
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      trainerID = user['email'];
      console.log("TrainerID: ", trainerID)
      // ...
    } else {
      
      //navigate('/access-denied')
    }
  });

  var clients;
  var cardArray = [];
  var objects = [];
  var cardNumber = 0;

  const getClients = async (event) => {
    
    //event.preventDefault();

    var obj1 = { trainerID: trainerID };
    var js = JSON.stringify(obj1);
    try {
      const response = await fetch(
        "http://localhost:5000/api/view-clients-by-trainer", 
        {
          method: "POST",
          body: js,
          headers: { "Content-Type": "application/json" },
        }
      );
      var txt = await response.text();
      var res = JSON.parse(txt);
      clients = res;

      // save number of clients
      const numClients = clients.results.length;

      // Convert to obj literal {}, current is causing error
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
      for (i = 0; i < numClients; i++) {
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
            <ClientCard
              prop={objects[i]}
              openClientDash={openClientDash}
              closeClientDash={closeClientDash}
            />
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

  const DisplayClients = () => {

    // allow results of api to be rendered on page after loading
    useEffect(() => {
      console.log("render array changed");
      getClients()
        .then((result) => setArrayChange(cardArray))
        .then((result) => setObjectArray(objects));
    }, []);

    //firebase component to return trainer profile info
    // var trainerID = 1; //getFirebaseID()
  };

  const openClientDash = (num) => {
    console.log("opening dashboard for card number: " + num);
    console.log("opening dashboard for card name: " + objects[num].firstName);
    cardNumber = num;
    console.log(num);
    console.log(cardNumber);
    setClientDashHolder(
      <ClientInfoView
        closeClientDash={closeClientDash}
        useCardNumber={objects[num].firstName}
      />
    );
    setShowClientDash(true);
  };

  const closeClientDash = () => {
    setShowClientDash(false);
    console.log("closing dash");
  };

  return (
    <div>
      <Divider />
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

        {showAddClient ? <AddClient closeAddClient={closeAddClient} /> : null}


        {/* loop through json of clients and create components */}
        {DisplayClients()}
        {arrayChange}

        {showClientDash ? clientDashHolder : null}
      </Grid>
    </div>
  );
};

export default ClientDisplay;
