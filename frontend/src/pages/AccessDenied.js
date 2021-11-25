import { Grid, Paper } from "@mui/material";


export default function AccessDenied() {
    return (
        <Grid container justifyContent='center'>
        <Paper sx={{width: '75vw', height: '70vh', position: 'fixed', left: 180, top: 100}}>
            <h1 style={{textAlign: 'center', fontSize: 80}}>Access Denied</h1>
            <br />
            <p style={{textAlign: 'center', fontSize: 26}}>You don't belong here! You should head on back to the <a style={{fontSize: 26}} href='/'>home page</a>.</p>
        </Paper>
        </Grid>
    )
}
