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
import "./css/MacroEditBox.css"

 const MacroEditBox = ({info, closeMacroEdit}) => {

    const [message, setMessage] = useState("")
    const [fat, setFat] = useState(info.fat)
    const [carb, setCarb]= useState(info.carb)
    const [protein, setProtein] = useState(info.protein)
    const [date, setDate] = useState()


    const handleDateChange = (value) => {
      setDate(value);
      console.log("Macro edit date: ", date)
    }

    const handleClick = () => {
      editMacros().then(closeMacroEdit())
    }

    const editMacros = async event => {
      try {

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
          "http://localhost:5000/api/edit-client-macro",
          {
            method: "POST",
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
          <DialogTitle textAlign='center' marginBottom='10px'>Send Registration Invite</DialogTitle>
          <DialogContent>
            <DialogContentText textAlign='center'>
            Enter macro goals
            </DialogContentText>
            <Grid container direction='column' alignItems='center' marginTop="10px">
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DesktopDatePicker
                allowSameDateSelection
                orientation="landscape"
                openTo="day"
                value={date}
                onChange={handleDateChange}
                renderInput={(params) => <TextField {...params} variant="standard" sx={{ width: '120px', margin:'8px',}}/>}
              />
            </LocalizationProvider>
            </Grid>
            <Grid container direction='row' justifyContent='center' alignItems='center' marginTop='25px'>
              <TextField sx={{width: '30%', margin: '5px',}} id='fat' type='text' label='Fat' placeholder={info.fat} value={fat} onChange={e => {setFat(e.target.value)}} InputProps={{endAdornment: <InputAdornment position="start">%</InputAdornment>,}} size="large" variant='standard'/>
              <TextField sx={{width: '30%', margin: '5px',}} id='carb' type='text' label='Carbs' placeholder={info.carb} value={carb} onChange={e => {setCarb(e.target.value)}} InputProps={{endAdornment: <InputAdornment position="start">%</InputAdornment>,}} size="large" variant='standard'/>
              <TextField sx={{width: '30%', margin: '5px',}} id='protein' type='text' label='Protein' placeholder={info.protein} value={protein} onChange={e => {setProtein(e.target.value)}} InputProps={{endAdornment: <InputAdornment position="start">%</InputAdornment>,}} size="large" variant='standard'/>
              {message}
              <Button className="submit-btn" variant='outlined' onClick={handleClick}>Submit</Button>
            </Grid>
          </DialogContent>
      </Dialog>
    </div>
    )
}
export default MacroEditBox