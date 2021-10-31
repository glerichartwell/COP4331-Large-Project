import React, { useState } from "react";
import Popup from "reactjs-popup";
import "../css/Modal.css";

function ForgotPass() {
  var loginName;
  var loginPassword;

  const [message, setMessage] = useState("");

  const mozilla = {
    width: "300px",
    height: "30vh",
    padding: "40px 10px 0px 40px",
    borderRadius: "20px",
    margin: "auto",
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

  const close = {
    transform: "rotate(45deg)",
    backgroundColor: "transparent",
    border: "none",
    outline: "none",
    cursor: "pointer",
  };

  const link = {
    backgroundColor: "transparent",
    border: "none",
    outline: "none",
    cursor: "pointer",
    textAlign: "left",
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
    <Popup
      trigger={
        <button class="button forgor" style={link}>
          {" "}
          Forgot Password?{" "}
        </button>
      }
      modal
      nested
    >
      {(close) => (
        <div class="modal">
          <button class="close" onClick={close}>
            &times;
          </button>
          <div class="header"> Forgot Password? </div>
          <div class="content">
            <p>
              Enter in the email you used to register and we'll send you a
              confirmation email soon after.
            </p>
            <form onSubmit={doLogin}>
              <input
                type="text"
                id="loginName"
                style={rodando}
                placeholder="Email"
                ref={(c) => (loginName = c)}
              />
              <br />
              <br />
              <input
                type="submit"
                id="loginButton"
                class="butt"
                value="New Password"
                onClick={doLogin}
              />
            </form>
          </div>
        </div>
      )}
    </Popup>
  );
}

export default ForgotPass;
