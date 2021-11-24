import PropTypes from 'prop-types'
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

const ClientInfoView = ({ prop, useCardNumber, closeClientDash }) => {
    const [open, setOpen] = useState(true);
    const [email, setEmail] = useState("");
  

    console.log(useCardNumber)
  
    return (
        <Dialog open={open} fullWidth={true} maxWidth='xs' onBackdropClick={() => {closeClientDash()}}>
          <DialogTitle textAlign='center' marginBottom='10px'>Send Registration Invite</DialogTitle>
          <DialogContent>
            <DialogContentText textAlign='center'>
            {useCardNumber}
            </DialogContentText>
            <Grid container direction='column' justifyContent='center' alignItems='center' marginTop='25px'>
              <TextField sx={{width: '250px', margin: '5px',}} id='email' type='email' placeholder="Email" value={email} onChange={e => {setEmail(e.target.value)}} size="large" variant='standard'/>
              <Button sx={{margin: '15px', background: '#28B7CB'}} variant='contained' onClick={() => {setOpen(false)}}>Send Invite</Button>
            </Grid>
          </DialogContent>
        </Dialog>
    )
}

ClientInfoView.propTypes = {

}

export default ClientInfoView
