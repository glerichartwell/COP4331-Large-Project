import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Profile from "./ProfileCard";
import Grid from "@mui/material/Grid";
import Slep from "./SleepCard";
import Mood from "./MoodCard";
import Charts from "./Chart";
import ChartToday from "./ChartToday";
import TodaySleep from "./TodaySleep";
import TodayMood from "./TodayMood";
import WorkoutDisplay from "./WorkoutDisplay";

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

export default function BasicTabs({displayMacroEdit, closeMacroEdit, info}) {
  const [value, setValue] = useState(0);
  console.log("---------------------" + info)

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [date, setDate] = useState(new Date());
  const [rating, setRating] = useState();

  useEffect(() => {
    if (date)
    {
      getSleep();
    }
  })

  const getSleep = async event => {
    console.log("====================")
    console.log("Incoming date: ", date)
    try {

      var obj = {
          email: info.email,
          date: new Date(date).toISOString().slice(0,10),
      }
      console.log("Date: ", new Date(date).toISOString().slice(0,10))
      var js = JSON.stringify(obj)
      console.log("JSON: ", js)

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
      console.log(res)
      // Save mood
      if (res.results.length === 0)
      {
        return;
      }
      console.log("Res: ", res.results[0].rating)
      setRating(res.results[0].rating);
      console.log("====================")
      if (res.error.length > 0) {
        console.log("API Error: " + res.error);
      } else {
        console.log("Sleep acquired");
      }
    } catch (error) {
      console.log(error);
    }


  }



  return (
    <Box sx={{ width: "100%" }}>
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
        <Box sx={{ position: 'absolute', display: 'flex', width: '275px', height: '410px'}}>
          <Profile info={info} />
          
        </Box>
        <Box sx={{position: 'absolute', display: 'flex', width: '60%', left: 280}}>
          <TodaySleep info={info} />
          <TodayMood info={info} />
        </Box>
        <Box sx={{position: 'absolute', display: 'flex', width: '60%', left: 280, top: 156}}>
          <ChartToday info={info} />
        </Box>
      </Box>
      </TabPanel>   
      <TabPanel value={value} index={1}>
        <WorkoutDisplay/>
      </TabPanel>
      <TabPanel value={value} index={2}>
      <Box sx={{position: 'relative', width: '100%'}}>
        <Box sx={{ position: 'absolute', display: 'flex', width: '275px', height: '300px'}}>
          <Slep info={info} />
        </Box>
        <Box sx={{position: 'absolute', display: 'flex', width: '275px', height: '300px', left: 280}}>
          <Mood info={info} />
        </Box>
        <Box sx={{position: 'absolute', display: 'flex', width: '400px', height: '300px', left: 560,}}>
          <Charts displayMacroEdit={displayMacroEdit} info={info} />
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