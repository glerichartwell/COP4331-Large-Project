import * as React from "react";
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

export default function WorkoutCard({ edit, closeEditBox, dbInfo }) {
  const [expanded, setExpanded] = React.useState(false);
  // Show on surface
  const sumtext = "Date: ";
  // Don't change this, if you really need to, don't make it lower than 45
  const itemsize = 45;

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  // const [rating, setValue] = React.useState(2);

  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(!open);
  };
  // stuff
  const [anchorEl, setAnchorEl] = React.useState(null);

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

  const openi = Boolean(anchorEl);
  const id = openi ? "simple-popover" : undefined;
  console.log(openi);

  var info = new Object();
  info.id = dbInfo.id;
  info.type = "Editing Workout";
  info.name = dbInfo.name;
  console.log(dbInfo)
  info.clientID = dbInfo.clientID;
  info.trainerEmail = dbInfo.trainerEmail;
  info.exercises = dbInfo.exercises;
  info.date = dbInfo.date;
  info.numExercises = dbInfo.numExercises;
  info.timeToComplete = dbInfo.timeToComplete;
  info.comment = dbInfo.comment;
  info.rating = dbInfo.rating;

  const concatdate = sumtext + info.date;
  const listheight = itemsize * info.numExercises;

  console.log(listheight);

  function renderRow(props) {
    const { index, style } = props;
    return (
      <ListItem style={style} key={index} component="div" disablePadding>
        <ListItemButton sx={{ pl: 4 }}>
          <ListItemText primary={info.exercises[index]} />
        </ListItemButton>
      </ListItem>
    );
  }

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        action={
          <IconButton aria-label="settings" onClick={handleClickii}>
            <MoreVertIcon />
          </IconButton>
        }
        title={info.name}
      />
      <Typography variant='body2' color="text.secondary" sx={{textAlign: 'left', marginLeft: '25px', fontSize: 17}}>
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
            <ListItemButton>
              <ListItemIcon>
                <AddIcon/>
              </ListItemIcon>
              <ListItemText primary="Assign" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <FitnessCenterIcon />
              </ListItemIcon>
              <ListItemText primary="Add Exercise" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <DeleteIcon />
              </ListItemIcon>
              <ListItemText primary="Delete" />
            </ListItemButton>
          </ListItem>
        </List>
      </Popover>
      <CardContent>
        <Typography variant="body2" color="text.secondary" sx={{textAlign: 'left', marginLeft: '10px'}}>
          {/* <Rating
            name="simple-controlled"
            value={rating}
            onChange={(event, newValue) => {
              setValue(newValue);
            }}
          />
          <br />
          <br /> */}
          <List
            sx={{marginLeft: '-18px'}}
            component="nav"
            aria-labelledby="nested-list-subheader"
          >
            <ListItemButton onClick={handleClick}>
              <ListItemText primary="Exercise List" />
              {open ? <ExpandLess /> : <ExpandMoreIcon />}
            </ListItemButton>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <FixedSizeList
                height={listheight}
                width={360}
                itemSize={itemsize}
                itemCount={info.numExercises}
                overscanCount={1}
              >
                {renderRow}
              </FixedSizeList>
            </Collapse>
          </List>
          <br />
          <br />
          Estimated Time to Complete: {info.timeToComplete} minutes
          <br />
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
          <Typography variant="body2" color="text.secondary" sx={{textAlign: 'left', marginLeft: '10px'}}>
            User Comment: <br />
            {info.comment}
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}
