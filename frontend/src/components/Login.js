import React from 'react'
import { useState } from 'react'
import { useNavigate } from "react-router";

import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

import { TextField, Grid, Button} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';


import './Login.css'

const Login = props => {

  const [showLoginSection,  setShowLoginSection] = useState(true);
  const [showForgotPass, setShowForgotPass] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  
  const handleClose = () => {
    props.close();
  }

  const navigate = useNavigate();
  const auth = getAuth();
  const logIn = e => {
    e.preventDefault();

    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in 
      // const user = userCredential.user;
      props.close();
      navigate('/trainer-dashboard');
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
