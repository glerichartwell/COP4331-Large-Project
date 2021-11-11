import { useNavigate } from 'react-router'
import { useState, useRef } from 'react'
import { getAuth, sendPasswordResetEmail  } from '@firebase/auth'
import Dialog from '@mui/material/Dialog'
import { DialogContent, DialogContentText, DialogTitle } from '@mui/material'
import Grid from "@mui/material/Grid";

import TextBox from './TextBox'
import Button from './Button'

const ForgotPass = () => {
    const [ open, setOpen ] = useState(true);
    const [ message, setMessage] = useState('')
    const email = useRef(null)

    const navigate = useNavigate();
    const Home = () => {
        navigate('/')
    }
    const auth = getAuth();
    const resetPassword = () => {
        sendPasswordResetEmail(auth, email.current.value)
    .then(() => {
        setMessage('A password reset link has been sent to your email address!')
        Home();
    })
    .catch((error) => {
        setMessage('Sorry, we could not find an account associated with this email.')
        console.log(error)
    });
    
    }
    


    return (
        <Dialog open={open} onBackdropClick={Home}>
            <DialogTitle>Forgot Password?</DialogTitle>
            <DialogContent>
            <Grid container direction='column' alignItems='center' justify='center'><DialogContentText>
                    Enter the email associated with your account <br/>and we'll send you a reset password link!
                </DialogContentText>
                <br/>
                <form onSubmit={resetPassword}>
                    <input type="email" id="email" placeholder="Email input" ref={email}/>
                </form>
                <p>{message}</p>
                <Button text='Send Email' onClick={resetPassword}/>
            </Grid>
            </DialogContent>
        </Dialog>
    );
}
  
export default ForgotPass;
