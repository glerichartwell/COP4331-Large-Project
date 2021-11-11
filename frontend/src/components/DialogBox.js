import React from "react";
import Dialog from "@mui/material/Dialog";
import { DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { useState, useRef } from "react";
import TwoEntry from "./TwoEntry";
import Button from "./Button";
import TextBox from "./TextBox";
import { useNavigate } from "react-router-dom";

const DialogBox = (props) => {
  const [name, setName] = useState(true);
  const [email, setEmail] = useState(false);
  const [number, setNumber] = useState(false);
  const [work, setWork] = useState(false);
  const [goals, setGoals] = useState(false);
  const [challenges, setChallenges] = useState(false);
  const [serious, setSerious] = useState(false);
  const [invest, setInvest] = useState(false);
  const [history, setHistory] = useState(false);
  const [done, setDone] = useState(false);
  const [message, setMessage] = useState(false);
  const navigate = useNavigate();

  const firstName = useRef(null);
  const lastName = useRef(null);
  const middleName = useRef(null);
  const emailref = useRef(null);
  const phone = useRef(null);
  const work = useRef(null);
  const goal = useRef(null);
  const struggle = useRef(null);
  const commit = useRef(null);
  const hist = useRef(null);
  const commitansRef = useRef(null);

  const commitment = document.querySelector("#serious");
  const output = document.querySelector(".serious-output");

  output.textContent = commitment.value;

  commitment.addEventListener("input", function () {
    output.textContent = commitment.value;
  });

  const sendInfoRequest = async (event) => {
    event.preventDefault();

    var obj = {
      firstName: firstName.current.value,
      middleName: middleName.current.value,
      lastName: lastName.current.value,
      email: emailref.current.value,
      phone: phone.current.value,
      workAnswer: work.current.value,
      goalAnswer: goal.current.value,
      challengeAnswer: struggle.current.value,
      seriousness: commit.current.value,
      prevTrainer: hist.current.value,
      commitAnswer: commitansRef.current.value,
    };
    var js = JSON.stringify(obj);

    try {
      const response = await fetch(
        "http://localhost:5000/api/RequestInformationAPI",
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
        setMessage("Unable to process info request");
      }
    } catch (e) {
      console.log(e);
    }

    navigate(`/`);
  };

  const switchToEmail = () => {
    // handleClose();
    setEmail(true);
    setName(false);
  };

  const switchToNumber = () => {
    setNumber(true);
    setEmail(false);
  };

  const switchToWork = () => {
    packageanswers();
    setWork(true);
    setNumber(false);
  };

  const switchToGoals = () => {
    setGoals(true);
    setWork(false);
  };

  const switchToChallenges = () => {
    setChallenges(true);
    setGoals(false);
  };

  const switchToSerious = () => {
    setSerious(true);
    setChallenges(false);
  };

  const switchToHistory = () => {
    setHistory(true);
    setSerious(false);
  };

  const switchToInvest = () => {
    setInvest(true);
    setHistory(false);
  };

  const switchToDone = () => {
    setDone(true);
    setInvest(false);
  };

  const Name = () => {
    return (
      <Dialog open={name}>
        <DialogTitle>Information</DialogTitle>
        <DialogContent>
          <DialogContentText>
            What's your First, Middle, and Last name?
          </DialogContentText>
          {/* Change TwoEntry Boxes to inputs */}
          {/* <input ref={firstName}> */}
          <input
            type="text"
            id="loginName"
            placeholder="First Name"
            ref={firstName}
          />
          <br />
          <input
            type="text"
            id="loginName"
            placeholder="Middle Name"
            ref={middleName}
          />
          <br />
          <input
            type="text"
            id="lastName"
            placeholder="Last Name"
            ref={lastName}
          />
          <input
            type="submit"
            id="loginButton"
            class="butt"
            value="Submit"
            onClick={names}
          />
          <Button text="Next" onClick={switchToEmail} />
        </DialogContent>
      </Dialog>
    );
  };

  const Email = () => {
    return (
      <Dialog open={email}>
        <DialogTitle>Information</DialogTitle>
        <DialogContent>
          <DialogContentText>
            What is your preferred Email address?
          </DialogContentText>
          <input type="email" id="email" placeholder="Email" ref={email} />
          <Button text="Next" onClick={switchToNumber} />
        </DialogContent>
      </Dialog>
    );
  };

  const Number = () => {
    return (
      <Dialog open={number}>
        <DialogTitle>Information</DialogTitle>
        <DialogContent>
          <DialogContentText>
            What's a good phone number to reach you at? (numbers only, enforce
            length)
          </DialogContentText>
          <form onSubmit={names}>
            <input type="tel" id="tel" placeholder="Ph. Number" ref={number} />
          </form>
          <Button text="Next" onClick={switchToWork} />
        </DialogContent>
      </Dialog>
    );
  };

  const Work = () => {
    return (
      <Dialog open={work}>
        <DialogTitle>Information</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Next, knowing what you do for a living gives me context as to who
            you are and what lifestyle factors are at play. Where/ what do you
            do for work? (Short paragraph)
          </DialogContentText>
          <input
            type="text"
            id="text"
            placeholder="Enter your response here..."
            ref={work}
          />
          <Button text="Next" onClick={switchToGoals} />
        </DialogContent>
      </Dialog>
    );
  };

  const Goals = () => {
    return (
      <Dialog open={goals}>
        <DialogTitle>Information</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Tell me a little about your goals and what you hope to achieve with
            CourtneyGenix. (Short paragraph)
          </DialogContentText>
          <input
            type="text"
            id="text"
            placeholder="Enter your response here..."
            ref={goal}
          />
          <Button text="Next" onClick={switchToChallenges} />
        </DialogContent>
      </Dialog>
    );
  };

  const Challenges = () => {
    return (
      <Dialog open={challenges}>
        <DialogTitle>Information</DialogTitle>
        <DialogContent>
          <DialogContentText>
            What are some of your biggest challenges you face in reaching these
            goals? (Short paragraph)
          </DialogContentText>
          <input
            type="text"
            id="text"
            placeholder="Enter your response here..."
            ref={struggle}
          />
          <Button text="Next" onClick={switchToSerious} />
        </DialogContent>
      </Dialog>
    );
  };

  const Serious = () => {
    return (
      <Dialog open={serious}>
        <DialogTitle>Information</DialogTitle>
        <DialogContent>
          <DialogContentText>
            On a scale of 1-10, how serious are you when it comes to reaching
            this goal and overcoming these struggles? (scale of 1-10 that they
            can select the number, or fill in the blank)
          </DialogContentText>
          <input
            type="range"
            name="serious"
            id="serious"
            min="1"
            max="10"
            step="1"
            value="5"
            ref={commit}
          />
          <output class="serious-output" for="serious"></output>
          <Button text="Next" onClick={switchToHistory} />
        </DialogContent>
      </Dialog>
    );
  };

  const History = () => {
    return (
      <Dialog open={history}>
        <DialogTitle>Information</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Have you ever worked with an online coach or personal trainer in the
            past? (yes or no, MC answer)
          </DialogContentText>
          <input type="radio" id="yes" name="yes" value="1" ref={hist} />
          <label for="yes">Yes</label>
          <input type="radio" id="no" name="no" value="0" ref={hist} />
          <label for="no">No</label>
          <Button text="Next" onClick={switchToInvest} />
        </DialogContent>
      </Dialog>
    );
  };

  const Invest = () => {
    return (
      <Dialog open={invest}>
        <DialogTitle>Information</DialogTitle>
        <DialogContent>
          <DialogContentText>
            The purpose of the discovery call is to determine IF this program is
            a good fit for you. IF we do determine that is the case, are you in
            a position to invest your time, energy, and financial commitment?
            **Three answers to choose from: A. I have the finances/energy to
            invest in my personal growth, knowledge, and health B. I am willing
            to invest if I believe the program and accountability can deliver
            results C. I am not in a position where I can invest in my personal
            growth, health, and physique at this time.
          </DialogContentText>
          <input type="radio" id="A" name="A" value="0" ref={commitansRef} />
          <label for="A">A</label>
          <input type="radio" id="B" name="B" value="1" ref={commitansRef} />
          <label for="B">B</label>
          <input type="radio" id="C" name="C" value="2" ref={commitansRef} />
          <label for="C">C</label>
          <Button text="Next" onClick={switchToDone} />
        </DialogContent>
      </Dialog>
    );
  };

  const Done = () => {
    return (
      <Dialog open={done}>
        <DialogTitle>All Set</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Congrats on taking the first step on your fitness journey! I will be
            in touch very shortly!
          </DialogContentText>
          {/* <TextBox placeholder='(Short paragraph)' onChange=''/> */}
          <Button text="Done" onClick={sendInfoRequest} />
        </DialogContent>
      </Dialog>
    );
  };

  return (
    <div>
      <Name />
      <Email />
      <Number />
      <Work />
      <Goals />
      <Challenges />
      <Serious />
      <History />
      <Invest />
      <Done />
    </div>
  );
};

