import { useNavigate } from 'react-router'
import { useState } from 'react'

import Dialog from '@mui/material/Dialog'
import { DialogContent, DialogContentText, DialogTitle } from '@mui/material'
import Grid from "@mui/material/Grid";

import TextBox from './TextBox'
import Button from './Button'

const ForgotPass = () => {
    const [ open, setOpen ] = useState(true);

    const navigate = useNavigate();
    const Home = () => {
        navigate('/')
    }
    return (
        <Dialog open={open} onBackdropClick={Home}>
            <Grid container direction='column' alignItems='center' justify='center'><DialogTitle>Forgot Password?</DialogTitle></Grid>
            <DialogContent>
            <Grid container direction='column' alignItems='center' justify='center'><DialogContentText>
                    Enter the email associated with your account <br/>and we'll send you a reset password link!
                </DialogContentText>
                <br/>
                <TextBox placeholder='Email'/>
                <Button text='Send Email' onClick={Home}/>
            </Grid>
            </DialogContent>
        </Dialog>
    );
}
  
export default ForgotPass;
