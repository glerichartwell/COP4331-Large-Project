import React from 'react'
import PropTypes from 'prop-types'
import Button from '../components/Button'
import './Landing.css'
import { useState } from 'react'
import LoginRegister from './LoginRegister'
import { useOktaAuth } from "@okta/okta-react"

const Landing = props => {

    const { authState, oktaAuth } = useOktaAuth();
    const login = () => oktaAuth.signInWithRedirect({ originalUri: "/pages/trainerDashboard" })

    const [showLog, setShowLog] = useState(true)
    const activate= () =>{
      setShowLog(false);
    }

    const Landing = () => {
        return (
        <div>
            
            <div className={showLog ? 'landing-top-container' : 'hide-landing-top-container'}>
                <div className='name'><span>CourtneyGenix</span></div>
                
                <div className='landing-btn'><Button text='Login' onClick={login}/></div>
                
            </div>
            {/* <div id='slogan'>
                Your journey to healthy living starts here!
            </div> */}

            <div className={showLog ? 'landing-bottom-container' : 'hide-landing-bottom-container'}>

                <div id='contact-us'>
                    Contact Us
                </div>
                <div id='about-us'>
                    About Us
                </div>
                <div id='success-stories'>
                    Success Stories
                </div>
            </div>  
        </div>     
        )
    }

    return (
        <div>
            
            <Landing/>
            {showLog ? null:  <LoginRegister/>}
            
        </div>
    )
}

Landing.propTypes = {

}

export default Landing
