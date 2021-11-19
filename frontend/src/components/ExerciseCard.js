import * as React from "react";
import Card from "@mui/material/Card";
import Avatar from "@mui/material/Avatar";
import { red } from "@mui/material/colors";
import { styled } from "@mui/material/styles";
import Collapse from "@mui/material/Collapse";
import Divider from "@material-ui/core/Divider";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

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

export default function WorkoutCard({ prop, openClientDash }) {
 
  const cardNumber = prop.cardNumber;
  const firstName = prop.firstName;
  const middleName = prop.middleName;
  const lastName = prop.lastName;
  const email = prop.email;
  const sumtext = "Date Joined: ";
  const dateJoined = prop.startDate;
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

  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const openDashboard = () => {
    console.log("got to open dashboard function");
    openClientDash(cardNumber);

  };

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        sx={{
          '&:hover': {
          cursor: 'pointer',
          textDecoration: 'bold'
        }}}
        avatar={
          <div onClick={openClientDash, openDashboard}>
          <Avatar 
            sx={{ bgcolor: red[500] }} aria-label="recipe" >
            {prop.firstName[0]}
          </Avatar>
          </div>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={<div onClick={openClientDash, openDashboard}>{concatname}</div>}
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
