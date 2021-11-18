import React from "react";
import { useState, useRef } from "react";

import Dialog from "@mui/material/Dialog";
import Radio from '@mui/material/Radio';
import Button from "@mui/material/Button";
import { Box, Grid } from "@mui/material";
import Slider from '@mui/material/Slider';
import TextField from '@mui/material/TextField';
import { FormControlLabel } from "@mui/material";
import RadioGroup from '@mui/material/RadioGroup';
import DialogActions from '@mui/material/DialogActions';
import { DialogContent, DialogContentText, DialogTitle } from "@mui/material";

import { useNavigate } from "react-router-dom";

const DialogBox = (props) => {
  
  const [showName, setShowName] = useState(true);
  const [showEmail, setShowEmail] = useState(false);
  const [showNumber, setShowNumber] = useState(false);
  const [showWork, setShowWork] = useState(false);
  const [showGoals, setShowGoals] = useState(false);
  const [showChallenges, setShowChallenges] = useState(false);
  const [showSerious, setShowSerious] = useState(false);
  const [showInvest, setShowInvest] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [showDone, setShowDone] = useState(false);
  const [message, setMessage] = useState(false);
  
  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName]= useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [workAnswer, setWorkAnswer] = useState("");
  const [goalAnswer, setGoalAnswer] = useState("");
  const [challengeAnswer, setChallengeAnswer] = useState("");
  const [seriousness, setSeriousness] = useState(7);
  const [hadPrevTrainer, setHadPrevTrainer] = useState(-1);
  const [commitAnswer, setCommitAnswer] = useState(-1);

  const investAns1 = "I have the finances/energy to invest in my personal growth, knowledge, and health.";
  const investAns2 = "I am willing to invest if I believe the program and accountability can deliver results.";
  const investAns3 = "I am not in a position where I can invest in my personal growth, health, and physique at this time.";
  const navigate = useNavigate();
  
  const sendInfoRequest = async (e) => {
    e.preventDefault();
    
    var obj = {
      firstName: firstName,
      middleName: middleName,
      lastName: lastName,
      email: email,
      phone: phone,
      workAnswer: workAnswer,
      goalAnswer: goalAnswer,
      challengeAnswer: challengeAnswer,
      seriousness: seriousness,
      prevTrainer: hadPrevTrainer,
      commitAnswer: commitAnswer,
    };
    var js = JSON.stringify(obj);
    try {
      const response = await fetch(
        "http://localhost:5000/api/requestInformation",
        {
          method: "POST",
          body: js,
          headers: { "Content-Type": "application/json" },
        }
        );
        setMessage("Your info request is being sent to our trainers!")
        
        var txt = await response.text();
        var res = JSON.parse(txt);
        
        if (res.error.length > 0) {
          console.log(res.error);
          setMessage("It looks like we were unable to process your info request at this time. Please try again.");
        }
      } catch (error) {
        setMessage("It looks like we were unable to process your info request at this time. Please try again.");
      console.log(error);
    }
    setShowDone(false);
    props.setSetShowInfo(false);
    setShowName(true);
  };
  
  // From https://tomduffytech.com/how-to-format-phone-number-in-react/
  const handlePhoneChange = (e) => {
    // this is where we'll call our future formatPhoneNumber function that we haven't written yet.
    const formattedPhoneNumber = formatPhoneNumber(e.target.value);
    // we'll set the input value using our setInputValue
    setPhone(formattedPhoneNumber);
  }

  function formatPhoneNumber(value) {
    // if input value is falsy eg if the user deletes the input, then just return
    if (!value) return value;
  
    // clean the input for any non-digit values.
    const phoneNumber = value.replace(/[^\d]/g, "");
  
    // phoneNumberLength is used to know when to apply our formatting for the phone number
    const phoneNumberLength = phoneNumber.length;
  
    // we need to return the value with no formatting if its less then four digits
    // this is to avoid weird behavior that occurs if you  format the area code to early
  
    if (phoneNumberLength < 4) return phoneNumber;
  
    // if phoneNumberLength is greater than 4 and less the 7 we start to return
    // the formatted number
    if (phoneNumberLength < 7) {
      return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`;
    }
  
    // finally, if the phoneNumberLength is greater then seven, we add the last
    // bit of formatting and return it.
    return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(
      3,
      6
    )}-${phoneNumber.slice(6, 10)}`;
  }
  
  const switchToEmail = () => {
    setShowEmail(true);
    setShowName(false);
  };

  const switchToNumber = () => {
    setShowNumber(true);
    setShowEmail(false);
  };

  const switchToWork = () => {
    setShowWork(true);
    setShowNumber(false);
  };

  const switchToGoals = () => {
    setShowGoals(true);
    setShowWork(false);
  };

  const switchToChallenges = () => {
    setShowChallenges(true);
    setShowGoals(false);
  };

  const switchToSerious = () => {
    setShowSerious(true);
    setShowChallenges(false);
  };

  const switchToHistory = () => {
    setShowHistory(true);
    setShowSerious(false);
  };

  const switchToInvest = () => {
    setShowInvest(true);
    setShowHistory(false);
  };

  const switchToDone = () => {
    setShowDone(true);
    setShowInvest(false);
  };

  const Name = () => (
      <Dialog open={showName} fullWidth={true} maxWidth='xs' onBackdropClick={() => {props.setSetShowInfo(false)}}>
          <DialogContent>
          <DialogTitle textAlign='center'>Information Request</DialogTitle>
          <DialogContentText textAlign='center' marginBottom='20px'>What is your name?</DialogContentText>
              <Grid container direction='column' justifyContent='center' alignItems='center'>
                <TextField sx={{width: '250px',
                                margin: '5px',}} id='firstName' type='text' placeholder="First Name" value={firstName} onChange={e => {setFirstName(e.target.value)}} size="large" variant='standard'/>
                <TextField sx={{width: '250px',
                                margin: '5px',}} id='middleName' type='text' placeholder="Middle Name (optional)" value={middleName} onChange={e => {setMiddleName(e.target.value)}} size="large" variant='standard'/>
                <TextField sx={{width: '250px',
                                margin: '5px',}} id='lastName' type='text' placeholder="Last Name" value={lastName} onChange={e => {setLastName(e.target.value)}} size="large" variant='standard'/>
                <Button sx={{margin: '15px', background: '#28B7CB'}} variant='contained' onClick={switchToEmail}>Next</Button>
              </Grid>
          </DialogContent>
      </Dialog>
    );

  const Email = () => (
      <Dialog open={showEmail} fullWidth={true} maxWidth='xs' onBackdropClick={() => {setShowEmail(false); props.setSetShowInfo(false)}}>
          <DialogTitle textAlign='center' marginBottom='10px'>Information Request</DialogTitle>
          <DialogContent>
            <DialogContentText textAlign='center'>
              What is your preferred Email address?
            </DialogContentText>
            <Grid container direction='column' justifyContent='center' alignItems='center' marginTop='25px'>
              <TextField sx={{width: '250px', margin: '5px',}} id='email' type='email' placeholder="Email" value={email} onChange={e => {setEmail(e.target.value)}} size="large" variant='standard'/>
              <Button sx={{margin: '15px', background: '#28B7CB'}} variant='contained' onClick={switchToNumber}>Next</Button>
            </Grid>
          </DialogContent>
      </Dialog>
  );


  // Write function to verify phone number, look for box to display as phone number
  const Number = () => (
      <Dialog open={showNumber} onBackdropClick={() => {setShowNumber(false); ; props.setSetShowInfo(false)}}>
        <Box sx={{
            textAlign: 'center'
          }}>
          <DialogTitle>Information</DialogTitle>
          <DialogContent>
            <DialogContentText>
              What's a good phone number to reach you at?
            </DialogContentText>
            <Grid container direction='column' justifyContent='center' alignItems='center' marginTop='25px'>
              <TextField sx={{width: '200px', margin: '5px',}} id='phone' type='tel' placeholder='Phone Number' value={phone} onChange={handlePhoneChange} size="large" variant='standard'/>
              <Button sx={{marginTop: '15px', marginBottom: '-20px', background: '#28B7CB'}} variant='contained' onClick={switchToWork}>Next</Button>
            </Grid>
            <Button text="Next" onClick={switchToWork} />
          </DialogContent>
        </Box>
      </Dialog>
    );

  // Change to large box so all text can be seen
  const Work = () => (
      <Dialog open={showWork} onBackdropClick={() => {setShowWork(false); ; props.setSetShowInfo(false)}}>
        <Box sx={{
            textAlign: 'center'
          }}>
          <DialogTitle>Information</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Next, knowing what you do for a living gives me context as to who
              you are and what lifestyle factors are at play. Where/ what do you
              do for work?
            </DialogContentText>
            <Grid container direction='column' justifyContent='center' alignItems='center' marginTop='25px'>
            <TextField sx={{width: '500px', margin: '5px',}} multiline rows={5} id='work' type='textarea' placeholder="Enter your response here..." value={workAnswer} onChange={e => {setWorkAnswer(e.target.value)}} size="large" variant='standard'/>
            <Button sx={{margin: '15px', background: '#28B7CB'}} variant='contained' onClick={switchToGoals}>Next</Button>
            </Grid>
          </DialogContent>
        </Box>
      </Dialog>
    );

  // Change to large box so all text can be seen
  const Goals = () => (
      <Dialog open={showGoals} onBackdropClick={() => {setShowGoals(false); props.setSetShowInfo(false)}}>
        <Box sx={{
            textAlign: 'center'
          }}>
          <DialogTitle>Information</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Tell me a little about your goals and what you hope to achieve with
              CourtneyGenix.
            </DialogContentText>
            <Grid container direction='column' justifyContent='center' alignItems='center' marginTop='25px'>
            <TextField sx={{width: '500px', margin: '5px',}} multiline rows={5} id='goal' type='textarea' placeholder="Enter your response here..." value={goalAnswer} onChange={e => {setGoalAnswer(e.target.value)}} size="large" variant='standard'/>
            <Button sx={{margin: '15px', background: '#28B7CB'}} variant='contained' onClick={switchToChallenges}>Next</Button>
            </Grid>
          </DialogContent>
        </Box>
      </Dialog>
    );

  // Change to large box so all text can be seen
  const Challenges = () => (
      <Dialog open={showChallenges} onBackdropClick={() => {setShowChallenges(false); props.setSetShowInfo(false)}}>
        <Box sx={{
            textAlign: 'center'
          }}>
          <DialogTitle text>Information</DialogTitle>
          <DialogContent>
            <DialogContentText margin={2}>
              What are some of your biggest challenges you face in reaching these
              goals?
            </DialogContentText>
            <Grid container direction='column' justifyContent='center' alignItems='center' marginTop='25px'>
            <TextField sx={{width: '500px', margin: '5px',}} multiline rows={5} id='challenges' type='textarea' placeholder="Enter your response here..." value={challengeAnswer} onChange={e => {setChallengeAnswer(e.target.value)}} size="large" variant='standard'/>
            <Button sx={{margin: '15px', background: '#28B7CB'}} variant='contained' onClick={switchToSerious}>Next</Button>
            </Grid>
          </DialogContent>
        </Box>
      </Dialog>
    );

  // Get better slider from MUI
  const Serious = () => {
    
    return (
      <Dialog open={showSerious} onBackdropClick={() => {setShowSerious(false); props.setSetShowInfo(false)}}>
        <Box sx={{
            textAlign: 'center'
          }}>
          <DialogTitle>Information</DialogTitle>
          <DialogContent>
            <DialogContentText>
              On a scale of 1-10, how serious are you when it comes to reaching
              this goal and overcoming these struggles?
            </DialogContentText>
            <Grid container direction='column' justifyContent='center' alignItems='center' marginTop='25px'>
                <Slider
                  sx={{color: '#28B7CB'}}
                  size="medium"
                  min={1}
                  defaultValue={7}
                  max={10}
                  aria-label="seriousness"
                  valueLabelDisplay="auto"
                  onChange={e => setSeriousness(e.target.value)}
                />
                <Button sx={{margin: '15px', background: '#28B7CB'}} variant='contained' onClick={switchToHistory}>Next</Button>
              </Grid>
          </DialogContent>
        </Box>
      </Dialog>
    );
  };

  const History = () => (
      <Dialog open={showHistory} onBackdropClick={() => {setShowHistory(false); props.setSetShowInfo(false)}}>
          <DialogTitle textAlign="center">Information</DialogTitle>
          <DialogContent>
            <Grid container direction='column' alignItems='center' justifyContent='center'>
              <DialogContentText marginBottom="10px">
                Have you ever worked with an online coach or personal trainer in the
                past?
              </DialogContentText>
            </Grid>
            <Grid container direction='column' alignItems='center' justifyContent='center'>
              <RadioGroup row defaultValue="Yes">
                <FormControlLabel value={1} control={<Radio sx={{'&.Mui-checked':{color:'#28B7CB'}}}/>} label="Yes" onChange={e => {setHadPrevTrainer(e.target.value)}}/>
                <FormControlLabel value={0} control={<Radio sx={{'&.Mui-checked':{color:'#28B7CB'}}}/>} label="No" onChange={e => {setHadPrevTrainer(e.target.value)}}/>
              </RadioGroup>
              <Button sx={{margin: '15px', background: '#28B7CB'}} variant='contained' onClick={switchToInvest}>Next</Button>
            </Grid> 
          </DialogContent>
      </Dialog>
    );

  const Invest = () => (
      <Dialog open={showInvest} maxWidth='md' onBackdropClick={() => {setShowInvest(false); props.setSetShowInfo(false)}}>
        <DialogTitle textAlign='center'>Information</DialogTitle>
        <DialogContent>
          <DialogContentText margin={3}>
            The purpose of the discovery call is to determine IF this program is
            a good fit for you. IF we do determine that is the case, are you in
            a position to invest your time, energy, and financial commitment?
          <br/><br/>
          <Grid container direction='column' alignItems='center' justifyContent='center'>
            <RadioGroup>
              <FormControlLabel value={1} control={<Radio sx={{'&.Mui-checked':{color:'#28B7CB'}}}/>} label={investAns1} onChange={e => {setCommitAnswer(e.target.value)}}/>
              <FormControlLabel value={2} control={<Radio sx={{'&.Mui-checked':{color:'#28B7CB'}}}/>} label={investAns2} onChange={e => {setCommitAnswer(e.target.value)}}/>
              <FormControlLabel value={3} control={<Radio sx={{'&.Mui-checked':{color:'#28B7CB'}}}/>} label={investAns3} onChange={e => {setCommitAnswer(e.target.value)}}/>
            </RadioGroup>
            <Button sx={{margin: '15px', background: '#28B7CB'}} variant='contained' onClick={switchToDone}>Next</Button>
          </Grid>
          </DialogContentText>
        </DialogContent>
      </Dialog>
    );

  const Done = () => {

    return (
      <Dialog open={showDone} maxWidth='md' onBackdropClick={() => {setShowDone(false); props.setSetShowInfo(false)}}>
        <DialogTitle textAlign='center' >All Set!</DialogTitle>
        <DialogContent>
        <Grid container direction='column' alignItems='center' justifyContent='center'>
          <DialogContentText sx={{margin: '10px'}}>
            Congrats on taking the first step on your fitness journey! We will be
            in touch very shortly!
          </DialogContentText>
          {message}
          <Button sx={{margin: '20px', background: '#28B7CB'}} variant='contained' onClick={sendInfoRequest}>Done</Button>
        </Grid>
        </DialogContent>
      </Dialog>
    );
  };

  return (
    <div>
      {Name()}
      {Email()}
      {Number()}
      {Work()}
      {Goals()}
      {Challenges()}
      {Serious()}
      {History()}
      {Invest()}
      {Done()}
    </div>
  );
};

DialogBox.propTypes = {};

export default DialogBox;
