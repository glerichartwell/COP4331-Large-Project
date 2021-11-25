import { Grid, Button, Dialog, DialogContent, DialogTitle, DialogContentText} from "@mui/material";
import { useNavigate } from "react-router";

const RegisterSuccess = props => {

    const navigate = useNavigate();

    return (
        <Dialog open={props.open} fullWidth={true} maxWidth='xs' onBackdropClick={() => {props.setRegisterSuccess(false)}}>
            <DialogContent>
            <DialogTitle textAlign='center'>Congratulations!</DialogTitle>
                <Grid container direction='column' justifyContent='center' alignItems='center'>
                    <DialogContentText textAlign='center' marginBottom='20px'>You were successfully registered.</DialogContentText>
                    <Button sx={{margin: '15px', background: '#28B7CB'}} variant='contained' onClick={() => {navigate('/')}}>Close</Button>
                </Grid>
            </DialogContent>
        </Dialog>
        );
}

export default RegisterSuccess
