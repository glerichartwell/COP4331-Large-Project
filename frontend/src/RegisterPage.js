import { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import { Box } from "@mui/system";
import Header from "./components/Header";
import Register from "./components/Register";

import "./style.css";
import { useNavigate } from "react-router";

import { getAuth, onAuthStateChanged } from "@firebase/auth";


const RegisterPage = props => {

  const navigate = useNavigate();
  

  const queryString = window.location.search;
  const queryJSON = parseQuery(queryString);
  
  // If Firebase -> Landing || !Mongo
  const checkValidRegister = async event => {

    // Grab email from URL
    
    // email not in URL (did not receive link i.e. /register)
    if (queryJSON['email'] == null || queryJSON == null)
    {
      console.log("No email in query or no query force navigate");
      window.removeEventListener('load', checkValidRegister);
      navigate('/access-denied');
    }

    // Check Mongo
    var obj = {email: queryJSON['email']};
    var js = JSON.stringify(obj);

    try {
      const response = await fetch(
        "http://localhost:5000/api/search-client-by-email",
        {
          method: "POST",
          body: js,
          headers: { "Content-Type": "application/json" },
        }
        );
        
        var txt = await response.text();
        var res = JSON.parse(txt);

        if (res.error.length > 0) {
          console.log(res.error);
        }
        if (res['results'].length === 0)
        {
          console.log("No emails match query string force navigate");
          window.removeEventListener('load', checkValidRegister);
          navigate('/access-denied');
        }
      } catch (error) {
        console.log(error);
        console.log("Error force navigate");
        window.removeEventListener('load', checkValidRegister);
        navigate('/access-denied')
      }

      // Check Firebase
    var clientID = null;
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user)
      {
        if (queryJSON['email'] === user['email']) 
        {
          // User is signed in, see docs for a list of available properties
          // https://firebase.google.com/docs/reference/js/firebase.User
          clientID = user.uid;
          console.log(user);
          console.log("ClientID: ", clientID)
          
          // ...
        }
        else
        {
          console.log("Firebase force navigate");
          window.removeEventListener('load', checkValidRegister);
          navigate('/trainer-dashboard')
        }
      }
    });

  }

  // stackexchange
  function parseQuery(queryString) {
    var query = {};
    var pairs = (queryString[0] === '?' ? queryString.substr(1) : queryString).split('&');
    for (var i = 0; i < pairs.length; i++) {
        var pair = pairs[i].split('=');
        query[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1] || '');
    }
    return query;
  }
  
  useEffect(() => {
    window.addEventListener('load', checkValidRegister);

    return () => {
      window.removeEventListener('load', checkValidRegister);
    }
  })

  return (
    <Box width='100vw' height='100vh'>
        <Header />
        <Grid className="register-grid" container marginTop='-5vh'>
          <Register placeholder={queryJSON['email']} handleEventListener={() => {window.removeEventListener('load', checkValidRegister)}} />
        </Grid>        
    </Box>
  );
};

export default RegisterPage;