DialogBox.propTypes = {};

export default DialogBox;
=======
import React from 'react'
import Dialog from '@mui/material/Dialog'
import { DialogContent, DialogContentText, DialogTitle } from '@mui/material'
import { useState, useRef } from 'react'
import TwoEntry from './TwoEntry'
import Button from './Button'
import TextBox from './TextBox'
import { useNavigate } from 'react-router-dom';

const DialogBox = props => {
    const [ name, setName ] = useState(true);
    const [ email, setEmail ] = useState(false);
    const [ number, setNumber ] = useState(false);
    const [ work, setWork ] = useState(false);
    const [ goals, setGoals ] = useState(false);
    const [ challanges, setChallanges ] = useState(false);
    const [ serious, setSerious ] = useState(false);
    const [ invest, setInvest ] = useState(false);
    const [ history, setHistory ] = useState(false);
    const [ done, setDone ] = useState(false);
    const [message, setMessage] = useState(false);
    const navigate = useNavigate();

    const firstName = useRef(null);
    
    const Home = () => {

        // Package reference data into JSON data

        navigate(`/`);
    
    }

    const switchToEmail = () => {
        // handleClose();
        setEmail(true)
        setName(false);
    }

    const switchToNumber = () => {
        setNumber(true)
        setEmail(false)
    }

    const switchToWork = () => {
        setWork(true)
        setNumber(false)
    }

    const switchToGoals = () => {
        setGoals(true)
        setWork(false)
    }

    const switchToChallanges = () => {
        setChallanges(true)
        setGoals(false)
    }

    const switchToSerious = () => {
        setSerious(true)
        setChallanges(false)
    }

    const switchToHistory = () => {
        setHistory(true)
        setSerious(false)
    }

    const switchToInvest = () => {
        setInvest(true)
        setHistory(false)
    }

    const switchToDone = () => {
        setDone(true)
        setInvest(false)
    }


    const Name = () => {
        return (
            <Dialog open={name}>
                <DialogTitle>Information</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        What's your First and Last name?
                    </DialogContentText>
                    {/* Change TwoEntry Boxes to inputs */}
                    {/* <input ref={firstName}> */}
                    <TwoEntry placeholder1='First Name' placeholder2='Last Name'/>
                    <Button text='Next' onClick={switchToEmail}/>
                </DialogContent>
            </Dialog>
        );
    }

    const Email = () => {
        return (
            <Dialog open={email}>
                <DialogTitle>Information</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        What is your preferred Email address?    
                    </DialogContentText>
                    <TextBox placeholder='Email' onChange=''/>
                    <Button text='Next' onClick={switchToNumber}/>
                </DialogContent>
            </Dialog>
        );
    }
    
    const Number = () => {
        return (
            <Dialog open={number}>
                <DialogTitle>Information</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        What's a good phone number to reach you at? 
                        (numbers only, enforce length)   
                    </DialogContentText>
                    <TextBox placeholder='Email' onChange=''/>
                    <Button text='Next' onClick={switchToWork}/>
                </DialogContent>
            </Dialog>
        );
    }
    
    const Work = () => {
        return (
            <Dialog open={work}>
                <DialogTitle>Information</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Next, knowing what you do for a living 
                        gives me context as to who you are and 
                        what lifestyle factors are at play. Where/
                        what do you do for work? (Short paragraph)                    
                    </DialogContentText>
                    <TextBox placeholder='Email' onChange=''/>
                    <Button text='Next' onClick={switchToGoals}/>
                </DialogContent>
            </Dialog>
        );
    }
    
    const Goals = () => {
        return (
            <Dialog open={goals}>
                <DialogTitle>Information</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Tell me a little about your goals 
                        and what you hope to achieve with 
                        CourtneyGenix. (Short paragraph)    
                    </DialogContentText>
                    <TextBox placeholder='(Short paragraph)' onChange=''/>
                    <Button text='Next' onClick={switchToChallanges}/>
                </DialogContent>
            </Dialog>
        );
    }
    
    const Challanges = () => {
        return (
            <Dialog open={challanges}>
                <DialogTitle>Information</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        What are some of your biggest 
                        challenges you face in reaching 
                        these goals? (Short paragraph)    
                    </DialogContentText>
                    <TextBox placeholder='(Short paragraph)' onChange=''/>
                    <Button text='Next' onClick={switchToSerious}/>
                </DialogContent>
            </Dialog>
        );
    }
    
    const Serious = () => {
        return (
            <Dialog open={serious}>
                <DialogTitle>Information</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        On a scale of 1-10, how serious are 
                        you when it comes to reaching this 
                        goal and overcoming these struggles? 
                        (scale of 1-10 that they can select 
                        the number, or fill in the blank)
                    </DialogContentText>
                    <TextBox placeholder='Seriousness' onChange=''/>
                    <Button text='Next' onClick={switchToHistory}/>
                </DialogContent>
            </Dialog>
        );
    }
    
    const History = () => {
        return (
            <Dialog open={history}>
                <DialogTitle>Information</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Have you ever worked with an 
                        online coach or personal trainer 
                        in the past? (yes or no, MC answer)    
                    </DialogContentText>
                    <TextBox placeholder='answer' onChange=''/>
                    <Button text='Next' onClick={switchToInvest}/>
                </DialogContent>
            </Dialog>
        );
    }
    
    const Invest = () => {
        return (
            <Dialog open={invest}>
                <DialogTitle>Information</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                    The purpose of the discovery call is to determine 
                    IF this program is a good fit for you. 
                    IF we do determine that is the case, 
                    are you in a position to invest your time, 
                    energy, and financial commitment?
                    **Three answers to choose from:
                    A. I have the finances/energy to invest in my personal growth, knowledge, and health
                    B. I am willing to invest if I believe the program and accountability can deliver results
                    C. I am not in a position where I can invest in my personal growth, health, and physique at this time. What is your preferred Email address?    
                    </DialogContentText>
                    <Button text='Next' onClick={switchToDone}/>
                </DialogContent>
            </Dialog>
        );
    }

  
    const Done = () => {
        return (
            <Dialog open={done}>
                <DialogTitle>All Set</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Congrats on taking the first step on 
                        your fitness journey! I will be in 
                        touch very shortly!
                    </DialogContentText>
                    {/* <TextBox placeholder='(Short paragraph)' onChange=''/> */}
                    <Button text='Done' onClick={Home}/>
                </DialogContent>
            </Dialog>
        );
    }
    

    return (
        <div>
            <Name/>
            <Email/>
            <Number/>
            <Work/>
            <Goals/>
            <Challanges/>
            <Serious/>
            <History/>
            <Invest/>
            <Done/>
            
        </div>
    )
}

DialogBox.propTypes = {

}

export default DialogBox

