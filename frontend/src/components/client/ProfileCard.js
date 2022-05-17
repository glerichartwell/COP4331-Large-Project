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
import ProfileCardView from "./ProfileCardView";
import ProfileCardEdit from "./ProfileCardEdit";
import "./css/ProfileCard.css";


export default function BasicCard(props) {
  
  const [view, setView] = useState(true);
  const [edit, setEdit] = useState(false)

  return (
    <Paper className='profile-card' variant='outlined'>
      {view ? <ProfileCardView info={props.info} view={view} setView={setView} edit={edit} setEdit={setEdit} / > : null}
      {edit ? <ProfileCardEdit info={props.info} view={view} setView={setView} edit={edit} setEdit={setEdit} / > : null}
    </Paper>

  );
}
