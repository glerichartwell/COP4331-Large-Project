import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import Popover from "@mui/material/Popover";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Divider from "@material-ui/core/Divider";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import ListItemIcon from "@mui/material/ListItemIcon";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

// Show on surface
const firstName = "Anit ";
const middleName = " A ";
const lastName = " Bath ";
const email = "bootnob@aol.com";
const sumtext = "Date Joined: ";
const dateJoined = "09/23/1945";
const concatname = firstName + " " + middleName + " " + lastName;
const concatdate = sumtext + dateJoined;

const workouts = "Crab Dance";
const height = "69";
const weight = "420";
const gender = "Apache Attack Helicopter";
const age = "5";
const phone = "(123) 451-1337";
const birthday = "1945/09/02";
const city = "Bronx";
const lastLoggedIn = "11/12/2020";

export default function RecipeReviewCard() {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClickii = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const openi = Boolean(anchorEl);
  const id = openi ? "simple-popover" : undefined;

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        action={
          <IconButton aria-label="settings" onClick={handleClickii}>
            <MoreVertIcon />
          </IconButton>
        }
        title={concatname}
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
        <List>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <EditIcon />
              </ListItemIcon>
              <ListItemText primary="Edit" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton component="a" href="#simple-list">
              <ListItemIcon>
                <DeleteIcon />
              </ListItemIcon>
              <ListItemText primary="Delete" />
            </ListItemButton>
          </ListItem>
        </List>
      </Popover>
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {concatdate}
          <br />
          Last Logged In: {lastLoggedIn}
          <br />
          <Divider />
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
          <Typography variant="body2" color="text.secondary">
            Date Joined: {dateJoined}
            <br />
            Workout: {workouts}
            <br />
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
