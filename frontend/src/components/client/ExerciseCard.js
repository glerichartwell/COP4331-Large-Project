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

export default function RecipeReviewCard({ edit, deleteCard, closeEditBox, dbInfo }) {
  const [expanded, setExpanded] = useState(false);
  const [rating, setValue] = useState(2);
  const [open, setOpen] = useState(true);

  //load object exercise information into the card component
  var info = new Object();
  info.cardNumber = dbInfo.cardNumber;
  info.id = dbInfo.id;
  info.type = "Editing Exercise";
  info.name = dbInfo.name;
  info.sets = dbInfo.sets;
  info.reps = dbInfo.reps;
  info.time = dbInfo.time;
  info.weight = dbInfo.weight;
  info.rest = dbInfo.rest;

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

  //send information from card to be edited in edit box then close popout
  const sendEdit = () => {
    edit(info);
    setAnchorEl(false);
  };

  //send information from card to be deleted from database then close popout
  const sendDelete = () => {
    deleteCard(info);
    setAnchorEl(false);
  }

  const openPopoverMenu = Boolean(anchorEl);
  // const id = openPopoverMenu ? "simple-popover" : undefined;


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
        <Typography variant="body2" color="text.secondary" sx={{textAlign: 'left', marginLeft: '10px'}}>
          Sets: {info.sets}
          <br />
          Reps: {info.reps}
          <br />
          Estimated Time: {info.time} seconds
          <br />
          Weight: {info.weight} lb(s)
          <br />
          Resting Period: {info.rest} seconds
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
