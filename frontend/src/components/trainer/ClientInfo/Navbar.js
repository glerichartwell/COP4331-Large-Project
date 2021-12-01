import { useState } from "react";
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
import Charts2 from "./ChartToday";
import TodaySleep from "./TodaySleep";
import Mood2 from "./TodayMood";

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
              <Mood2 />
            </Grid>
          </Grid>
          <Grid item xs={10.95} direction="column">
            <Charts2 />
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

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [date, setDate] = useState(new Date());
  const [rating, setRating] = useState();



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
          <Mood2 info={info} />
        </Box>
        <Box sx={{position: 'absolute', display: 'flex', width: '60%', left: 280, top: 156}}>
          <Charts2 info={info} />
        </Box>
      </Box>
      </TabPanel>   
      <TabPanel value={value} index={1}>
        Workouts
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