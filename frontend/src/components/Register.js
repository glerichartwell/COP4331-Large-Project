import { useEffect, useState } from "react";
import { useNavigate } from "react-router"

import { TextField, Grid, Button, Paper, Stack } from "@mui/material"

import "./Login.css"

const Register = () => {

  const [showBasicInfo, setShowBasicInfo] = useState(false);
  const [showClientCredentials, setShowClientCredentials] = useState(true);

  // Input variables
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);
  const [firstName, setFirstName] = useState(null);
  const [middleName, setMiddleName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [height, setHeight] = useState(null);
  const [weight, setWeight] = useState(null);
  const [phone, setPhone] = useState(null);
  const [gender, setGender] = useState(null);
  const [birthday, setBirthday] = useState(null);
  const [city, setCity] = useState(null);

  // Track input states
  const [bdayType, setBdayType] = useState("text")
  const [passwordError, setPasswordError] = useState(false);
  const [passwordHelperText, setPasswordHelperText] = useState("")
  const [disableNextButton, setDisableNextButton] = useState(true);
  const [disableRegisterButton, setDisableRegisterButton] = useState(true);

  const registerClient = () => {
    
    // Register Client with Firebase

  }
  
  const switchToBasicInfo = () => {
    setShowClientCredentials(false);
    setShowBasicInfo(true);
  }

  useEffect(() => {
    if (email && password && confirmPassword)
        {
          setDisableRegisterButton(false);
        }
        else
        {
          setDisableRegisterButton(true);
        }
  });

  useEffect(() => {
    if (firstName &&
        middleName &&
        lastName &&
        height &&
        weight &&
        phone &&
        gender &&
        birthday &&
        city)
        {
          setDisableNextButton(false);
        }
        else
        {
          setDisableNextButton(true);
        }
  });

  // Password Error
  useEffect(() => {
    if (password !== confirmPassword)
    {
      setPasswordError(true);
      setPasswordHelperText("Passwords do not match");
      
    }
    else
    {
      setPasswordError(false);
      setPasswordHelperText("");
    }
  }); 
  
  const paperBasicInfoStyle = {
    marginBottom: '100px', 
    marginTop: '100px', 
    height: '600px', 
    width: '400px',
  }

  const paperClientCredentialsStyle = {
    marginBottom: '100px', 
    marginTop: '100px', 
    height: '350px', 
    width: '400px',
  }

  const sxBasicTextField = {
    marginBottom: '10px', 
    marginLeft: '30px', 
    marginRight: '10px', 
    maxWidth: '300px'
  }
  
  const sxClienTextField = {
    marginBottom: '10px', 
    marginLeft: '30px', 
    marginRight: '10px', 
    maxWidth: '300px'
  }

  const sxButton = {
    marginBottom: '-40px',
    marginTop: '20px',
    marginLeft: '120px',
    background: '#28B7CB', 
    maxWidth: '150px'
  }

  const regStyle = {
    marginTop: '-20px',
    position: 'relative',
    left: '30px',
    fontSize: 22
  }

  const spanStyle = {
    position: 'relative',
    left: '30px',
    marginBottom: '15px',
    fontSize: 16
  }


    const BasicInfo = showBasicInfo => {
      return showBasicInfo ? (
      <Grid container justifyContent='center' alignItems='center'>
          <Grid item direction='column'>
            <Paper style={paperBasicInfoStyle} component={Stack} direction='column' justifyContent='center' elevation={5}>
              <p style={regStyle}>Register</p>
              <span style={spanStyle}>Please enter your information below</span>
              <TextField sx={sxBasicTextField} id='firstName' type='text' placeholder="First Name" value={firstName} onChange={e => {setFirstName(e.target.value)}} size="large" variant='standard'/>
              <TextField sx={sxBasicTextField} id='middleName' type='text' placeholder="Middle Name (optional)" value={middleName} onChange={e => {setMiddleName(e.target.value)}} size="large" variant='standard'/>
              <TextField sx={sxBasicTextField} id='lastName' type='text' placeholder="Last Name" value={lastName} onChange={e => {setLastName(e.target.value)}} size="large" variant='standard'/>
              <TextField sx={sxBasicTextField} id='height' type='number' placeholder="Height (in inches change to Adornment)" value={height} onChange={e => {setHeight(e.target.value)}} size="large" variant='standard'/>
              <TextField sx={sxBasicTextField} id='weight' type='number' placeholder="Weight (in lbs change to Adornment)" value={weight} onChange={e => {setWeight(e.target.value)}} size="large" variant='standard'/>
              <TextField sx={sxBasicTextField} id='gender' type='text' placeholder="Preferred Gender" value={gender} onChange={e => {setGender(e.target.value)}} size="large" variant='standard'/>
              <TextField sx={sxBasicTextField} id='phone' type='text' placeholder="Phone Number" value={phone} onChange={e => {setPhone(e.target.value)}} size="large" variant='standard'/>
              <TextField sx={sxBasicTextField} id='birthday' type={bdayType} placeholder="Birthday" onBlur={() => setBdayType('text')} onFocus={() => setBdayType('date')} onChange={e => {setBirthday(e.target.value)}} size="large" variant='standard'/>
              <TextField sx={sxBasicTextField} id='city' type='text' placeholder="City" value={city} onChange={e => {setCity(e.target.value)}} size="large" variant='standard'/>
              <Button sx={sxButton} disabled={disableNextButton} variant='contained' onClick={switchToClientCredentials}>Next</Button>
            </Paper>
          </Grid>
        </Grid>) : null;
    };

    const ClientCredentials = showClientCredentials => {
      return showClientCredentials ? (
      <Grid container justifyContent='center' alignItems='center'>
          <Grid item direction='column'>
            <Paper style={paperClientCredentialsStyle} component={Stack} direction='column' justifyContent='center' elevation={5}>
              <p style={regStyle}>Register</p>
              <span style={spanStyle}>Please enter your desired login info below</span>
                <TextField sx={sxClienTextField} id='email' type='email' placeholder="Email" value={email} onChange={e => {setEmail(e.target.value)}} size="large" variant='standard'/>
                <TextField sx={sxClienTextField} id='password' type='password' placeholder="Password" value={password} onChange={e => {setPassword(e.target.value)}} size="large" variant='standard'/>
                <TextField sx={sxClienTextField} id='confirmPassword' error={passwordError} helperText={passwordHelperText} type='password' placeholder="Confirm Password" value={confirmPassword} onChange={e => {setConfirmPassword(e.target.value)}} size="large" variant='standard'/>
              <Button sx={sxButton} disabled={disableRegisterButton} variant='contained' onClick={registerClient}>Register</Button>
            </Paper>
          </Grid>
        </Grid>) : null;
    };

  
    return (
      <div>
        {BasicInfo(showBasicInfo)}
        {ClientCredentials(showClientCredentials)}
      </div>
    )
  }

export default Register