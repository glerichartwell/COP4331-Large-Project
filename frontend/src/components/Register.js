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