import * as React from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import EditIcon from "@mui/icons-material/Edit";

const createnew = {
  backgroundColor: "#28B7CB",
};

const edit = {
  color: "#37123C",
  borderColor: "#37123C",
};

export default function BasicButtons() {
  return (
    <Stack spacing={2} direction="row">
      <Button variant="contained" style={createnew}>
        Create New
      </Button>
      <Button variant="outlined" startIcon={<EditIcon />} style={edit}>
        Edit Client Info
      </Button>
    </Stack>
  );
}
