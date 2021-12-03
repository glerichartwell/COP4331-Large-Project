import { useEffect, useState } from "react";

import { getAuth, createUserWithEmailAndPassword, signOut } from "firebase/auth";

import { TextField, Grid, Button, Paper, Stack, InputAdornment } from "@mui/material"
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';


import "./css/Register.css"

import RegisterSuccess from "./RegisterSuccess";
import { useNavigate } from "react-router";

const address = "https://courtneygenix.herokuapp.com"
// const address ="http://localhost:5000"


const Register = props => {

  const navigate = useNavigate();

  const [showClientCredentials, setShowClientCredentials] = useState(true);
  const [showBasicInfo, setShowBasicInfo] = useState(false);
  const [registerSuccess, setRegisterSuccess] = useState(false)

  // Input variables
  const [email, setEmail] = useState(props.placeholder);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [lastName, setLastName] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [phone, setPhone] = useState('');
  const [gender, setGender] = useState('');
  const [birthday, setBirthday] = useState(null);
  const [city, setCity] = useState('');

  // Track input states
  const [bdayType, setBdayType] = useState("text")
  const [passwordError, setPasswordError] = useState(false);
  const [passwordHelperText, setPasswordHelperText] = useState("")
  const [disableNextButton, setDisableNextButton] = useState(true);
  const [disableRegisterButton, setDisableRegisterButton] = useState(true);

  const registerClient = async event => {
    
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        console.log("User: ", user);
        signOut(auth);
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("Error code: ", errorCode, " ", errorMessage);
        // ..
      });

      const today = new Date()
      const startMonth = today.getMonth() + 1;
      const startDay = today.getDate();
      const startYear = today.getFullYear();

      const startDate = startMonth + '/' + startDay + '/' + startYear;
      // Make EDIT CLIENT API CALL WITH INFO
      const obj = {
        email: email,
        firstName: firstName,
        middleName: middleName,
        lastName: lastName,
        height: height,
        weight: weight,
        phone: phone,
        gender: gender,
        birthday: birthday,
        city: city,
        startDate: startDate,
      };
      const js = JSON.stringify(obj);
      console.log(js)
      try {
        const response = await fetch(
          address + "/api/edit-client",
          {
            method: "PATCH",
            body: js,
            headers: { "Content-Type": "application/json" },
          }
          );
          
          var txt = await response.text();
          var res = JSON.parse(txt);
  
          if (res['status'] === 200) {
            console.log("Client updated.")
            props.handleEventListener();
          }
          else
          {
            console.log("Edit unsucessful");
            console.log("Redirecting...");
            props.handleEventListener();
            navigate('/access-denied');
          }

          
        } catch (error) {
          console.log("Edit unsucessful");
          console.log("Redirecting...");
          props.handleEventListener();
          navigate('/access-denied');
        }


      switchToRegisterSuccess();
  }
  
  const switchToBasicInfo = () => {
    setShowClientCredentials(false);
    setShowBasicInfo(true);
  }

  const switchToRegisterSuccess = () => {
    setShowBasicInfo(false);
    setRegisterSuccess(true);
  }

  // From https://tomduffytech.com/how-to-format-phone-number-in-react/
  const handlePhoneChange = (e) => {
    // this is where we'll call our future formatPhoneNumber function that we haven't written yet.
    const formattedPhoneNumber = formatPhoneNumber(e.target.value);
    // we'll set the input value using our setInputValue
    setPhone(formattedPhoneNumber);
  }

  function formatPhoneNumber(value) {
    // if input value is falsy eg if the user deletes the input, then just return
    if (!value) return value;
  
    // clean the input for any non-digit values.
    const phoneNumber = value.replace(/[^\d]/g, "");
  
    // phoneNumberLength is used to know when to apply our formatting for the phone number
    const phoneNumberLength = phoneNumber.length;
  
    // we need to return the value with no formatting if its less then four digits
    // this is to avoid weird behavior that occurs if you  format the area code to early
  
    if (phoneNumberLength < 4) return phoneNumber;
  
    // if phoneNumberLength is greater than 4 and less the 7 we start to return
    // the formatted number
    if (phoneNumberLength < 7) {
      return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`;
    }
  
    // finally, if the phoneNumberLength is greater then seven, we add the last
    // bit of formatting and return it.
    return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(
      3,
      6
    )}-${phoneNumber.slice(6, 10)}`;
  }
  
  // Disable Next Button
  useEffect(() => {
    if (email && password && confirmPassword && password === confirmPassword)
        {
          setDisableNextButton(false);
        }
        else
        {
          setDisableNextButton(true);
        }
  }, [email, password, confirmPassword]);

  // Disable Register Button
  useEffect(() => {
    if (firstName &&
        lastName &&
        height &&
        weight &&
        phone &&
        gender &&
        birthday &&
        city)
        {
          setDisableRegisterButton(false);
        }
        else
        {
          setDisableRegisterButton(true);
        }
  }, [firstName, middleName, lastName, 
      height, weight, phone, 
      gender, birthday, city]);

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
  }, [password, confirmPassword]); 
  
  const paperBasicInfoStyle = {
    position: 'relative',
    marginBottom: '10vh', 
    marginTop: '20vh',
    alignSelf: 'center',
    height: '550px', 
    width: '400px',
  }

  const paperClientCredentialsStyle = {
    marginBottom: '100px', 
    marginTop: '130px', 
    height: '350px', 
    width: '400px',
  }

  const sxBasicTextField = {
    marginBottom: '5px', 
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
    marginTop: '-50px',
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

    const ClientCredentials = () => {
      return showClientCredentials ? (
      <Grid container justifyContent='center' alignItems='center'>
          <Grid item direction='column'>
            <Paper style={paperClientCredentialsStyle} component={Stack} direction='column' justifyContent='center' elevation={5}>
              <p style={regStyle}>Register</p>
              <span style={spanStyle}>Please enter your desired login info below</span>
                <TextField sx={sxClienTextField} id='email' type='email' placeholder="Email" value={email} onChange={e => {setEmail(e.target.value)}} size="large" variant='standard'/>
                <TextField sx={sxClienTextField} id='password' type='password' placeholder="Password" value={password} onChange={e => {setPassword(e.target.value)}} size="large" variant='standard'/>
                <TextField sx={sxClienTextField} id='confirmPassword' error={passwordError} helperText={passwordHelperText} type='password' placeholder="Confirm Password" value={confirmPassword} onChange={e => {setConfirmPassword(e.target.value)}} size="large" variant='standard'/>
              <Button sx={sxButton} disabled={disableNextButton} variant='contained' onClick={switchToBasicInfo}>Next</Button>
            </Paper>
          </Grid>
        </Grid>) : null;
    };
  
    const BasicInfo = () => {
      return showBasicInfo ? (
      <Grid container justifyContent='center' alignItems='center'>
          <Grid item direction='column'>
            <Paper style={paperBasicInfoStyle} component={Stack} direction='column' justifyContent='center' elevation={5}>
              <p style={regStyle}>Register</p>
              <span style={spanStyle}>Please enter your information below</span>
              <TextField sx={sxBasicTextField} id='firstName' type='text' placeholder="First Name" value={firstName} onChange={e => {setFirstName(e.target.value)}} size="large" variant='standard'/>
              <TextField sx={sxBasicTextField} id='middleName' type='text' placeholder="Middle Name (optional)" value={middleName} onChange={e => {setMiddleName(e.target.value)}} size="large" variant='standard'/>
              <TextField sx={sxBasicTextField} id='lastName' type='text' placeholder="Last Name" value={lastName} onChange={e => {setLastName(e.target.value)}} size="large" variant='standard'/>
              <TextField sx={sxBasicTextField} id='height' type='number' placeholder="Height" InputProps={{endAdornment: <InputAdornment position="start">inches</InputAdornment>,}} value={height} onChange={e => {setHeight(e.target.value)}} size="large" variant='standard'/>
              <TextField sx={sxBasicTextField} id='weight' type='number' placeholder="Weight" InputProps={{endAdornment: <InputAdornment position="start">lbs</InputAdornment>,}} value={weight} onChange={e => {setWeight(e.target.value)}} size="large" variant='standard'/>
              <TextField sx={sxBasicTextField} id='gender' type='text' placeholder="Preferred Gender" value={gender} onChange={e => {setGender(e.target.value)}} size="large" variant='standard'/>
              <TextField sx={sxBasicTextField} id='phone' type='text' placeholder="Phone Number" value={phone} onChange={handlePhoneChange} size="large" variant='standard'/>
              <TextField sx={sxBasicTextField} id='birthday' type={bdayType} placeholder="Birthday" value={birthday} onBlur={() => setBdayType('text')} onFocus={() => setBdayType('date')} onChange={e => {setBirthday(e.target.value)}} size="large" variant='standard'/>
              {console.log(birthday)}
              <TextField sx={sxBasicTextField} id='city' type='text' placeholder="City" value={city} onChange={e => {setCity(e.target.value)}} size="large" variant='standard'/>
              <Button sx={sxButton} disabled={disableRegisterButton} variant='contained' onClick={registerClient}>Register</Button>
            </Paper>
          </Grid>
        </Grid>) : null;
    };

    const RegSuccess = () => {
      return registerSuccess ? <RegisterSuccess open={registerSuccess} setRegisterSuccess={setRegisterSuccess} /> : null;
    };


  
    return (
      <Grid container direction='column' alignItems='center' justifyContent='center'>
        {BasicInfo()}
        {ClientCredentials()}
        {RegSuccess()}
      </Grid>
    )
  }

export default Register
