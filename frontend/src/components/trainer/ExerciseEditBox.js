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

const ExerciseEditBox = ({ closeEditBox, info, returningInfo }) => {
  const [showEdit, setShowEdit] = useState(true);
  const [buttonName, setButtonName] = useState("Change");
  const [buttonFunction, setButtonFunction] = useState();
  const [clicks, setClicks] = useState(0);
  const confirm = () => {
    closeEditBox(info);
  };

  const changingFunction = () => {
    setButtonName("Confirm");
    setClicks(clicks + 1);
    if (clicks >= 2) {
      returningInfo();
    }
  };

  return (
    <div>
      <Dialog
        open={showEdit}
        fullWidth={true}
        maxWidth="xs"
        onBackdropClick={() => {
          closeEditBox();
        }}
      >
        <DialogContent>
          <DialogTitle textAlign="center">
            {info.type}: {info.name}
          </DialogTitle>
          <DialogContentText textAlign="center" marginBottom="20px">
            Click "Change" then "Confirm" when finished
          </DialogContentText>
          <Grid
            container
            direction="column"
            // justifyContent="center"
            // alignItems="center"
          >
            Name:
            <TextField placeholder={info.name} />
            Reps:
            <TextField type="number" placeholder={info.reps} />
            Sets:
            <TextField type="number" placeholder={info.sets} />
            Duration (sec):
            <TextField type="number" placeholder={info.time} />
            Weight:
            <TextField type="number" placeholder={info.weight} />
            Rest Time (sec):
            <TextField type="number" placeholder={info.rest} />
            {/* changing buttons and functionality */}
            <Button
              sx={{ margin: "15px", background: "#28B7CB" }}
              variant="contained"
              onClick={changingFunction}
            >
              {buttonName}
            </Button>
          </Grid>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ExerciseEditBox;
