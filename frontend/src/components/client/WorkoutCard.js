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
import { Divider } from "@mui/material";

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
// preset array to be empty if no exercises are entered on creation
const exercises = [];

export default function WorkoutCard({ edit, deleteCard, assignWorkout, closeEditBox, dbInfo }) {
  const [expanded, setExpanded] = React.useState(false);
  // Show on surface
  const sumtext = "Date: ";
  // Don't change this, if you really need to, don't make it lower than 45
  const itemsize = 45;

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

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
  
  //send information from card to be edited in edit box
  const sendEdit = () => {
    edit(info);
    setAnchorEl(false);
  };

  //send information from card to be deleted from database then close popout
  const sendDelete = () => {
    deleteCard(info);
    setAnchorEl(false);
  }

  //send information to assign workouts to clients
  const assignToClient = () => {
    assignWorkout(info);
    setAnchorEl(false);
  }


  const openi = Boolean(anchorEl);
  const id = openi ? "simple-popover" : undefined;

  var info = new Object();
  info.id = dbInfo.id;
  info.type = "Editing Workout";
  info.name = dbInfo.name;
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
  console.log(info.numExercises)
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

  const workoutInfo = () => {
    alert("line 122 for displaying info for exercise");
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
        {/* options for popout tab including add, edit, and delete*/}

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
                <FitnessCenterIcon />
              </ListItemIcon>
              <ListItemText primary="Add Exercise" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton onClick={assignToClient}>
              <ListItemIcon>
                <FitnessCenterIcon />
              </ListItemIcon>
              <ListItemText primary="Assign to Client" />
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
      <Typography variant="body2" color="text.secondary" sx={{textAlign: 'left', marginLeft: '10px'}}>
          <Typography variant="body2" color="text.secondary" sx={{marginBottom: '15px'}}>
            Workout Length: {info.timeToComplete} minutes
          </Typography>
          <List
            sx={{marginLeft: '-18px'}}
            component="nav"
            aria-labelledby="nested-list-subheader"
            sx={{background: '#e9e3ee', marginLeft: '-20px', width: '75%', marginBottom: '-24px'}}
            >
            <ListItemButton onClick={handleClick} sx={{marginRight: '-30%', marginBottom: '-10px'}}>
              <ListItemText primary="Exercise List" sx={{background: '#e9e3ee'}}/>
              <div style={{marginRight: '-45px', marginBottom: '-5px'}}>{open ? <ExpandLess /> : <ExpandMoreIcon />}</div>
            </ListItemButton>
            <Collapse in={open} timeout="auto" unmountOnExit sx={{background: '#e9e3ee'}}>
              <List>
                {info.exercises.map((exercise) => (
                  <ListItem 
                  key={exercise.id}
                    sx={{ width: '330px', margin: '3px', marginLeft: '0px',}}
                    >
                    {exercise.name}
                  </ListItem>
                ))}
                <ListItem sx={{width : '150%'}}>
                <Typography variant="body2" color="text.secondary" sx={{width : '100%', marginTop: '15px'}}>
                  <span style={{fontSize: 16}}>Comment</span>
                  <Divider sx={{marginTop: '1%', marginBottom: '4%'}}/>
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
