import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import { styled, alpha } from "@mui/material/styles";
import SelectInput from "@mui/material/Select/SelectInput";
import HAWDisplay from "./HAWDisplay";
import WorkoutDisplay from "./WorkoutDisplay";


import "./css/ClientDrawer.css";

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
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import SearchBar from "../reuseable/SearchBar";

const ClientDrawer = (props) => {
  const navigate = useNavigate();
  const user = "Delroy";
  const [showClient, setShowClient] = useState(true);
  const [showWorkout, setShowWorkout] = useState(false);
  const [showHAW, setShowHAW] = useState(false);

  //change to actual logout function
  const logout = () => {
    navigate(`/`);
  };

  const DashOn = () => {
    setShowClient(true);
    setShowWorkout(false);
    setShowHAW(false);
  };

  const WorkoutOn = () => {
    setShowClient(false);
    setShowWorkout(true);
    setShowHAW(false);
  };

  const HAWOn = () => {
    setShowClient(false);
    setShowWorkout(false);
    setShowHAW(true);
  };

  const getQueryRef = (value) => {
    setQuery(value);
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
            <ArrowBackIosIcon /> Welcome {user}
          </Typography>

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
            <ListItem button key="Personal Dashboard" onClick={DashOn}>
              <ListItemIcon>
                <PersonIcon />
              </ListItemIcon>
              <ListItemText primary="Personal Dashboard" />
            </ListItem>

            <ListItem button key="Health and Wellness" onClick={HAWOn}>
              <ListItemIcon>
                <FitnessCenterIcon />
              </ListItemIcon>
              <ListItemText primary="Health and Wellness" />
            </ListItem>

            <ListItem button key="Workouts" onClick={WorkoutOn}>
              <ListItemIcon>
                <EventIcon />
              </ListItemIcon>
              <ListItemText primary="Workouts" />
            </ListItem>
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
        <Toolbar />
        {/* code for contents of box area in dashboard */}

        {/* {showClient ? <ClientDisplay /> : null} */}
        {showHAW ? <HAWDisplay /> : null}
        {showWorkout ? < WorkoutDisplay/> : null}
      </Box>
    </Box>
  );
};

export default ClientDrawer;
