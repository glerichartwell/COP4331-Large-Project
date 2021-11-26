import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import "./css/DashboardDrawer.css";
import ClientDisplay from "./ClientDisplay";
import ExerciseDisplay from "./ExerciseDisplay";
import WorkoutDisplay from "./WorkoutDisplay";
import AddClient from "./AddClient";
import SearchBar from "../reuseable/SearchBar";

import { makeStyles } from "@material-ui/core/styles";


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
} from "@mui/material";
import { Box } from "@mui/system";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import EventIcon from "@mui/icons-material/Event";
import PersonIcon from "@mui/icons-material/Person";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import { getAuth, signOut } from "@firebase/auth";

const DashboardDrawer = (props) => {
  const navigate = useNavigate();
  const [showClient, setShowClient] = useState(false);
  const [showWorkout, setShowWorkout] = useState(false);
  const [showExercise, setShowExercise] = useState(false);
  const [showAddClient, setShowAddClient] = useState(false);

  // const handleDrawerOpen = () => {
  //   setOpen(true);
  // };

  // const handleDrawerClose = () => {
  //   setOpen(false);
  // };
  const auth = getAuth();
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

  const ClientOn = () => {
    setShowClient(true);
    setShowWorkout(false);
    setShowExercise(false);
  };

  const WorkoutOn = () => {
    setShowClient(false);
    setShowWorkout(true);
    setShowExercise(false);
  };

  const ExerciseOn = () => {
    setShowClient(false);
    setShowWorkout(false);
    setShowExercise(true);
  };

  const addFunctionality = () => {
    if (showClient) {
      setShowAddClient(true);
    }
  };

  const editFunctionality = () => {};

  const deleteFunctionality = () => {};

  const [query, setQuery] = useState(null);

  const getQueryRef = (value) => {
    setQuery(value);
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
          <Typography variant="h6" noWrap component="div">
            <ArrowBackIosIcon /> My Dashboard
          </Typography>


          {/* imported search bar */}
          <Button onClick={addFunctionality} variant='outlined' sx={{position: 'absolute', right: "20vw", height: '40px', background: '#866d9c', borderColor: '#6f4792', color: '#ffffff', '&:hover': {background: '#ac99be', borderColor: '#6f4792', color: '#6f4792'},}}>
            <AddIcon />
          </Button>
          <SearchBar getQueryRef={getQueryRef}/>
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

            <ListItem button key="Exercises">
              <ListItemIcon>
                <EventIcon />
              </ListItemIcon>
              <ListItemText primary="Exercises" onClick={ExerciseOn} />
            </ListItem>

            <ListItem button key="Workouts">
              <ListItemIcon>
                <FitnessCenterIcon />
              </ListItemIcon>
              <ListItemText primary="Workouts" onClick={WorkoutOn} />
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

        {showClient ? <ClientDisplay /> : null}
        {showWorkout ? <WorkoutDisplay /> : null}
        {showExercise ? <ExerciseDisplay /> : null}
        {showAddClient ? <AddClient closeAddClient={closeAddClient} /> : null}
      </Box>
    </Box>
  );
};

export default DashboardDrawer;
