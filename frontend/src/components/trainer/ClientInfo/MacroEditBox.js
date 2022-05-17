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
import { LocalizationProvider, DesktopDatePicker } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import formatDate from "../../../utils/formatDate";
import "./css/MacroEditBox.css"

const address = "https://courtneygenix.herokuapp.com"
// const address ="http://localhost:5000"

 const MacroEditBox = ({info, date, closeMacroEdit}) => {

    const [message, setMessage] = useState("")
    const [fat, setFat] = useState(null)
    const [carb, setCarb]= useState(null)
    const [protein, setProtein] = useState(null)

    const handleClick = () => {
      editMacros().then(closeMacroEdit())
    }

    const editMacros = async event => {
      try {
        
        console.log("Info: ", info)
        var obj = {
          email: info.email,
          date: new Date(date).toISOString().slice(0,10),
          fats: fat,
          proteins: protein,
          carbs: carb,
        }
        var js = JSON.stringify(obj)
        console.log("JSON: ", js)
  
        const response = await fetch(
          address + "/api/edit-client-macro",
          {
            method: "PATCH",
            body: js,
            headers: { "Content-Type": "application/json" },
          }
        );
        var txt = await response.text();
        var res = JSON.parse(txt);
          
        if (res.error.length > 0) {
          console.log("API Error: " + res.error);
        } else {
          console.log("Sleep acquired");
        }
      } catch (error) {
        console.log(error);
      }
    }


    return (
      <div>
        <Dialog open={true} onBackdropClick={closeMacroEdit}>
          {console.log("RIGHT HERE: ", date)}
            <DialogTitle textAlign='center' marginBottom='10px'>Edit Macro Goals for {info.firstName} on {formatDate(new Date(date).toISOString().slice(0,10))}</DialogTitle>
            <DialogContent>
              <DialogContentText textAlign='center'>
              Enter macro goals
              </DialogContentText>
              <Grid container direction='row' justifyContent='center' alignItems='center' marginTop='25px'>
                <TextField sx={{width: '30%', margin: '5px',}} type='number' label='Fat' onChange={e => {setFat(e.target.value)}} InputProps={{endAdornment: <InputAdornment position="end">%</InputAdornment>,}} size="large" variant='standard'/>
                <TextField sx={{width: '30%', margin: '5px',}} type='number' label='Carbs' onChange={e => {setCarb(e.target.value)}} InputProps={{endAdornment: <InputAdornment position="end">%</InputAdornment>,}} size="large" variant='standard'/>
                <TextField sx={{width: '30%', margin: '5px',}} type='number' label='Protein' onChange={e => {setProtein(e.target.value)}} InputProps={{endAdornment: <InputAdornment position="end">%</InputAdornment>,}} size="large" variant='standard'/>
                {message}
                <Button className="submit-btn" variant='outlined' onClick={handleClick}>Submit</Button>
              </Grid>
            </DialogContent>
        </Dialog>
      </div>
    )
}
export default MacroEditBox