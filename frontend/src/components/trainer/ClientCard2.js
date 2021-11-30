import { useState } from "react";
import Card from "@mui/material/Card";
import Avatar from "@mui/material/Avatar";
import { red } from "@mui/material/colors";
import { styled } from "@mui/material/styles";
import Collapse from "@mui/material/Collapse";
import Divider from "@material-ui/core/Divider";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import EditIcon from "@mui/icons-material/Edit";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DeleteIcon from "@mui/icons-material/Delete";
import Rating from "@mui/material/Rating";
import Popover from "@mui/material/Popover";
import ListItemIcon from "@mui/material/ListItemIcon";

const ExpandMore = styled((infos) => {
  const { expand, ...other } = infos;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function RecipeReviewCard({ info, openClientDash, deleteCard }) {

  const cardNumber = info.cardNumber;
  const firstName = info.firstName;
  const middleName = info.middleName;
  const lastName = info.lastName;
  const concatname = firstName + " " + middleName + " " + lastName;
  const email = info.email;
  const dateJoined = info.startDate;
  const sumtext = "Date Joined: ";
  const concatdate = sumtext + dateJoined;

  const workouts = "Crab Dance";
  const height = info.height;
  const weight = info.weight;
  const gender = info.gender;
  const age = info.age;
  const phone = info.phone;
  const birthday = info.birthday;
  const city = info.city;
  const lastLoggedIn = info.lastLoggedIn;

  const [expanded, setExpanded] = useState(false);
  const [open, setOpen] = useState(true);

  const [elevation, setElevation] = useState(5)

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const openDashboard = () => {
    console.log("got to open dashboard function");
    openClientDash(cardNumber);
  };

  // stuff
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClickii = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const sendDelete = () => {
    console.log('Card info: ', info)
    deleteCard(info);
    setAnchorEl(false);
  }

  const openi = Boolean(anchorEl);
  const id = openi ? "simple-popover" : undefined;
  return (
    <Card sx={{ overflow: 'inherit', maxWidth: 345, background: '#e9e3ee', '&:hover': {cursor: 'pointer', }}} onMouseOut={() => {setElevation(5)}} onMouseOver={() => {setElevation(24)}} elevation={elevation}>
      <CardHeader
        action={
          <IconButton aria-label="settings" onClick={handleClickii}>
            <MoreVertIcon />
          </IconButton>
        }
        sx={{
          "&:hover": {
            cursor: "pointer",
            textDecoration: "bold",
          },
        }}
        avatar={
          <div onClick={(openClientDash, openDashboard)}>
            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
              {info.firstName[0]}
            </Avatar>
          </div>
        }
        title={
          <div onClick={(openClientDash, openDashboard)}>{concatname}</div>
        }
      />
      <Popover
        id={id}
        open={openi}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <List key='list'>
          {/* <ListItem key="edit" disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <EditIcon />
              </ListItemIcon>
              <ListItemText primary="Edit" />
            </ListItemButton>
          </ListItem> */}
          <ListItem key="delete" disablePadding>
            <ListItemButton key='delete-button' onClick={sendDelete}>
              <ListItemIcon key='delete-icon-item'>
                <DeleteIcon key='delete-icon'/>
              </ListItemIcon>
              <ListItemText key='delete-text' primary="Delete" />
            </ListItemButton>
          </ListItem>
        </List>
      </Popover>
      <CardContent>

        <Typography variant="body2" color="text.secondary" sx={{overflow: 'hidden', textAlign: 'left'}}>
          {concatdate}
          <br />
          Last Logged In: {lastLoggedIn}
          <br />
          {/* <Divider /> */}
          {email}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ textAlign: "left" }}
          >
            Height: {height} in
            <br />
            Weight: {weight} lb 
            <br />
            Gender: {gender}
            <br />
            Age: {age}
            <br />
            Ph. Num: {phone}
            <br />
            DOB: {birthday}
            <br />
            City: {city}
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}
