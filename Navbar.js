import * as React from "react";
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
import Slep2 from "./TodaySleep";
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

export default function BasicTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "1000px" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          variant="scrollable"
          scrollButtons="auto"
        >
          <Tab label="Info" {...a11yProps(0)} />
          <Tab label="Workouts" {...a11yProps(1)} />
          <Tab label="Health and Wellness" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
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
      </TabPanel>
    </Box>
  );
}
