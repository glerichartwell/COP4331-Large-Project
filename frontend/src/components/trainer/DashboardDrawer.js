import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import "./css/DashboardDrawer.css";
import ClientDisplay from "./ClientDisplay";
import ExerciseDisplay from "./ExerciseDisplay";
import WorkoutDisplay from "./WorkoutDisplay";
import AddClient from "./AddClient";
import SearchBar from "../reuseable/SearchBar";
import AddExercise from "./AddExercise";
import AddWorkout from "./AddWorkout";
import ClientInfo from "./ClientInfo/ClientInfo"
import MacroEditBox from "./ClientInfo/MacroEditBox";

import { makeStyles } from "@material-ui/core/styles";

import SearchIcon from '@mui/icons-material/Search';
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
  TextField,
  InputAdornment,
} from "@mui/material";
import { Box } from "@mui/system";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import EventIcon from "@mui/icons-material/Event";
import PersonIcon from "@mui/icons-material/Person";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import { getAuth, signOut, onAuthStateChanged } from "@firebase/auth";

const DashboardDrawer = (props) => {
  const navigate = useNavigate();
  const [showClient, setShowClient] = useState(true);
  const [showWorkout, setShowWorkout] = useState(false);
  const [showExercise, setShowExercise] = useState(false);
  const [showAddClient, setShowAddClient] = useState(false);
  const [showAddExercise, setShowAddExercise] = useState(false);
  const [showAddWorkout, setShowAddWorkout] = useState(false);
  const [searchClient, setSearchClient] = useState(false);
  const [searchWorkout, setSearchWorkout] = useState(false);
  const [searchExercise, setSearchExercise] = useState(false);
  const [hideAdd, setHideAdd] = useState(true);
  const [showClientInfo, setShowClientInfo] = useState(false)
  const [clientInfo, setClientInfo] = useState()
  var trainerID = null;
  var user = null;
  


  // const handleDrawerOpen = () => {
  //   setOpen(true);
  // };

  // const handleDrawerClose = () => {
  //   setOpen(false);
  // };


  const auth = getAuth();
  var trainerID = null;
  var user = null;
  onAuthStateChanged(auth, (firebaseUser) => {
    if (firebaseUser) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      user = firebaseUser;
      // console.log("Signed in")
      trainerID = firebaseUser.email;
      // console.log(trainerID)
      // ...
    } else {
      // User is signed out
      // ...
      navigate('/')
    }
  });
  // const trainerID = user.email;
  if (trainerID !== null)
  {
    // console.log(trainerID)
  }
  else
  {
    // console.log("Where's the chapstick?")
  }


  const logout = () => {
    signOut(auth);
    navigate(`/`);
  };

  const openAddClient = () => {
    setShowAddClient(true);
  };
  const closeAddClient = () => {
    setShowAddClient(false);
  };
  const openAddExercise = () => {
    setShowAddExercise(true);
  };
  const closeAddExercise = () => {
    setShowAddExercise(false);
  };  
  const openAddWorkout = () => {
    setShowAddWorkout(true);
  };
  const closeAddWorkout = () => {
    setShowAddWorkout(false);
  };


  const ClientOn = () => {
    setShowWorkout(false);
    setShowExercise(false);
    setSearchWorkout(false);
    setSearchExercise(false);
    setHideAdd(false);
    setShowClientInfo(false)
    
    setSearchClient(true);
    setShowClient(true);
  };

  const WorkoutOn = () => {
    setShowClient(false);
    setShowExercise(false);
    setSearchExercise(false);
    setSearchClient(false);
    setHideAdd(false);
    setShowClientInfo(false)
    
    setShowWorkout(true);
    setSearchWorkout(true);
  };

  const ExerciseOn = () => {
    setShowClient(false);
    setShowWorkout(false);
    setSearchClient(false);
    setSearchWorkout(false);
    setHideAdd(false);
    setShowClientInfo(false);

    setSearchExercise(true);
    setShowExercise(true);
  };

  const openClientDash = (info) => {
    setShowClient(false);
    setSearchClient(false);
    
    setShowWorkout(false);
    setSearchWorkout(false);
    
    setSearchExercise(false);
    setShowExercise(false);
    
    setHideAdd(true);
    setShowClientInfo(true);
  }

  const getClientInfo = (info) => {
    setClientInfo(info)
  }

  const addItem = () => {
    if (showClient) {
      setShowAddClient(true);
    }
    else if(showExercise) {
      setShowAddExercise(true);
    }
    else if(showWorkout) {
      setShowAddWorkout(true)
    }
  };


  const editItem = () => {
    
  };

  const deleteItem = () => {

  };

  const [query, setQuery] = useState(null);

  // useEffect(() => {
  //   searchItem(query)
  // }, [query])

  const carb = 33;
  const fat = 33;
  const protein = 33;
  const info = {
    fat: fat,
    protein: protein,
    carb: carb,
  }


  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        style={{ background: "#6f4792" }}
        // #C3B1E1
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar sx={{position: 'relative'}} >
          <Typography variant="h6" noWrap component="div" sx={{marginLeft: "20px"}}>
            My Dashboard
          </Typography>


          {/* imported search bar */}
          {/* {hideAdd ? null : <Button onClick={addItem} variant='outlined' sx={{position: 'absolute', right: "21.5vw", height: '42px', background: '#866d9c', borderColor: '#6f4792', color: '#ffffff', '&:hover': {background: '#b19cbe', borderColor: '#6f4792', color: '#6f4792'},}}> */}
            {/* <AddIcon /> */}
          {/* </Button>} */}
          
          {/* {console.log(query)} */}
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
            <ListItem button key="Clients" onClick={ClientOn} className="items" sx={{'&:hover': {background: '#e4d4f3', }, '&:focus': {background: '#e4d4f3', }}}>
              <ListItemIcon>
                <PersonIcon />
              </ListItemIcon>
              <ListItemText primary="Clients" />
            </ListItem>

            <ListItem button key="Workouts" onClick={WorkoutOn} sx={{'&:hover': {background: '#e4d4f3', }, '&:focus': {background: '#e4d4f3', }}}>
              <ListItemIcon>
                <FitnessCenterIcon />
              </ListItemIcon>
              <ListItemText primary="Workouts" />
            </ListItem>

            <ListItem button onClick={ExerciseOn} key="Exercises" sx={{'&:hover': {background: '#e4d4f3', }, '&:focus': {background: '#e4d4f3', }}}>
              <ListItemIcon>
                <EventIcon />
              </ListItemIcon>
              <ListItemText primary="Exercises" />
            </ListItem>

          </List>
          <Divider />
        </Box>
        <Button onClick={logout} id="trainer-logout-btn" variant='outlined'>
          Logout
        </Button>
      </Drawer>
      <Box
        component="main"
        bottom="0px"
        right="0px"
        width="80vw" //"80vw"
        height="100vh" //"95vh"
        position="absolute"
        overflow="scroll"
        sx={{ flexGrow: 1, p: 3, backgroundColor: "#f8f4fd" }}
      >
        <Toolbar />
        {/* code for contents of box area in dashboard */}
        {showClient ? <ClientDisplay openClientDash={openClientDash} getClientInfo={getClientInfo}/> : null}
        {showClientInfo ? <ClientInfo info={clientInfo}/> : null}
        {showWorkout ? <WorkoutDisplay query={query} /> : null}
        {showExercise ? <ExerciseDisplay query={query} /> : null}
        {showAddClient ? <AddClient closeAddClient={closeAddClient} /> : null}
        {showAddExercise ? <AddExercise closeAddExercise={closeAddExercise} /> : null}
        {showAddWorkout ? <AddWorkout closeAddWorkout={closeAddWorkout} /> : null}
      </Box>
    </Box>
  );
};

export default DashboardDrawer;
