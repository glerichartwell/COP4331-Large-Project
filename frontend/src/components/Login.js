import React from 'react'
import { useState } from 'react'
import { useNavigate } from "react-router";

import { getAuth, signInWithEmailAndPassword, setPersistence, browserLocalPersistence } from "firebase/auth";

import { TextField, Grid, Button} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';


import './Login.css'

const Login = props => {

  const [showLoginSection,  setShowLoginSection] = useState(true);
  const [showForgotPass, setShowForgotPass] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const isTrainer = 1;

  const handleClose = () => {
    props.close();
  }

  const navigate = useNavigate();
  const auth = getAuth();
  const logIn = async e => {
    e.preventDefault();

    var userEmail = null;
    var lastLoggedIn = null;

    setPersistence(auth, browserLocalPersistence );
    signInWithEmailAndPassword(auth, email, password)
    .then((user) => {
      // Signed in 
      userEmail = user['email'];
      const today = new Date()
      const startMonth = today.getMonth() + 1;
      const startDay = today.getDate();
      const startYear = today.getFullYear();

      lastLoggedIn = startMonth + '/' + startDay + '/' + startYear;
    })
    .catch((error) => {
      setMessage('Invalid email/password combination.')
      console.log(error)
    });

    if (isTrainer)
    {
        handleClose();
        navigate('/trainer-dashboard');
    }
    else
    {
      const obj = {
        email: userEmail,
        lastLoggedIn: lastLoggedIn,
      }
      const js = JSON.stringify(obj);
      try {
        const response = await fetch(
          "http://localhost:5000/api/edit-client",
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
            handleClose();
            navigate('/client-dashboard');
          }
          else
          {
            console.log("Edit unsucessful");
            console.log("Redirecting...");
            handleClose();
            navigate('/access-denied');
          }
        } catch (error) {
          console.log("Edit unsucessful");
          console.log("Redirecting...");
          handleClose();
          navigate('/access-denied');
        }
      
    }

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
                <Button sx={{margin: '15px', background: '#28B7CB'}} variant='contained' onClick={logIn}>Submit</Button>
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
