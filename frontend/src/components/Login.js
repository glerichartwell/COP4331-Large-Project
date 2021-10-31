import React, { useState } from "react";
import reactDom from "react-dom";
import Forgor from "../components/Popup";

function Login() {
  var loginName;
  var loginPassword;

  const [message, setMessage] = useState("");

  const mozilla = {
    width: "300px",
    height: "73vh",
    padding: "100px 10px 0px 40px",
    borderRadius: "0px 20px 20px 0px",
  };

  const rodando = {
    borderRadius: "5px",
    border: "2px solid rgb(85, 183, 204)",
    width: "80%",
    height: "25px",
    margin: "auto",
  };

  const rojo = {
    color: "red",
  };

  const doLogin = async (event) => {
    event.preventDefault();

    var obj = { login: loginName.value, password: loginPassword.value };
    var js = JSON.stringify(obj);

    try {
      const response = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        body: js,
        headers: { "Content-Type": "application/json" },
      });

      var res = JSON.parse(await response.text());

      if (res.id <= 0) {
        setMessage("User/Password combination incorrect");
      } else {
        var user = {
          firstName: res.firstName,
          lastName: res.lastName,
          id: res.id,
        };
        localStorage.setItem("user_data", JSON.stringify(user));

        setMessage("");
        window.location.href = "/cards";
      }
    } catch (e) {
      alert(e.toString());
      return;
    }
  };

  return (
    <div id="loginDiv" style={mozilla} class="radial">
      <form onSubmit={doLogin}>
        <span id="inner-title">Login</span>
        <br />
        <br />
        <span id="loginResult" style={rojo}>
          {message}
        </span>
        <input
          type="text"
          id="loginName"
          style={rodando}
          placeholder="E-mail"
          ref={(c) => (loginName = c)}
        />
        <br />
        <br />
        <input
          type="password"
          id="loginPassword"
          style={rodando}
          placeholder="Password"
          ref={(c) => (loginPassword = c)}
        />
        <br />
        <br />
        <input
          type="submit"
          id="loginButton"
          class="butt"
          value="Submit"
          onClick={doLogin}
        />
        <br />
        <br />
        <Forgor />
      </form>
      <p>Don't have an account?</p>
      <a href="#">Register instead.</a>
      <br />
    </div>
  );
}

export default Login;
