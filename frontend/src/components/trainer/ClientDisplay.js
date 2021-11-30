import React from "react";
import { useState, useEffect } from "react";
import "./css/ClientDisplay.css";

import { getAuth, onAuthStateChanged } from "@firebase/auth";

import { Box } from "@mui/system";
import Grid from "@mui/material/Grid";
import { Divider, TextField, InputAdornment } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from '@mui/icons-material/Search'; 

import AddClient from "./AddClient";
import ClientCard from "./ClientCard2";
import ClientInfoView from "../client/ClientInfoView";
import { Button } from "@mui/material";

const ClientDisplay = props => {
  // allow results of api to be rendered on page after loading
  const [arrayChange, setArrayChange] = useState();
  const [objectArray, setObjectArray] = useState();
  const [showAddClient, setShowAddClient] = useState(false);
  const [showClientDash, setShowClientDash] = useState(false);
  const [clientDashHolder, setClientDashHolder] = useState();
  const [query, setQuery] = useState('');
  const [refresh, setRefresh] = useState(false);
  

  const openAddClient = () => {
    setShowAddClient(true);
  };
  const closeAddClient = () => {
    setShowAddClient(false);
    setRefresh(!refresh);
  };

  //firebase component to return trainer profile info

  const handleClick = (e) => {
    e.stopPropagation();
  };

  // var trainerID = "";
  // const auth = getAuth();
  // onAuthStateChanged(auth, (user) => {
  //   // console.log(user);
  //   if (user) {
  //     // User is signed in, see docs for a list of available properties
  //     // https://firebase.google.com/docs/reference/js/firebase.User
  //     trainerID = user["email"];
  //     console.log("Auth TrainerID: ", trainerID);
  //     // ...
  //   } else {
  //     //navigate('/access-denied')
  //   }
  // });

  var clients;
  var cardArray = [];
  var objects = [];
  var cardNumber = 0;

  const getClients = async (event) => {

    var obj1 = { trainerID: props.trainerID };
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
        obj["email"] = clients.results[i].email;
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
            key={objects[i].key}
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
              info={objects[i]}
              openClientDash={openClientDash}
              closeClientDash={closeClientDash}
              deleteCard={deleteCard}
            />
          </Grid>
        );
      }
      // console.log(cardArray);

      if (res.error.length > 0) {
        console.log("API Error: " + res.error);
      } else {
        console.log("Clients returned");
      }
    } catch (error) {
      console.log(error.toString());
    }
  };

  const searchClients = async event => {

    var obj1 = { search: query };
    var js = JSON.stringify(obj1);

    try {
      const response = await fetch(
        "http://localhost:5000/api/search-client",
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
            key={objects[i].key}
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
              info={objects[i]}
              openClientDash={openClientDash}
              closeClientDash={closeClientDash}
              deleteCard={deleteCard}
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
  }

  const deleteClient = async (info) => {

    const address = "http://localhost:5000/api/delete-client";

    var obj1 = { email: info.email  };
    var js = JSON.stringify(obj1);

    try {

      const response = await fetch(
      address,
       {
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
        console.log("Client " + info.name + " deleted");
      }
    } catch (error) {
      console.log(error.toString());
    }

  };

  const DisplayClients = () => {

    // Either display all clients or display searched clients
    useEffect(() => {
      if (query)
      {
        console.log("Query: ", query)
        // Call search api
        searchClients()
        .then((result) => setArrayChange(cardArray))
        .then((result) => setObjectArray(objects));

      }
      else
      {
        console.log("No query: ", query)
        getClients()
        .then((result) => setArrayChange(cardArray))
        .then((result) => setObjectArray(objects));
      }
    }, [query, refresh])

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

  const deleteCard = (info) => {
    // pass information from relavent card to editbox
    console.log(info)
    if(window.confirm("Are you sure you would like to permanently delete " + info.firstName + " " + info.lastName + "?")){
      deleteClient(info);
    }
    // alert("Are you sure you would like to delete " + info.name + "?");
    // // setShowEdit(true);
  };


  // const Deleting = (info) => {
  //   // allow results of api to be rendered on page after loading
  //   useEffect(() => {
  //     console.log("render array changed");
  //     deleteClient()
  //       .then(getClients())
  //       .then((result) => setArrayChange(cardArray))
  //       .then((result) => setObjectArray(objects));
  //   }, []);

  //   //firebase component to return trainer profile info
  //   // var trainerID = 1; //getFirebaseID()
  // };

  const addItem = () => {
    setShowAddClient(true);
  };

  
  return (
    <div>
      <TextField 
          className='search-bar' 
          type="search" 
          value={query}
          onChange={e => setQuery(e.target.value)}
          variant='outlined' 
          size='small'
          InputProps={{startAdornment: <InputAdornment position='start'><SearchIcon sx={{color: 'white'}}/></InputAdornment>,}}
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
           
            <Button onClick={addItem} variant='outlined' sx={{marginTop:'-44px', zIndex: 5000, position: 'fixed', right: "21.5vw", height: '42px', background: '#866d9c', borderColor: '#6f4792', color: '#ffffff', '&:hover': {background: '#b19cbe', borderColor: '#6f4792', color: '#6f4792'},}}>
              <AddIcon />
            </Button>

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
        {showAddClient ? <AddClient closeAddClient={closeAddClient} /> : null}

      </Grid>
    </div>
  );
};

export default ClientDisplay;
