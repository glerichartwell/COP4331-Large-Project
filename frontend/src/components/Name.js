import React from "react";
import PropTypes from "prop-types";
import TwoEntry from "./TwoEntry";
import Button from "./Button";
import { useState } from "react";
import Grid from '@mui/material/Grid'
import ListSubheader from '@mui/material/ListSubheader'
import Paper from '@mui/material/Paper';
import { createTheme, styled } from "@mui/system";
import { Box } from "@mui/system";
import './Name.css'


const Name = (props) => {
  var firstName;
  var lastName;
  const [showInfo, setShowInfo] = useState(false);
  // document.body.style.filter = 'blur(5px)'

  
  const data = () =>{
    props.state = showInfo;
  }
  const handleSubmit = () => {
    firstName = document.getElementById("FirstName");
    lastName = document.getElementById("LastName");
    props.obj = { firstName: firstName, lastName: lastName };
  };

  const activateInfo = () => {
    setShowInfo(true);
  };

  const Field = styled(Paper)(({theme}) => ({
    textAlign:'center',
    // alignItems: 'center',
    // alignContent: 'center',
    color: "black",
    // theme.palette.text.secondary,
    height: 300, 
    width: 300,
    lineHeight: '60px',
  }));

  const darkTheme = createTheme({ palette: { mode: 'dark'}})
  const lightTheme = createTheme({ palette: { mode: 'light'}})
  
  
  return (
    // <form>
    // <div className="container-for-cards">
    //   <div className='inner-card'>
    //     <label>What's your First and Last name?</label>
    //     <input id="FirstName" placeholder="First Name" />
    //     <input id="LastName" placeholder="Last Name" />
    //     <Button text="Next" onClick={handleSubmit} />
    //   </div>
    // </div>
    // </form>
    <div className='request'>

      {/* <Box
              sx={{
                p: 2,
                width: 1000,
                height: 1000,
                bgcolor: 'white',//'background.default',
                // display: 'grid',
                gridTemplateColumns: { md: '1fr 1fr' },
                gap: 2,
              }}
            > */}
        <Field elevation='24'>
          <label>What's your First and Last name?</label>
          <input id="FirstName" placeholder="First Name" />
          <input id="LastName" placeholder="Last Name" />
          <Button text="Next" onClick={handleSubmit} />
        </Field>

      {/* </Box> */}

    </div>


  );
};

Name.propTypes = {};

export default Name;
