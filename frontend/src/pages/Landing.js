import React from "react";
import Button from "../components/Button";
import "./Landing.css";
import { useState } from "react";
import Login from "../components/Login";
import { useNavigate } from 'react-router-dom';
import Grid from "@mui/material/Grid";
import { Card, CardContent, CardHeader } from "@mui/material";

const Landing = (props) => {
  const [buttonText, setButtonText] = useState("Login")
  const [showLog, setShowLog] = useState(false);
  const [showInfo, setShowInfo] = useState(true);
  const navigate = useNavigate();



  const activateLog = () => {
    setShowLog((showLog) => !showLog)
    if (buttonText == "Login")
    {
      setButtonText("Cancel")
    }
    else
    {
      setButtonText("Login")
    }
  }
  
  const getInfo = () => {
    let path = `/request-info`;
    navigate(path);
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
              item
              xs={6}
              sm={6}
              md={6}
              lg={6}
            >
              <div className="landing-btn">
                <Button text={buttonText} onClick={activateLog} />
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
              <Card className='contact'>
                <CardContent>
                  <a id="contact-us" onClick={getInfo}>
                    <span>
                      Contact Us
                      <br /> Pressure free communication, where we get to know
                      you and your needs.
                    </span>
                  </a>
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
              <Card className='about'>
                <CardContent>
                  <a id="about-us">
                    <span>
                      About Us
                      <br />
                      Meet the team, our amazing trainers, leaders, diatitions,
                      and all accessible to you.
                    </span>
                  </a>
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
              <Card className='success'>
                <CardContent>
                <a id="success-stories">
                  <span>
                    Success Stories
                    <br />
                    See how our program works first hand and get to know the
                    amazing people we've helped.
                  </span>
                </a>
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
      {showLog ? <Login /> : null}
      {/* {showInfo ? null : <DialogBox />} */}
    </div>
  );
};

export default Landing;
