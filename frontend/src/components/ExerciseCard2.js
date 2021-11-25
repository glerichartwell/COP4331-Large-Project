import * as React from "react";
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

// Show on surface
var ident = 123314;
var name = "Crabwalking";
var sets = 8;
var reps = 5;
const rating = "3";
const comment =
  "I feel like I've done this so many times that I can't stand upright anymore. And now I can only pinch with my hands";
var time = 20;
var weight = 14.5;
var rest = 45;

export default function RecipeReviewCard({ edit }) {
  const [expanded, setExpanded] = React.useState(false);
  const [rating, setValue] = React.useState(2);
  const [open, setOpen] = React.useState(true);

  var info = new Object();
  info.id = ident;
  info.type = "Editing Exercise";
  info.name = name;
  info.sets = sets;
  info.reps = reps;
  info.time = time;
  info.weight = weight;
  info.rest = rest;

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

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
        title={info.name}
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
            <ListItemButton onClick={sendEdit}>
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
          <Rating
            name="simple-controlled"
            value={rating}
            onChange={(event, newValue) => {
              setValue(newValue);
            }}
          />
          <br />
          <br />
          Sets: {info.sets}
          <br />
          Reps: {info.reps}
          <br />
          Estimated Time: {info.time} seconds;
          <br />
          Weight: {info.weight} lb(s)
          <br />
          Resting Period: {info.rest} seconds;
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
          <Typography variant="body2" color="text.secondary">
            User Comment: <br />
            {info.comment}
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}
