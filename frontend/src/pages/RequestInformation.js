import React from "react";
import PropTypes from "prop-types";
import Name from "../components/Name";
import "./RequestInformation.css";
import Grid from "@mui/material/Grid";
import TextBox from "../components/TextBox";
import Landing from "./Landing";
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

          {/* <Name/> */}

          <DialogBox/>

        </Grid>

      </Grid>
      
    </div>
  );
};

export default RequestInformation;
