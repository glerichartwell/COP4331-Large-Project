import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  Grid, 
  TextField, 

} from "@mui/material";

const AddClient = ({ props, closeAddClient }) => {
  const [open, setOpen] = useState(true);
  const [email, setEmail] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div>
      <Dialog open={open} fullWidth={true} maxWidth='xs' onBackdropClick={() => {setOpen(false); closeAddClient()}}>
          <DialogTitle textAlign='center' marginBottom='10px'>Send Registration Invite</DialogTitle>
          <DialogContent>
            <DialogContentText textAlign='center'>
            Enter the email of the client to be registered
            </DialogContentText>
            <Grid container direction='column' justifyContent='center' alignItems='center' marginTop='25px'>
              <TextField sx={{width: '250px', margin: '5px',}} id='email' type='email' placeholder="Email" value={email} onChange={e => {setEmail(e.target.value)}} size="large" variant='standard'/>
              <Button sx={{margin: '15px', background: '#28B7CB'}} variant='contained' onClick={() => {setOpen(false)}}>Send Invite</Button>
            </Grid>
          </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddClient;
