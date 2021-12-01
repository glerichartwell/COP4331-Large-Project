import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import Radio from "@mui/material/Radio";
import Button from "@mui/material/Button";
import { Box, Grid } from "@mui/material";
import Slider from "@mui/material/Slider";
import TextField from "@mui/material/TextField";
import { FormControlLabel } from "@mui/material";
import RadioGroup from "@mui/material/RadioGroup";
import DialogActions from "@mui/material/DialogActions";
import { DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { InputAdornment } from "@mui/material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";

const ExerciseDetails = ({ closeDetailBox, exercise }) => {
  const [showEdit, setShowEdit] = useState(true);

  const time = exercise.duration > 0 ? exercise.duration + " seconds" : "As long as you need to finish.";
  const description = exercise.description > 0 ? exercise.description : "No comment available";
  
  var exercises;

  return (
    <div>
      <Dialog
        open={showEdit}
        fullWidth={true}
        maxWidth="xs"
        onBackdropClick={() => {
          closeDetailBox();
        }}
      >
        <DialogContent>
          <DialogTitle textAlign="center" marginBottom="1px">
            {exercise.name}
          </DialogTitle>
          <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
          >
            <List>
              <ListItem disablePadding>
                <ListItemText primary={"Reps: " + exercise.reps } />
              </ListItem>
              <ListItem disablePadding>
                <ListItemText primary={"Reps: " + exercise.sets} />
              </ListItem>
              <ListItem disablePadding>
                <ListItemText primary={"Duration: " + time} />
              </ListItem>
              <ListItem disablePadding>
                <ListItemText primary={"Reps: " + exercise.reps} />
              </ListItem>
              <ListItem disablePadding>
                <ListItemText primary={"Comment: " + description} />
              </ListItem>
            </List>
          </Grid>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ExerciseDetails;
