import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import Item from "@material-ui/core/ListItem";

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
const lastLoggedIn = "2020/11/12";

export default function RecipeReviewCard() {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            A
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={concatname}
      />
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
