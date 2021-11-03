import React from 'react'
import TextBox from './TextBox';
import Button from './Button';
import TwoEntry from './TwoEntry';
import LoginForm from './LoginForm';
import { useState, useRef, useEffect } from 'react'
import './LoginRegister.css'
import { useHistory } from "react-router-dom"


const LoginRegister = props => {

    const [showRegisterSection,  setShowRegistrationSection] = useState(false)
    const [showLoginSection,  setShowLoginSection] = useState(true)
    const history = useHistory();

    //show registration component and hide all others
    const activate = () => {
      // setShowRegistrationSection(true);
      // setShowLoginSection(false);
      let path = `/requestinformation`;
      history.push(path)
      
    }
    
    //show login component and hide all others
    const original = () => {
      setShowLoginSection(true);
      setShowRegistrationSection(false);
    }


    useEffect(() => {
      //bind to page
      document.addEventListener('mousedown', original);
      return () => {
        //unbind from page
        document.removeEventListener('mouseclick', activate);
      }
    }, []);
  
    const LoginSection = () => {
      return (
        <div >
          <div className={showLoginSection ? 'login-container': 'hidden-left'}>
           <div className='login-component'>
            {/* <div>Login</div> */}
            
            {/* <TwoEntry placeholder1="Email" placeholder2="Password"/> */}
            
            <LoginForm/>

            {/* <Button className='logbtn' text='Login' onClick={doLogin}/> */}
    
            <div id='forgot'><a href=''>Forgot Password</a></div>
    
            <div className='signup'>
                Don't Have a Membership? <button onClick={activate}> Request Information </button>
            </div>
          </div>
          </div>
        </div>
      )
    }
    
    const RegisterSection = () => {
      return (
        <div className={showRegisterSection ? 'register-container': 'hidden-right'}>
        {/* "register-container"> */}
          <div className='register-component'>

              <div>Register</div>
          
              <TwoEntry placeholder1="First Name" placeholder2="Last Name"/>
              <TwoEntry placeholder1="Email" placeholder2="Password"/>
              <TextBox placeholder="Confirm Password"/>
              <Button className='logbtn' text='Register'/>
  
              <div id='forgot'>Forgot Password</div>
      
          <div className='signup'>
            Already have an account?<button onClick={original}>  Sign in </button>
          </div>
          </div>
        </div>
      )
    }

    return (
        <div>
            <LoginSection/>
            <RegisterSection/>
            
        </div>
    )
}

export default LoginRegister
