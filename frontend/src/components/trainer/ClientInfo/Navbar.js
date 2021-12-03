import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Profile from "./ProfileCard";
import Grid from "@mui/material/Grid";
import Sleep from "./SleepCard";
import Mood from "./MoodCard";
import Charts from "./Chart";
import ChartToday from "./ChartToday";
import TodaySleep from "./TodaySleep";
import TodayMood from "./TodayMood";
import { LocalizationProvider, DesktopDatePicker } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { TextField } from "@mui/material";
import WorkoutDisplay from "../../client/WorkoutDisplay";
import MacroEditBox from "./MacroEditBox";

// const address = "https://courtneygenix.herokuapp.com"
const address ="http://localhost:5000"

/**
<Grid container spacing={2} columns={18}>
          <Grid item xs={6}>
            <Profile />
          </Grid>
          <Grid item xs={6}>
            <Grid item>
              <Slep2 />
            </Grid>
            <Grid item>
              <TodayMood />
            </Grid>
          </Grid>
          <Grid item xs={10.95} direction="column">
            <ChartToday />
          </Grid>
        </Grid>
      </TabPanel>
      <TabPanel value={value} index={1}>
        Workouts
      </TabPanel>
      <TabPanel value={value} index={2}>
        Health and Wellness
        <Grid container spacing={3}>
          <Slep />
          <Mood />
          <Charts />
        </Grid>
 */

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs({info, sleep}) {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    setRefresh(!refresh)
  };

  const [date, setDate] = useState(null);
  const [sleepRating, setSleepRating] = useState();
  const [moodRating, setMoodRating] = useState()
  const [macros, setMacros] = useState()
  const [todaySleepRating, setTodaySleepRating] = useState();
  const [todayMoodRating, setTodayMoodRating] = useState()
  const [todayMacros, setTodayMacros] = useState()
  const [refresh, setRefresh] = useState(true)
  const [firstLoad, setFirstLoad] = useState(true)
  

  useEffect(() => {
    if (date)
    {
      setSleepRating(null)
      setMoodRating(null)
      setMacros(null)
      // console.log("Date selected: ", date)
      getSleep();
      console.log("Sleep: ", sleepRating)
      getMood();
      // console.log("Mood: ", moodRating)
      getMacros()
    }
  }, [date, refresh])

  useEffect(() => {
    getTodayMacros();
    // console.log("Ran on load")
    getTodayMood();
    getTodaySleep()
    .then(() => {
      console.log("sleep: ", todaySleepRating)
    });
  }, [refresh])


  const handleDateChange = (value) => {
    setDate(value);
    setRefresh(!refresh)
  }

  const getSleep = async event => {

    console.log(date)
    try {

      var obj = {
          email: info.email,
          date: new Date(date.toLocaleDateString()).toISOString().slice(0,10),
      }

      var js = JSON.stringify(obj)


      const response = await fetch(
        address + "/api/search-client-sleep",
        {
          method: "POST",
          body: js,
          headers: { "Content-Type": "application/json" },
        }
      );
      var txt = await response.text();
      var res = JSON.parse(txt);
      // Save mood
      if (res.results.length === 0)
      {
        return;
      }

      setSleepRating(res.results[0].rating);

      if (res.error.length > 0) {
        console.log("API Error: " + res.error);
      } else {
        // console.log("Sleep acquired");
      }
    } catch (error) {
      console.log(error);
    }


  }

  const getTodaySleep = async event => {

    try {
      var temp = new Date().toLocaleDateString()
      var obj = {
          email: info.email,
          date: new Date(temp).toISOString().slice(0,10),
      }
      console.log("get today info: ", obj)
      var js = JSON.stringify(obj)


      const response = await fetch(
        address + "/api/search-client-sleep",
        {
          method: "POST",
          body: js,
          headers: { "Content-Type": "application/json" },
        }
      );
      var txt = await response.text();
      var res = JSON.parse(txt);
      // Save mood
      if (res.results.length === 0)
      {
        return;
      }

      setTodaySleepRating(res.results[0].rating);

      if (res.error.length > 0) {
        console.log("API Error: " + res.error);
      } else {
        // console.log("Sleep acquired: ", todaySleepRating);
      }
    } catch (error) {
      console.log(error);
    }


  }

  const getMood = async event => {
    try {

      console.log("SUPER DATE HEY LOOK HERE: ", date)
      var obj = {
          email: info.email,
          date: new Date(date.toLocaleDateString()).toISOString().slice(0,10),
      }

      var js = JSON.stringify(obj)
      console.log("Fuck me: ", js)

      const response = await fetch(
        address + "/api/search-client-mood",
        {
          method: "POST",
          body: js,
          headers: { "Content-Type": "application/json" },
        }
      );
      var txt = await response.text();
      var res = JSON.parse(txt);
      // Save mood
      if (res.results.length === 0)
      {
        return;
      }
      console.log("Henlo: ", res.results[0])
      setMoodRating(res.results[0].rating);
      if (res.error.length > 0) {
        console.log("API Error: " + res.error);
      } else {
        // console.log("Mood acquired");
      }
    } catch (error) {
      console.log(error);
    }
  }

  const getTodayMood = async event => {
    try {

      var temp = new Date().toLocaleDateString()
      console.log("Today mood date: ", temp)
      var obj = {
          email: info.email,
          date: new Date(temp).toISOString().slice(0,10),
      }

      var js = JSON.stringify(obj)


      const response = await fetch(
        address + "/api/search-client-mood",
        {
          method: "POST",
          body: js,
          headers: { "Content-Type": "application/json" },
        }
      );
      var txt = await response.text();
      var res = JSON.parse(txt);
      // Save mood
      if (res.results.length === 0)
      {
        return;
      }

      setTodayMoodRating(res.results[0].rating);
      if (res.error.length > 0) {
        console.log("API Error: " + res.error);
      } else {
        // console.log("Mood acquired: ", todayMoodRating);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const getMacros = async event => {
    try {

      var obj = {
          email: info.email,
          date: new Date(date).toISOString().slice(0,10),
      }
      var js = JSON.stringify(obj)

      const response = await fetch(
        address + "/api/search-client-macro",
        {
          method: "POST",
          body: js,
          headers: { "Content-Type": "application/json" },
        }
      );
      var txt = await response.text();
      var res = JSON.parse(txt);
  
      // Save mood
      if (res.results.length === 0)
      {
        return;
      }
      var macros = {
        fats: res.results[0].fats,
        proteins: res.results[0].proteins,
        carbs: res.results[0].carbs,
      }
      // console.log("Macros retrieved: ", macros)
      setMacros(macros);

      if (res.error.length > 0) {
        console.log("API Error: " + res.error);
      } else {
        // console.log("Macros acquired");
      }
    } catch (error) {
      console.log(error);
    }
  }

  const getTodayMacros = async event => {
    try {

      var temp = new Date()
      var obj = {
          email: info.email,
          date: temp.toISOString().slice(0,10),
      }
      var js = JSON.stringify(obj)

      const response = await fetch(
        address + "/api/search-client-macro",
        {
          method: "POST",
          body: js,
          headers: { "Content-Type": "application/json" },
        }
      );
      var txt = await response.text();
      var res = JSON.parse(txt);
  
      // Save mood
      if (res.results.length === 0)
      {
        return;
      }
      var macros = {
        fats: res.results[0].fats,
        proteins: res.results[0].proteins,
        carbs: res.results[0].carbs,
      }
      // console.log("Macros retrieved: ", macros)
      setTodayMacros(macros);

      if (res.error.length > 0) {
        console.log("API Error: " + res.error);
      } else {
        // console.log("Macros acquired: ", todayMacros);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const displayMacroEdit = () => {
    setShowMacroEdit(true)
  }

  const closeMacroEdit = () => {
    setShowMacroEdit(false);
    setRefresh(!refresh)
  }

  
  const [showMacroEdit, setShowMacroEdit] = useState(false)
  
  
  return (
    
    <Box sx={{ width: "100%" }}>
      {showMacroEdit && <MacroEditBox info={info} date={date} closeMacroEdit={closeMacroEdit}/>}
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Info" {...a11yProps(0)} />
          <Tab label="Workouts" {...a11yProps(1)} />
          <Tab label="Health and Wellness" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
      <Box sx={{position: 'relative', width: '100%'}}>
        <Box sx={{ position: 'absolute', display: 'flex', width: '275px', height: '452px'}}>
          
          <Profile info={info}  />
          
        </Box>
        <Box sx={{position: 'absolute', width: '300px', left: 280, top: 1}}>
          
          <TodaySleep info={info} todaySleepRating={todaySleepRating}  />

        </Box>
        <Box sx={{position: 'absolute', width: '300px', left: 540, top: 1}}>
          
          <TodayMood info={info} todayMoodRating={todayMoodRating} />
          
        </Box>
        <Box sx={{ position: 'relative', width: '511px', left: 280, top: 200}}>
          
          <ChartToday info={info} todayMacros={todayMacros} />

        </Box>
      </Box>
      </TabPanel>   
      
      
      <TabPanel value={value} index={1}>
        <WorkoutDisplay info={info}/>
      </TabPanel>
     
      
      <TabPanel value={value} index={2}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DesktopDatePicker
          allowSameDateSelection
          orientation="landscape"
          openTo="day"
          value={date}
          onChange={handleDateChange}
          renderInput={(params) => <TextField {...params} variant="standard" sx={{ width: '120px', margin:'8px'}}/>}
        />
      </LocalizationProvider>
      <Box sx={{position: 'relative', width: '100%'}}>
        <Box sx={{ position: 'absolute', display: 'flex', width: '275px', height: '300px'}}>

          <Sleep sleepRating={sleepRating} />

        </Box>
        <Box sx={{position: 'absolute', display: 'flex', width: '275px', height: '300px', left: 280}}>

          <Mood moodRating={moodRating} />

        </Box>
        <Box sx={{position: 'absolute', display: 'flex', width: '400px', height: '300px', left: 560,}}>

          <Charts displayMacroEdit={displayMacroEdit} macros={macros} />

        </Box>
      </Box>
      </TabPanel>


    </Box>
  );
}

{/* <Box sx={{display: 'flex', width: '100%'}}>
  <Box sx={{display: 'flex', width: '33%'}}>
    <Slep />
  </Box>
  <Box sx={{display: 'flex', width: '33%'}}>
    <Mood />
  </Box>
  <Box sx={{display: 'flex', width: '33%'}}>
    <Charts displayMacroEdit={displayMacroEdit} closeMacroEdit={closeMacroEdit} />
  </Box>
</Box> */}