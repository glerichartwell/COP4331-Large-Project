import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { InputAdornment } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import { styled, alpha } from '@mui/material/styles';
import SelectInput from "@mui/material/Select/SelectInput";
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
  const user = "Delroy"
  const [showClient, setShowClient] = useState(true);
  const [showWorkout, setShowWorkout] = useState(false);
  const [showExercise, setShowExercise] = useState(false);


  //change to actual logout function
  const logout = () => {
    navigate(`/`);
  };

  const DashOn = () => {
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

  const getQueryRef = (value) => {
    setQuery(value)
  }
  
  const [query, setQuery] = useState(null)  
  
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        style={{ background: "#6f4792" }}
        // #C3B1E1
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar sx={{position: 'relative'}}>
          <Typography variant="h6" noWrap component="div">
            <ArrowBackIosIcon /> Welcome {user}
          </Typography>
          
          {/* <form onSubmit={(e) => {e.preventDefault();console.log(query)}}> */}
            {/* <SearchBar getQueryRef={getQueryRef}/> */}
          {/* </form> */}
          {/* <SearchBar variant='standard' /> */}
          <TextField 
          className='search-bar' 
          type="search" 
          variant='outlined' 
          size='small'
          InputProps={{startAdornment: <InputAdornment><SearchIcon/></InputAdornment>,}}
          sx={{
              position: 'absolute',
              opacity: 0.3,
              right: '1vw',
              maxWidth: '30%',
              minWidth: '20%',
              '& .MuiInputBase-root': {
                color: '#300130',
                background: 'white',
              },
              '& label.Mui-focused': {
                color: 'white',
              },
              '& .MuiInput-underline:after': {
                borderBottomColor: 'yellow',
              },
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: 'white',
                  opacity: 0.3
                },
                '&:hover fieldset': {
                  borderColor: 'white',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#3d013d',
                },
              },
            }} />

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
              <ListItemText primary="Personal Dashboard"/>
            </ListItem>

            <ListItem button key="Exercise">
              <ListItemIcon>
                <FitnessCenterIcon />
              </ListItemIcon>
              <ListItemText primary="Exercise" onClick={ExerciseOn} />
            </ListItem>

            <ListItem button key="Workouts">
              <ListItemIcon>
                <EventIcon />
              </ListItemIcon>
              <ListItemText primary="Workouts" onClick={WorkoutOn} />
            </ListItem>
          </List>
          <Divider />
        </Box>
        <Button onClick={logout} id="logout-btn" variant='outlined'>
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

        {/* {showClient ? <ClientDisplay /> : null}
        {showExercise ? <ExerciseDisplay /> : null}
        {showWorkout ? < WorkoutDisplay/> : null} */}

      </Box>
    </Box>
  );
};

export default ClientDrawer;
