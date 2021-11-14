import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router";

import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

import { TextField, Grid, Button } from "@mui/material";


const LoginForm = (props) => {

  

  return (
    
      {/* <form onSubmit={logIn}>
        <p id="inner-title">Login</p>
        <input
          type="text"
          id="email"
          placeholder="Email"
          ref={email}
        />
        <input
          type="password"
          id="password"
          placeholder="Password"
          ref={password}
        /> */}
      {/* </form> */}
    </div>
  );
};

LoginForm.propTypes = {};

export default LoginForm;
