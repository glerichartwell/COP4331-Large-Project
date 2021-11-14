import { useNavigate } from 'react-router'
import { useState } from 'react'

import { getAuth, sendPasswordResetEmail  } from '@firebase/auth'

import { Dialog, DialogContent, DialogContentText, DialogTitle, Grid, Button, TextField } from '@mui/material'


const ForgotPass = (props) => {

    const [ open, setOpen ] = useState(true);
    const [ message, setMessage] = useState('');
    const [ email, setEmail ] = useState('');
    
    const navigate = useNavigate();
    const auth = getAuth();
    const resetPassword = async event => {
        sendPasswordResetEmail(auth, email)
    .then(() => {
        setMessage('A password reset link has been sent to your email address!')
        props.setSetShowForgotPass(false);
    })
    .catch((error) => {
        setMessage('Sorry, we could not find an account associated with this email.')
        console.log(error)
    });
    
    }
    
    const sxForgotPassTextField = {
        marginBottom: '10px', 
        marginLeft: '10px', 
        marginRight: '10px', 
        width: '300px'
      }

    return (
        <Dialog open={open} onBackdropClick={() => {setOpen(false)}}>
            <DialogTitle>Forgot Password?</DialogTitle>
            <DialogContent>
            <Grid container direction='column' alignItems='center' justify='center'>
                <DialogContentText>
                    Enter the email associated with your account <br/>and we'll send you a reset password link!
                </DialogContentText>
                <br/>
                <TextField sx={sxForgotPassTextField} id='email' type='email' placeholder="Email" value={email} onChange={e => {setEmail(e.target.value)}} size="large" variant='standard'/>
                <p>{message}</p>
                <Button sx={{width: '200px', marginBottom: '15px', background: '#28B7CB'}} variant='contained' onClick={resetPassword}>Send Email</Button>
            </Grid>
            </DialogContent>
        </Dialog>
    );
}
  
export default ForgotPass;
