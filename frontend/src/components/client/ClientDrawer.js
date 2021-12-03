import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import { styled, alpha } from "@mui/material/styles";
import SelectInput from "@mui/material/Select/SelectInput";
import "./css/ClientDrawer.css";
import { getAuth, signOut, onAuthStateChanged } from "@firebase/auth";

import {
  AppBar,
  CssBaseline,
  Divider,
  Drawer,
  List,
  ListItemIcon,
  ListItem,
  ListItemText,
  Toolbar,
  Typography,
  Button,
  Grid,
  TextField,
} from "@mui/material";
import { Box } from "@mui/system";
import EventIcon from "@mui/icons-material/Event";
import PersonIcon from "@mui/icons-material/Person";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import WorkoutDisplay from "./WorkoutDisplay";
import HAWDisplay from "./HAWDisplay";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ClientInfo from "./ClientInfo";

// const address = "https://courtneygenix.herokuapp.com"
const address ="http://localhost:5000"

const ClientDrawer = (props) => {
  const navigate = useNavigate();
  const [showClient, setShowClient] = useState(false);
  const [showWorkout, setShowWorkout] = useState(false);
  const [showHAW, setShowHAW] = useState(false);
  const [clientInfo, setClientInfo] = useState();
  const [refresh, setRefresh] = useState(false);
  const [info, setInfo] = useState();
  const [objects, setObjects] = useState();
  const [firstLoad, setFirstLoad] = useState(true)
  // var obj = new Object();

  const auth = getAuth();
  var email = null;
  var user = null;
  onAuthStateChanged(auth, (firebaseUser) => {
    if (firebaseUser) {
      console.log("Entered here.")
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      user = firebaseUser;
      console.log(user)
      console.log("Signed in")
      email = firebaseUser.email;
      console.log(email)
      // ...
    } else {
      // User is signed out
      // ...
    }
  });

  //change to actual logout function
  const logout = () => {
    signOut(auth);
    navigate(`/`);
  };
  const GetClient = async (event) => {
    
    var obj1 = { email: email };
    var js = JSON.stringify(obj1);
    console.log(js)
    try {
      const response = await fetch(
        address + "/api/search-client-by-email",
        {
          method: "POST",
          body: js,
          headers: { "Content-Type": "application/json" },
        }
      );
      var txt = await response.text();
      var res = JSON.parse(txt);
      console.log("Res: ", res);
      var i = 0;
      var obj = new Object();
      obj["firstName"] = res.results[i].firstName;
      obj["middleName"] = res.results[i].middleName;
      obj["lastName"] = res.results[i].lastName;
      obj["height"] = res.results[i].height;
      obj["weight"] = res.results[i].weight;
      obj["gender"] = res.results[i].gender;
      obj["age"] = res.results[i].age;
      obj["phone"] = res.results[i].phone;
      obj["birthday"] = res.results[i].birthday;
      obj["city"] = res.results[i].city;
      obj["startDate"] = res.results[i].startDate;
      obj["lastLoggedIn"] = res.results[i].lastLoggedIn;
      obj["mood"] = res.results[i].mood;
      obj["sleep"] = res.results[i].sleep;
      obj["email"] = res.results[i].email;

      setObjects(obj);
      console.log(objects);

      if (res.error.length > 0) {
        console.log("API Error: " + res.error);
      } else {
        console.log("Clients returned");
      }
    } catch (error) {
      console.log(error.toString());
    }
  };

  const DashOn = () => {
    GetClient();
    setShowWorkout(false);
    setShowHAW(false);
    setShowClient(true);
  };

  const WorkoutOn = () => {
    setShowClient(false);
    setShowHAW(false);
    setShowWorkout(true);
  };

  const HAWOn = () => {
    setShowClient(false);
    setShowWorkout(false);
    setShowHAW(true);
  };

  const getQueryRef = (value) => {
    setQuery(value);
  };
  // const getClientInfo = () => {
  //   setClientInfo(info);
  // };
  const Display = () => {
    useEffect(() => {
      if (firstLoad) {
        GetClient();
        setFirstLoad(false);
      }
    }, []);
  };

  const [query, setQuery] = useState(null);

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        style={{ background: "#6f4792" }}
        // #C3B1E1
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar sx={{ position: "relative" }}>
          <Typography variant="h6" noWrap component="div">
            Welcome
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: "20vw",
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: "20vw",
            boxSizing: "border-box",
            backgroundColor: "#f8f4fd",
            // #e7d0e7
            borderColor: "purple",
          },
        }}
        variant="permanent" // "persistant" //"permanent"
        anchor="left"
        // open={open}
      >
        <Toolbar />
        <Box sx={{ overflow: "auto" }}>
          <List>
            {/* Buttons on the drawer to change displays */}
            <ListItem button key="Personal Dashboard" onClick={DashOn}>
              <ListItemIcon>
                <PersonIcon />
              </ListItemIcon>
              <ListItemText primary="Personal Dashboard" />
            </ListItem>
            {/* <ListItem button key="Workouts" onClick={WorkoutOn}>
              <ListItemIcon>
                <EventIcon />
              </ListItemIcon>
              <ListItemText primary="Workouts" />
            </ListItem> */}
          </List>
          <Divider />
        </Box>
        <Button onClick={logout} id="logout-btn" variant="outlined">
          Logout
        </Button>
      </Drawer>
      <Box
        component="main"
        bottom="0px"
        right="0px"
        width="80vw"
        height="100vh" //"95vh"
        position="absolute"
        overflow="scroll"
        sx={{ flexGrow: 1, p: 3, backgroundColor: "#f8f4fd" }}
      >
        {Display()}
        <Toolbar />
        {/* code for contents of box area in dashboard */}
        {/* {showWorkout ? <WorkoutDisplay /> : null} */}
        {showClient ? <ClientInfo info={objects} /> : null}
      </Box>
    </Box>
  );
};

export default ClientDrawer;
