import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { red } from "@mui/material/colors";
import Avatar from "@mui/material/Avatar";
import Paper from "@mui/material/Paper";
import formatDate from "../../utils/formatDate";
import EditIcon from '@mui/icons-material/Edit';
import "./css/ProfileCard.css";
import { Input, TextField } from "@mui/material";
import { LocalizationProvider, DesktopDatePicker } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";

export default function ProfileCardEdit(props) {

  const firstName = props.info.firstName
  const middleName = props.info.middleName
  const lastName = props.info.lastName
  
  const concatname = firstName + " " + middleName + " " + lastName;
  const email = props.info.email
  const birthday = formatDate(props.info.birthday)
  const gender = props.info.gender
  const city = props.info.city
  
  const [date, setDate] = useState(new Date())

  const [phone, setPhone] = useState(props.info.phone)

  const switchCards = () => {
    props.setEdit(false);
    props.setView(true);
  }


  const handlePhoneChange = (e) => {
    // this is where we'll call our future formatPhoneNumber function that we haven't written yet.
    const formattedPhoneNumber = formatPhoneNumber(e.target.value);
    // we'll set the input value using our setInputValue
    setPhone(formattedPhoneNumber);
  }

  function formatPhoneNumber(value) {
    // if input value is falsy eg if the user deletes the input, then just return
    if (!value) return value;
  
    // clean the input for any non-digit values.
    const phoneNumber = value.replace(/[^\d]/g, "");
  
    // phoneNumberLength is used to know when to apply our formatting for the phone number
    const phoneNumberLength = phoneNumber.length;
  
    // we need to return the value with no formatting if its less then four digits
    // this is to avoid weird behavior that occurs if you  format the area code to early
  
    if (phoneNumberLength < 4) return phoneNumber;
  
    // if phoneNumberLength is greater than 4 and less the 7 we start to return
    // the formatted number
    if (phoneNumberLength < 7) {
      return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`;
    }
  
    // finally, if the phoneNumberLength is greater then seven, we add the last
    // bit of formatting and return it.
    return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(
      3,
      6
    )}-${phoneNumber.slice(6, 10)}`;
  }

  return (
    <Grid container className='profile-container'>
        <Grid item xs={6} className="avatar-item">
          <Avatar id="avatar" >
              {concatname[0]}
            </Avatar>
        </Grid>
        <Grid item xs={6} className='edit-item'>
          <EditIcon className='edit-icon' onClick={switchCards}></EditIcon>
        </Grid>
        <Grid item xs={4} sx={{padding: "20px"}}>
          <TextField className="edit-name" placeholder={firstName}  variant="standard"></TextField>
        </Grid>
        <Grid item xs={4} sx={{paddingTop: "20px", paddingLeft: "4px"}}>
          <TextField className="edit-name" placeholder={middleName} variant="standard"></TextField> 
        </Grid>
        <Grid item xs={4} sx={{paddingTop: "20px", marginLeft: "-12px"}}>
          <TextField className="edit-name" placeholder={lastName} variant="standard"></TextField>
        </Grid>
        <Grid item xs={12} >
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DesktopDatePicker
              allowSameDateSelection
              orientation="landscape"
              openTo="day"
              value={date}
              onChange={(value) => {setDate(value)}}
              renderInput={(params) => <TextField {...params} variant="standard" sx={{ width: '140px', paddingLeft: "20px"}}/>}
            />
          </LocalizationProvider>
        </Grid>
        <Grid item xs={12} sx={{paddingTop: "20px", paddingLeft: "20px"}}>
          <TextField className="edit-name" placeholder={gender} variant="standard"></TextField>
        </Grid>
        <Grid item xs={12} sx={{paddingTop: "20px", paddingLeft: "20px"}}>
          <TextField type="email" className="edit-name" placeholder={email} variant="standard" sx={{width: "220px"}}></TextField>
        </Grid>
        <Grid item xs={12} sx={{paddingTop: "20px", paddingLeft: "20px"}}>
          <TextField type="phone" className="edit-name" placeholder={phone} onChange={handlePhoneChange} variant="standard" sx={{width: "220px"}}></TextField>
        </Grid>
        {/* <Grid item xs={12} className='info'>

          
          
          <Typography variant="body2">{birthday}</Typography>
          <Typography variant="body2">Gender: {gender}</Typography>
          <br />
          <Typography variant="header1" style={{ fontWeight: "bold" }}>
            Contact
          </Typography>
          <Typography variant="body2">{email}</Typography>
          <Typography variant="body2">Phone: {phone}</Typography>
          <br />
          <Typography variant="header1" style={{ fontWeight: "bold" }}>
            City
          </Typography>
          <Typography variant="body2">
            {city}
          </Typography>
        </Grid> */}
      </Grid>
  )
}
