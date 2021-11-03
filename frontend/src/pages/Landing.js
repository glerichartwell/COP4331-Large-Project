import React from "react";
import PropTypes from "prop-types";
import Button from "../components/Button";
import "./Landing.css";
import { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import LoginRegister from "../components/LoginRegister";
import Name from "../components/Name";
import DialogBox from "../components/DialogBox";
import { useHistory } from "react-router-dom"


const Landing = (props) => {
  const [showLog, setShowLog] = useState(true);
  const [showInfo, setShowInfo] = useState(true);
  const history = useHistory();

  const activateLog = () => {
    setShowLog(false);
  };
  const getInfo = () => {
    //setShowInfo(false);
    let path = `/requestinformation`;
    history.push(path)
  };
  
  const getData = (data) => {
    console.log(data);
    return(
      <div>
        wowzers!!
      </div>
    );
  };

  const Landing = () => {
    return (
      <div>
        {/* <div className={showLog ? "landing-top-container" : "hide-landing-top-container"}> */}
        <div className="landing-top-container">
          <div className="name">
            <span>CourtneyGenix</span>
          </div>

          <div className="landing-btn">
            <Button text="Login" onClick={activateLog} />
          </div>
        </div>
        {/* <div id='slogan'>
                Your journey to healthy living starts here!
            </div> */}
        {/* <div className={showLog ? 'landing-bottom-container' : 'hide-landing-bottom-container'}> */}
        
        <div className="landing-bottom-container">
          <a id="contact-us" onClick={getInfo}>Contact Us</a>
          <a id="about-us" >About Us</a>
          <a id="success-stories">Success Stories</a>
        </div>
      </div>
    );
  };

  return (
    <div>
      <Landing />
      {showLog ? null : <LoginRegister />}
      {showInfo ? null: <DialogBox />}
      {/* data={getData} */}

      {/* forgot password or load portal */}
    </div>
  );
};

// Landing.propTypes = {};

export default Landing;
