import React, { useState } from "react";
import reactDom from "react-dom";
import Forgor from "../components/Popup";

function Login() {
  const mozilla = {
    width: "100%",
    height: "25%",
    padding: "25px 0px 25px 0px",
    margin: "auto",
    textAlign: "center",
  };

  const title = {};
  return (
    <div id="loginDiv" style={mozilla} class="radial">
      <h1>Welcome to CourtneyGenix!</h1>
      <p>You're making the first step towards a better life!</p>
    </div>
  );
}

export default Login;
