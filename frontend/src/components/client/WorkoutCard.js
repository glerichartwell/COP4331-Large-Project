import { useState } from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLess from "@mui/icons-material/ExpandLess";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Rating from "@mui/material/Rating";
import { FixedSizeList } from "react-window";
import ListItemIcon from "@mui/material/ListItemIcon";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Popover from "@mui/material/Popover";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import AddIcon from "@mui/icons-material/Add";
import { Divider } from "@mui/material";
import formatDate from "../../utils/formatDate";

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
// const name = "Crabification";
// const sumtext = "Date Started: ";
// const date = "09/32/2014";
// const concatdate = sumtext + date;
// const rating = "3";
// const comment =
//   "Y'know the crab walking really isn't working out for me. When I first did it, I noticed my skin got harder. The more I did it, the more I was stuck walking like a crab and then...";
const exercises = [];
// const time = "20";
// // Changing the number of exercises here increases the count of how many will be displayed
// const numExercises = 4;
// // Don't change this, if you really need to, don't make it lower than 45
// const itemsize = 45;
// const listheight = itemsize * numExercises;

export default function WorkoutCard({
  edit,
  assign,
  dbInfo,
  deleteCard,
  revealExercise,
}) {
  const [expanded, setExpanded] = useState(false);
  const [elevation, setElevation] = useState(5);
  // Show on surface
  const sumtext = "Date: ";
  // Don't change this, if you really need to, don't make it lower than 45
  const itemsize = 45;

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };
  // stuff
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClickii = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const sendEdit = () => {
    edit(info);
    setAnchorEl(false);
  };

  const sendAssign = () => {
    assign(info);
    setAnchorEl(false);
  };

  const sendDelete = () => {
    deleteCard(info);
    setAnchorEl(false);
  };

  const openi = Boolean(anchorEl);
  const id = openi ? "simple-popover" : undefined;

  var info = new Object();
  info.id = dbInfo.id;
  info.type = "Editing Workout";
  info.name = dbInfo.name;
  info.clientID = dbInfo.clientID;
  info.trainerEmail = dbInfo.trainerEmail;
  info.exercises = dbInfo.exercises;
  info.date = formatDate(dbInfo.date);
  info.numExercises = dbInfo.exercises.length;
  info.timeToComplete = dbInfo.timeToComplete;
  info.comment = dbInfo.comment;
  info.rating = dbInfo.rating;

  const concatdate = sumtext + info.date;

  return (
    <Card
      sx={{
        overflow: "inherit",
        maxWidth: 345,
        background: "#e9e3ee",
        "&:hover": { cursor: "pointer" },
      }}
      onMouseOut={() => {
        setElevation(5);
      }}
      onMouseOver={() => {
        setElevation(24);
      }}
      elevation={elevation}
    >
      <CardHeader
        title={info.name}
      />
      <Typography
        variant="body2"
        color="text.secondary"
        sx={{ textAlign: "left", marginLeft: "25px", fontSize: 17 }}
      >
        {concatdate}
      </Typography>
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
            <ListItemButton onClick={sendEdit}>
              <ListItemIcon>
                <EditIcon />
              </ListItemIcon>
              <ListItemText primary="Edit" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton onClick={sendAssign}>
              <ListItemIcon>
                <AddIcon />
              </ListItemIcon>
              <ListItemText primary="Assign" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton onClick={sendDelete}>
              <ListItemIcon>
                <DeleteIcon />
              </ListItemIcon>
              <ListItemText primary="Delete" />
            </ListItemButton>
          </ListItem>
        </List>
      </Popover>
      <CardContent>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ textAlign: "left", marginLeft: "10px" }}
        >
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ marginBottom: "15px" }}
          >
            Workout Length: {info.timeToComplete} minutes
          </Typography>
          <List
            sx={{ marginLeft: "-18px" }}
            component="nav"
            aria-labelledby="nested-list-subheader"
            sx={{
              background: "#e9e3ee",
              marginLeft: "-20px",
              width: "75%",
              marginBottom: "-24px",
            }}
          >
            <ListItemButton
              onClick={handleClick}
              sx={{ marginRight: "-30%", marginBottom: "-10px" }}
            >
              <ListItemText
                primary="Exercise List"
                sx={{ background: "#e9e3ee" }}
              />
              <div style={{ marginRight: "-45px", marginBottom: "-5px" }}>
                {open ? <ExpandLess /> : <ExpandMoreIcon />}
              </div>
            </ListItemButton>
            <Collapse
              in={open}
              timeout="auto"
              unmountOnExit
              sx={{ background: "#e9e3ee" }}
            >
              <List>
                {info.exercises.map((exercise) => (
                  <ListItem
                    key={exercise.id}
                    sx={{ width: "330px", margin: "3px", marginLeft: "0px" }}
                  >
                    <ListItemButton onClick={() => { revealExercise(exercise, info.trainerEmail) }}>
                      {exercise.name}
                    </ListItemButton>
                  </ListItem>
                ))}
                <ListItem sx={{ width: "150%" }}>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ width: "100%", marginTop: "15px" }}
                  >
                    <span style={{ fontSize: 16 }}>Comment</span>
                    <Divider sx={{ marginTop: "1%", marginBottom: "4%" }} />
                    {info.comment}
                  </Typography>
                </ListItem>
              </List>
            </Collapse>
          </List>
          <div></div>
        </Typography>
      </CardContent>
    </Card>
  );
}
