import React from "react";
import Button from "./Button";
import { useState, useRef } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router";



const LoginForm = (props) => {
  const email = useRef(null);
  const password = useRef(null);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const auth = getAuth();
  const logIn = e => {
    e.preventDefault();

    signInWithEmailAndPassword(auth, email.current.value, password.current.value)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      navigate('trainer-dashboard');
    })
    .catch((error) => {
      setMessage('Invalid email/password combination.')
      console.log(error)
    });
  }

  return (
    <div>
      <form onSubmit={logIn}>
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
        />
        <span>{message}</span>
        <Button text='Submit' onClick={logIn}/>
      </form>
    </div>
  );
};

LoginForm.propTypes = {};

export default LoginForm;
