import React from 'react'
import LoginForm from './LoginForm';
import { useState } from 'react'
import './Login.css'



const Login = props => {

    const [showLoginSection,  setShowLoginSection] = useState(true)

    const LoginSection = () => {
      return (
        <div >
          <div className={showLoginSection ? 'login-container': 'hidden-left'}>
           <div className='login-component'>
            <LoginForm/>
            <div id='forgot'><a href='/forgot-password'>Forgot Password</a></div>
            </div>
          </div>
        </div>
      )
    }
    
    return (
        <div>
            <LoginSection/>
        </div>
    )
}

export default Login
