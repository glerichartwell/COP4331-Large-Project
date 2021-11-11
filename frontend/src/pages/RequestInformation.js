import React from "react";
import "./RequestInformation.css";
import Grid from "@mui/material/Grid";
import DialogBox from "../components/DialogBox";

const RequestInformation = () => {
  // const handleName = () => {};

  return (
    <div>
      <Grid
        container
        spacing={1}
        direction="row"
        justify="flex-start"
        alignItems="flex-start"
        alignContent="stretch"
        wrap="nowrap"
      >
        <Grid item xs={4} spacing={3} columns={3}>
          <DialogBox/>
        </Grid>
      </Grid>
    </div>
  );
};

export default RequestInformation;
