import * as React from "react";
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

export default function ProfileCardView(props) {

  const firstName = props.info.firstName
  const middleName = props.info.middleName
  const lastName = props.info.lastName
  const phone = props.info.phone
  const concatname = firstName + " " + middleName + " " + lastName;
  const email = props.info.email
  const birthday = formatDate(props.info.birthday)
  const gender = props.info.gender
  const city = props.info.city

  const switchCards = () => {
      props.setView(false);
      props.setEdit(true);
  }

  return (
      <Grid container className='profile-container'>
        <Grid item xs={6} className="avatar-item">
          <Avatar id="avatar">
              {concatname[0]}
            </Avatar>
        </Grid>
        <Grid item xs={6} className='edit-item'>
          <EditIcon className='edit-icon' onClick={switchCards}></EditIcon>
        </Grid>
        <Grid item xs={12} className='info'>
          <Typography
            variant="header2"
            gutterBottom
            style={{ fontWeight: "bold" }}
          >
            {concatname}
          </Typography>
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
        </Grid>
      </Grid>
  )
}
