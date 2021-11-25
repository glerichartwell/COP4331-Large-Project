import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Popover from "@mui/material/Popover";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLess from "@mui/icons-material/ExpandLess";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Rating from "@mui/material/Rating";
import { FixedSizeList } from "react-window";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
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
const name = "Crabification";
const sumtext = "Date Started: ";
const date = "09/32/2014";
const concatdate = sumtext + date;
const rating = "3";
const comment =
  "Y'know the crab walking really isn't working out for me. When I first did it, I noticed my skin got harder. The more I did it, the more I was stuck walking like a crab and then...";
const exercises = ["Crabwalking ", "Squats ", "Crunches ", "E-mail "];
const time = "20";
// Changing the number of exercises here increases the count of how many will be displayed
const numExercises = 4;
// Don't change this, if you really need to, don't make it lower than 45
const itemsize = 45;
const listheight = itemsize * numExercises;

function renderRow(props) {
  const { index, style } = props;
  return (
    <ListItem style={style} key={index} component="div" disablePadding>
      <ListItemButton
        sx={{ pl: 4 }}
      >
        <ListItemText primary={exercises[index]} />
      </ListItemButton>
    </ListItem>
  );
}

export default function WorkoutCard() {
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

  const [rating, setValue] = React.useState(2);

  const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        action={
          <IconButton aria-label="settings" onClick={handleClickii}>
            <MoreVertIcon />
          </IconButton>
        }
        title={name}
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
          <Rating
            name="simple-controlled"
            value={rating}
            onChange={(event, newValue) => {
              setValue(newValue);
            }}
          />
          <br />
          <br />
          <List
            sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
            component="nav"
            aria-labelledby="nested-list-subheader"
          >
            <ListItemButton onClick={handleClick}>
              <ListItemText primary="Exercises to Do" />
              {open ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <FixedSizeList
                height={listheight}
                width={360}
                itemSize={itemsize}
                itemCount={numExercises}
                overscanCount={1}
              >
                {renderRow}
              </FixedSizeList>
            </Collapse>
          </List>
          <br />
          <br />
          Estimated Time to Complete: {time} minutes
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
            {comment}
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}
