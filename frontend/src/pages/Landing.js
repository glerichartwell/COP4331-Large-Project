import React, { useState } from "react";

import { Button, Card, CardContent } from "@mui/material";
import Grid from "@mui/material/Grid";

import DialogBox from "../components/DialogBox"
import Login from "../components/Login";
import RegisterPage from "../RegisterPage"

import "./Landing.css";
import ForgotPass from "../components/ForgotPass";
import Register from "../components/Register";



const Landing = (props) => {
 
  const [showLog, setShowLog] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [showForgotPass, setShowForgotPass] = useState(false);
  
  const activateLog = () => {
    setShowLog(true);
  }
  
  const setSetShowInfo = (value) => {
    setShowInfo(value);
  }

  const getInfo = () => {
    setShowInfo(true);
  };

  const LandingGrid = () => {
    return (
      <div>
        <div className="landing-top-container">
          <Grid
            container
            spacing={1}
            direction="row"
            justify="flex-start"
            alignItems="flex-start"
            alignContent="stretch"
            wrap="nowrap"
          >
            <Grid
              className="name"
              textAlign="center"
              item
              xs={6}
              sm={6}
              md={6}
              lg={6}
            >
              <div className="name">
                <span>CourtneyGenix</span>
              </div>
            </Grid>

            <Grid
              item
              className="landing-btn"
              textAlign="center"
              xs={6}
              sm={6}
              md={6}
              lg={6}
            >
              <div className="landing-btn">
              <Button sx={{width: '100px', margin: '15px', background: '#28B7CB'}} variant='contained' onClick={activateLog}>Login</Button>
              </div>
            </Grid>
          </Grid>
        </div>

        <div className="landing-bottom-container">
          <Grid
            container
            spacing={4}
            paddingTop="1%"
            direction="row"
            justify="flex-start"
            alignItems="flex-start"
            alignContent="stretch"
            wrap="nowrap"
          >
            <Grid
              className="name"
              textAlign="center"
              item
              xs={4}
              sm={4}
              md={4}
              lg={4}
            >
              <Card className='contact' onClick={getInfo}>
                <CardContent>
                  <div id="contact-us">
                    <span>
                      Contact Us
                      <br /> Pressure free communication, where we get to know
                      you and your needs.
                    </span>
                  </div>
                </CardContent>
              </Card>
            </Grid>
            <Grid
              className="name"
              textAlign="center"
              item
              xs={4}
              sm={4}
              md={4}
              lg={4}
            >
              {/* add to Card to make clickable onClick={getAboutUs} */}
              <Card className='about'>
                <CardContent>
                  <div id="about-us">
                    <span>
                      About Us
                      <br />
                      Meet the team, our amazing trainers, leaders, diatitions,
                      and all accessible to you.
                    </span>
                  </div>
                </CardContent>
              </Card>
            </Grid>

            <Grid
              className="name"
              textAlign="center"
              item
              xs={4}
              sm={4}
              md={4}
              lg={4}
            >
              {/* add to Card to make clickable onClick={getSuccessStories} */}
              <Card className='success' >
                <CardContent>
                <div id="success-stories">
                  <span>
                    Success Stories
                    <br />
                    See how our program works first hand and get to know the
                    amazing people we've helped.
                  </span>
                </div>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </div>
      </div>
    );
  };

  return (
    <div>
      {/* <Landing /> */}
      <LandingGrid />
      {/* <RegisterPage /> */}
      {showLog && <Login close={() => {setShowLog(false)}} setSetShowForgotPass={setShowForgotPass} />}
      {showInfo && <DialogBox setSetShowInfo={setSetShowInfo} />}
    </div>
  );
};

export default Landing;
