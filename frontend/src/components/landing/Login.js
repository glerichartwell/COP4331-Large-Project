import React from 'react'
import { useState } from 'react'
import { useNavigate } from "react-router";

import { getAuth, signInWithEmailAndPassword, setPersistence, browserLocalPersistence, browserSessionPersistence } from "firebase/auth";

import { TextField, Grid, Button} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { sendPasswordResetEmail } from "firebase/auth";


import './css/Login.css'

// const address = "https://courtneygenix.herokuapp.com"
const address ="http://localhost:5000"

const Login = props => {
  
  const navigate = useNavigate();

  const [showLoginSection,  setShowLoginSection] = useState(true);
  const [showForgotPass, setShowForgotPass] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  var isTrainer = 0;

  const handleClose = () => {
    props.close();
  }

  const sendPasswordReset = () => {
    sendPasswordResetEmail(auth, email)
    setMessage("Email has been sent!")
  }

  const determineUserType = async event => {

    var obj = {
      email: email,
    }
    var js = JSON.stringify(obj)
    console.log("JSON: ", js)

    try {
      const response = await fetch(
        address + "/api/determine-dashboard",
        {
          method: "POST",
          body: js,
          headers: { "Content-Type": "application/json" },
        }
        );
        
        var txt = await response.text();
        var res = JSON.parse(txt);
        console.log("results: ", res)
        console.log("isTrainer: ", res.isTrainer)
        isTrainer = res.isTrainer
        
        if (res.error.length > 0) {
          console.log(res.error);
        }
      } catch (error) {
      console.log(error);
    }
  }

  const auth = getAuth();
  const logIn = async e => {
    e.preventDefault();

    var userEmail = null;
    var lastLoggedIn = null;

    //setPersistence(auth, browserLocalPersistence );
    signInWithEmailAndPassword(auth, email, password)
    .then((user) => {
      // Signed in 
      userEmail = user['email'];
      const today = new Date()
      const startMonth = today.getMonth() + 1;
      const startDay = today.getDate();
      const startYear = today.getFullYear();

      lastLoggedIn = startMonth + '/' + startDay + '/' + startYear;

      determineUserType()
    .then(() => {
      if (isTrainer)
      {
          handleClose();
          navigate('/trainer-dashboard');
          isTrainer = 0;
      }
      else
      {
        navigate('/dashboard')
      }
    })

    })
    .catch((error) => {
      setMessage('Invalid email/password combination.')
      console.log(error)
    });
    
  };

  const LoginSection = () => {
    
    if (showForgotPass)
    {
      return (
        <div>
          <div className={showLoginSection ? 'login-container': 'hidden-left'}>
          <div className='closeButton'><Button onClick={handleClose}><CloseIcon sx={{color: '#28B7CB'}}/></Button></div>
            <div className='login-component'>
              <p id="inner-title">Forgot Password?</p>
              <Grid container direction='column' justifyContent='left' alignItems='left' marginTop='25px'>
                <TextField sx={{marginTop: '15px', marginBottom: '5px'}}  id='email' type='email' placeholder="Email" value={email} 
                            onChange={e => {setEmail(e.target.value)}} size="large" variant='standard'/>
                <p>Enter the email associated with your account and we'll send you a reset password link!</p>
                <p>{message}</p>
              </Grid>
              <Grid container direction='column' justifyContent='left' alignItems='left' marginTop='25px'>
                <Button sx={{margin: '15px', background: '#28B7CB'}} variant='contained' onClick={sendPasswordReset}>Submit</Button>
              </Grid>
            </div>
          </div>
        </div>
      )
    }
    else
    {
      return (
      <div >
        {/* Fix this at some point, no need for this logic anymore */}
        <div className={showLoginSection ? 'login-container': 'hidden-left'}>
        <div className='closeButton'><Button onClick={handleClose}><CloseIcon sx={{color: '#28B7CB'}}/></Button></div>
          <div className='login-component'>
            <div>
              <p id="inner-title">Login</p>
              <form onSubmit={logIn}>
                <Grid container direction='column' justifyContent='left' alignItems='left' marginTop='25px'>
                  <TextField  id='email' type='email' placeholder="Email" value={email} 
                              onChange={e => {setEmail(e.target.value)}} size="large" variant='standard'/>
                  <TextField  id='password' type='password' placeholder="Password" value={password} 
                              onChange={e => {setPassword(e.target.value)}} size="large" variant='standard'/>
                  <p>{message}</p>
                </Grid>
                <Grid container direction='row' justifyContent='right' alignItems='right' marginTop='-15px'>
                  <div id='forgot' onClick={() => {setShowForgotPass(true)}}><span>Forgot Password</span></div>
                </Grid>
                <Grid container direction='column' justifyContent='left' alignItems='left' marginTop='25px'>
                  <Button type='submit' sx={{margin: '15px', background: '#28B7CB'}} variant='contained' onClick={logIn}>Submit</Button>
                </Grid>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
  }
  
  return (
      <div>
          {LoginSection()}
      </div>
  )
}

export default Login
