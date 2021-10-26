import React, { useState } from "react";
import reactDom from "react-dom";

function Register() {
  var loginName;
  var loginPassword;

  const [message, setMessage] = useState("");

  const mozilla = {
    width: "300px",
    height: "73vh",
    padding: "100px 10px 0px 40px",
    borderRadius: "20px 0px 0px 20px",
    margin: "0px 0px 0px 74.05%",
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

  const RegisterSection = async (event) => {
    event.preventDefault();

    var obj = { login: loginName.value, password: loginPassword.value };
    var js = JSON.stringify(obj);

    try {
      const response = await fetch("http://localhost:5000/api/register", {
        method: "POST",
        body: js,
        headers: { "Content-Type": "application/json" },
      });

      var txt = await response.text();
      var res = JSON.parse(txt);

      if (res.error.length > 0) {
        setMessage("API Error:" + res.error);
      } else setMessage("Account Added");
    } catch (e) {
      alert(e.toString());
      return;
    }
  };
  return (
    <div className="register-container">
      <div className="register-section">
        <div id="loginDiv" style={mozilla} class="radial">
          <form onSubmit={RegisterSection}>
            <span id="inner-title">Register</span>
            <br />
            <span id="loginResult" style={rojo}>
              {message}
            </span>
            <br />
            <br />
            <input
              type="text"
              id="loginName"
              style={rodando}
              placeholder="First Name"
            />
            <br />
            <br />
            <input
              type="text"
              id="loginName"
              style={rodando}
              placeholder="Last Name"
            />
            <br />
            <br />
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
              type="password"
              id="loginPassword"
              style={rodando}
              placeholder="Confirm Password"
            />
            <br />
            <br />
            <input
              type="submit"
              id="loginButton"
              class="butt"
              value="Submit"
              onClick={RegisterSection}
            />
            <br />
          </form>
        </div>
      </div>
      <div className="signup">
        <button onClick={rodando}> I already have an account </button>
      </div>
    </div>
  );
}

export default Register;
