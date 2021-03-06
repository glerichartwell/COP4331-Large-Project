import { useState } from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import EditIcon from "@mui/icons-material/Edit";
import { Divider, Grid } from "@mui/material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DeleteIcon from "@mui/icons-material/Delete";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Rating from "@mui/material/Rating";
import Popover from "@mui/material/Popover";
import ListItemIcon from "@mui/material/ListItemIcon";

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
// var ident = 123314;
// var name = "Crabwalking";
// var sets = 8;
// var reps = 5;
// const rating = "3";
// const comment =
//   "I feel like I've done this so many times that I can't stand upright anymore. And now I can only pinch with my hands";
// var time = 20;
// var weight = 14.5;
// var rest = 45;



export default function RecipeReviewCard({ edit, closeEditBox, dbInfo, deleteCard }) {
  const [expanded, setExpanded] = useState(false);
  const [rating, setValue] = useState(2);
  const [open, setOpen] = useState(true);
  const [elevation, setElevation] = useState(5)

  var info = new Object();
  info.id = dbInfo.id;
  info.type = "Editing Exercise";
  info.name = dbInfo.name;
  info.sets = dbInfo.sets;
  info.reps = dbInfo.reps;
  info.time = dbInfo.time;
  info.weight = dbInfo.weight;
  info.rest = dbInfo.rest;
  info.description = dbInfo.description;
  console.log("Incoming: ", dbInfo)

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

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

  const sendDelete = () => {
    deleteCard(info);
    setAnchorEl(false);
  }

  const displayRepsDuration = () => {
    if (info.reps > 0)
    {
      return (
        <Typography variant="body2" color="text.secondary" sx={{textAlign: 'left', marginLeft: '10px', marginBottom: '0'}}>
          Reps: {info.reps}
        </Typography>
      )
    }
    if (parseInt(info.time) > 0)
    {
      return (
        <Typography variant="body2" color="text.secondary" sx={{textAlign: 'left', marginLeft: '10px', marginBottom: '0'}}>
          Duration: {info.time} second(s)
        </Typography>
      )
    }
  }

  const displayDescription = () => {
    if (info.description)
    {
      return (
        <Typography>
          <Typography variant="body2" color="text.secondary" sx={{textAlign: 'left', marginLeft: '10px', marginTop: '20px', fontSize: 16}}>
            Description
          </Typography>
          <Divider sx={{marginTop: '10px', marginBottom: '15px'}}/>
          <Typography variant="body2" color="text.secondary" sx={{textAlign: 'left', marginLeft: '10px', }}>
          {info.description}
          </Typography>
        </Typography>
      )
    }
  }


  const openPopoverMenu = Boolean(anchorEl);
  // const id = openPopoverMenu ? "simple-popover" : undefined;


  return (
    <Card sx={{overflow: 'inherit', maxWidth: 345, background: '#e9e3ee', '&:hover': {cursor: 'pointer', }}} onMouseOut={() => {setElevation(5)}} onMouseOver={() => {setElevation(24)}} elevation={elevation}>
      <CardHeader
        action={
          <IconButton aria-label="settings" onClick={handleClickii}>
            <MoreVertIcon />
          </IconButton>
        }
        title={info.name}
        sx={{marginBottom: '-15px'}}
      />
      <Popover
        id="simple-popover" 
        open={openPopoverMenu}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        {/* Add exercise category later */}
        {/* <Typography variant='body2' color="text.secondary" sx={{textAlign: 'left', marginLeft: '10px'}}>
          {workoutName}
        </Typography> */}
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
        <Typography variant="body2" color="text.secondary" sx={{textAlign: 'left', marginLeft: '10px', marginBottom: '0'}}>
          Sets: {info.sets}
        </Typography>
        {displayRepsDuration()}
        {() => {
          
        }}
        <Typography variant="body2" color="text.secondary" sx={{textAlign: 'left', marginLeft: '10px', marginBottom: '0'}}>
          Weight: {info.weight} lb(s)
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{textAlign: 'left', marginLeft: '10px', marginBottom: '0'}}>
          Rest: {info.rest} second(s)
        </Typography>
        {displayDescription()}
      </CardContent>
    </Card>
  );
}
