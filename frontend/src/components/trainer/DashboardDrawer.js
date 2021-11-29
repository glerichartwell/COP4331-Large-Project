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
  const [showClient, setShowClient] = useState(false);
  const [showWorkout, setShowWorkout] = useState(false);
  const [showExercise, setShowExercise] = useState(false);
  const [showAddClient, setShowAddClient] = useState(false);
  const [showAddExercise, setShowAddExercise] = useState(false);
  const [showAddWorkout, setShowAddWorkout] = useState(false);
  const [searchClient, setSearchClient] = useState(false);
  const [searchWorkout, setSearchWorkout] = useState(false);
  const [searchExercise, setSearchExercise] = useState(false);
  const [hideAdd, setHideAdd] = useState(true);

  // const handleDrawerOpen = () => {
  //   setOpen(true);
  // };

  // const handleDrawerClose = () => {
  //   setOpen(false);
  // };

  useEffect(() => {
    
  })

  const auth = getAuth();
  const user = auth.currentUser;
  const trainerID = "g.erichartwell@gmail.com";
  if (user !== null)
  {
    console.log(user)
  }
  else
  {
    console.log("Where's the chapstick?")
  }


  const logout = () => {
    signOut(auth);
    navigate(`/`);
  };

  const ClientOn = () => {
    setShowWorkout(false);
    setShowExercise(false);
    setSearchWorkout(false);
    setSearchExercise(false);
    setHideAdd(false);
    
    setSearchClient(true);
    setShowClient(true);
  };

  const WorkoutOn = () => {
    setShowClient(false);
    setShowExercise(false);
    setSearchExercise(false);
    setSearchClient(false);
    setHideAdd(false);
    
    setShowWorkout(true);
    setSearchWorkout(true);
  };

  const ExerciseOn = () => {
    setShowClient(false);
    setShowWorkout(false);
    setSearchClient(false);
    setSearchWorkout(false);
    setHideAdd(false);

    setSearchExercise(true);
    setShowExercise(true);
  };

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

  const [query, setQuery] = useState(null);

  // useEffect(() => {
  //   searchItem(query)
  // }, [query])

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
          <Typography variant="h6" noWrap component="div">
            My Dashboard
          </Typography>


          {/* imported search bar */}
          {/* {hideAdd ? null : <Button onClick={addItem} variant='outlined' sx={{position: 'absolute', right: "21.5vw", height: '42px', background: '#866d9c', borderColor: '#6f4792', color: '#ffffff', '&:hover': {background: '#b19cbe', borderColor: '#6f4792', color: '#6f4792'},}}>
            <AddIcon />
          </Button>}
           */}

          {console.log(query)}

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
            <ListItem button key="Clients" onClick={ClientOn} className="items">
              <ListItemIcon>
                <PersonIcon />
              </ListItemIcon>
              <ListItemText primary="Clients" />
            </ListItem>

            <ListItem button key="Workouts" onClick={WorkoutOn} >
              <ListItemIcon>
                <FitnessCenterIcon />
              </ListItemIcon>
              <ListItemText primary="Workouts"/>
            </ListItem>

            <ListItem button key="Exercises" onClick={ExerciseOn} >
              <ListItemIcon>
                <EventIcon />
              </ListItemIcon>
              <ListItemText primary="Exercises"/>
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
        {showClient ? <ClientDisplay trainerID={trainerID} user={user} /> : null}
        {showWorkout ? <WorkoutDisplay query={query} /> : null}
        {showExercise ? <ExerciseDisplay query={query} /> : null}
        
      </Box>
    </Box>
  );
};

export default DashboardDrawer;
