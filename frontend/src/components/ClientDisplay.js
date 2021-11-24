import React from "react";
import { useState, useEffect } from "react";
import "./ClientDisplay.css";

import { Box } from "@mui/system";
import Grid from "@mui/material/Grid";
import { Divider } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

import AddClient from "./AddClient";
import ClientCard from "./ClientCard";

const ClientDisplay = () => {
  // allow results of api to be rendered on page after loading
  const [arrayChange, setArrayChange] = useState();
  const [showAddClient, setShowAddClient] = useState(false);
  
  const openAddClient = () => {
    setShowAddClient(true);
  };
  
  var clients;
  var cardArray = [];
  var objects = [];

  //firebase component to return trainer profile info
  var trainerID = 'g.erichartwell@gmail.com'; //getFirebaseID()
  
  const handleClick = e => {
    e.stopPropagation();
  };
  
  const getClients = async (event) => {
    
    //event.preventDefault();

    var obj1 = { trainerID: trainerID };
    var js = JSON.stringify(obj1);
    console.log(js)
    try {
      const response = await fetch(
        "http://localhost:5000/api/view-clients", 
        {
          method: "POST",
          body: js,
          headers: { "Content-Type": "application/json" },
        }
      );
      var txt = await response.text();
      console.log(txt)
      var res = JSON.parse(txt);
      clients = res;

      // save number of clients
      const numClients = clients.results.length;

      // Convert to obj literal {}, current is causing error
      for (var i = 0; i < numClients; i++) {
        var obj = new Object();
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
            <ClientCard prop={objects[i]} />
          </Grid>
        );
      }
      // setArrayChange(true)

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
    // console.log("render");

    // allow results of api to be rendered on page after loading
    useEffect(() => {
      console.log("render array changed");
      getClients().then((result) => setArrayChange(cardArray));
    }, []);

    //firebase component to return trainer profile info
    // var trainerID = 1; //getFirebaseID()

    //get clients
    // getClients().then(console.log(cardArray));
  };

  // DisplayClients();


  return (
    <div onClick={handleClick}>
      <div>
        <Box sx={{textAlign: 'right'}}>
          <button onClick={openAddClient} className="add-btn" id="addbtn">
            <AddIcon />
          </button>
        </Box>
      </div>
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
        {showAddClient ? <AddClient setShowAddClient={setShowAddClient} /> : null}

        {/* loop through json of clients and create components */}
        {DisplayClients()}
        {arrayChange}
      </Grid>
    </div>
  );
};

export default ClientDisplay;
