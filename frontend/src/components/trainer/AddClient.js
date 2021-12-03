import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";

import { getAuth, onAuthStateChanged } from "firebase/auth";

import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  Grid, 
  TextField, 

} from "@mui/material";

const address = "https://courtneygenix.herokuapp.com"
// const address ="http://localhost:5000"

const AddClient = (props) => {
  const [open, setOpen] = useState(true);
  const [email, setEmail] = useState(null);
  const [message, setMessage] = useState(null);
  const [disableAddClientButton, setDisableAddClientButton] = useState(true)
  
  const navigate = useNavigate();

  useEffect(() => {
    if (email)
    {
      setDisableAddClientButton(false);
    }
    else
    {
      setDisableAddClientButton(true);
    }
    
  }, [email])


  var trainerID = null;
  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    console.log(user);
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      trainerID = user['email'];
      console.log("TrainerID: ", trainerID)
      // ...
    } else {
      // Leave for potential future logic
    }
  });

  const handleClose = () => {
    props.closeAddClient();
  };

  const closeOnAdd = () => {
    sendRegisterInvite();
    props.closeAddClient();
  };

  const sendRegisterInvite = async event => {
    var obj = {
      email: email,
      trainerID: trainerID
    };
    var js = JSON.stringify(obj);
    try {
      const response = await fetch(
        address + "/api/add-client",
        {
          method: "POST",
          body: js,
          headers: { "Content-Type": "application/json" },
        }
        );
        setMessage("Registration invite sent!")
        
        var txt = await response.text();
        var res = JSON.parse(txt);
        
        if (res.error.length > 0) {
          console.log(res.error);
          setMessage(res.error);
        }
      } catch (error) {
        setMessage(error);
      console.log(error);
    }
    
  }

  const sxAddClientButton = {
    marginTop: '10px', 
    
    background: '#6f4792', 
    borderColor: '#6f4792', 
    color: '#ffffff',  
    '&:hover': {
      background: '#ac99be', 
      borderColor: '#6f4792', 
      color: '#6f4792', 
    }, 
    '&:disabled' : {
      backgroundColor: '#cccccc', 
      color: '#666666',
    }
  }

  return (
    <div>
      <Dialog open={open} fullWidth={true} maxWidth='xs' onBackdropClick={handleClose}>
          <DialogTitle textAlign='center' marginBottom='10px'>Send Registration Invite</DialogTitle>
          <DialogContent>
            <DialogContentText textAlign='center'>
            Enter the email of the client to be registered
            </DialogContentText>
            <Grid container direction='column' justifyContent='center' alignItems='center' marginTop='25px'>
              <TextField sx={{width: '250px', margin: '5px',}} id='email' type='email' placeholder="Email" value={email} onChange={e => {setEmail(e.target.value)}} size="large" variant='standard'/>
              {message}
              <Button variant='outlined' disabled={disableAddClientButton} onClick={closeOnAdd} sx={sxAddClientButton}>Send Invite</Button>
            </Grid>
          </DialogContent>
      </Dialog>
    </div>
  );
};

AddClient.propTypes = {};

export default AddClient;
