import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@material-ui/core/IconButton";
import TextField from "@mui/material/TextField";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";
import { Grid } from "@mui/material";
import { DialogContentText, Button } from "@mui/material";
import { InputAdornment } from "@mui/material";
import "./css/MacroEditBox.css"

 const MacroEditBox = ({info, closeMacroEdit}) => {

    const [message, setMessage] = useState("")
    const [fat, setFat] = useState(info.fat)
    const [carb, setCarb]= useState(info.carb)
    const [protein, setProtein] = useState(info.protein)

    return (
        <div>
      <Dialog open={true} onBackdropClick={closeMacroEdit}>
          <DialogTitle textAlign='center' marginBottom='10px'>Send Registration Invite</DialogTitle>
          <DialogContent>
            <DialogContentText textAlign='center'>
            Enter macro goals
            </DialogContentText>
            <Grid container direction='row' justifyContent='center' alignItems='center' marginTop='25px'>
              <TextField sx={{width: '30%', margin: '5px',}} id='fat' type='text' label='Fat' placeholder={info.fat} value={fat} onChange={e => {setFat(e.target.value)}} InputProps={{endAdornment: <InputAdornment position="start">%</InputAdornment>,}} size="large" variant='standard'/>
              <TextField sx={{width: '30%', margin: '5px',}} id='carb' type='text' label='Carbs' placeholder={info.carb} value={carb} onChange={e => {setCarb(e.target.value)}} InputProps={{endAdornment: <InputAdornment position="start">%</InputAdornment>,}} size="large" variant='standard'/>
              <TextField sx={{width: '30%', margin: '5px',}} id='protein' type='text' label='Protein' placeholder={info.protein} value={protein} onChange={e => {setProtein(e.target.value)}} InputProps={{endAdornment: <InputAdornment position="start">%</InputAdornment>,}} size="large" variant='standard'/>
              {message}
              <Button className="submit-btn" variant='outlined'>Submit</Button>
            </Grid>
          </DialogContent>
      </Dialog>
    </div>
    )
}
export default MacroEditBox