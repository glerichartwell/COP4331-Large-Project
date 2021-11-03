import React from "react";
import PropTypes from "prop-types";
import Button from "./Button";
import { useState } from "react";

const LoginForm = (props) => {
  var loginName;
  var loginPassword;
  const [message, setMessage] = useState("");

  const doLogin = async (event) => {
    event.preventDefault();

    var obj = { login: loginName.value, password: loginPassword.value };
    var js = JSON.stringify(obj);

    try {
      //change based on address

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
        //window.location.href = "/cards";
      }
    } catch (e) {
      alert(e.toString());
      return;
    }
  };

  return (
    <div>
      <form onSubmit={doLogin}>
        <span id="inner-title">Login</span>
        <input
          type="text"
          id="loginName"
          placeholder="E-mail"
          ref={(c) => (loginName = c)}
        />
        <input
          type="password"
          id="loginPassword"
          placeholder="Password"
          ref={(c) => (loginPassword = c)}
        />
        <Button text='Submit' onClick={doLogin}/>
        {/* <input
          type="submit"
          id="loginButton"
          class="butt"
          value="Submit"
          onClick={doLogin}
        /> */}
      </form>
    </div>
  );
};

LoginForm.propTypes = {};

export default LoginForm;
