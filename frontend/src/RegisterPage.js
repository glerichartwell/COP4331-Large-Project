import { Grid } from "@mui/material";
import { Box } from "@mui/system";
import Header from "./components/Header";
import Register from "./components/Register";

import "./style.css";

const RegisterPage = () => {

  return (
    <Box width='100vw' height='100vh'>
        <Header />
        <Grid className="register-grid" container>
          <Register />
        </Grid>
    </Box>
  );
};

export default RegisterPage;
