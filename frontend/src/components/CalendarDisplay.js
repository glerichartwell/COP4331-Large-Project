import React, { useState } from "react";

import PropTypes from "prop-types";
import Calendar from "react-calendar";
// import { LocalizationProvider } from "@mui/lab";
// import isWeekend from 'date-fns/isWeekend';
// import TextField from '@mui/material/TextField';
// import AdapterDateFns from '@mui/lab/AdapterDateFns';
// import LocalizationProvider from '@mui/lab/LocalizationProvider';
// import StaticDatePicker from '@mui/lab/StaticDatePicker';

const CalendarDisplay = (props) => {
  const [value, onChange] = useState(new Date());
  // const [value, setValue] = React.useState(new Date());

  return (
    <div>
      <Calendar onChange={onChange} value={value}  />
      
      {/* <LocalizationProvider dateAdapter={AdapterDateFns}>
        <StaticDatePicker
          orientation="landscape"
          openTo="day"
          value={value}
          shouldDisableDate={isWeekend}
          onChange={(newValue) => {
            setValue(newValue);
          }}
          renderInput={(params) => <TextField {...params} />}
        />
      </LocalizationProvider> */}
    </div>
  );
};

CalendarDisplay.propTypes = {};

export default CalendarDisplay;
