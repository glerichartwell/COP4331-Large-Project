import logo from './logo.svg';
import './App.css';
import TextBox from "./components/TextBox"
import Button from './components/Button';
import TwoEntry from './components/TwoEntry';
import { useState } from 'react'
import LoginRegister from './components/LoginRegister';
import Landing from './pages/Landing';
import RequestInformation from './pages/RequestInformation';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";


function App() {


  return (
    <body className='site-container'>
      <Router>
        {/* avoid rendering all components */}
        <Switch>
          <Route path="/" exact component={Landing}/>
          
          <Route path="/requestinformation" exact component={RequestInformation}/>

        </Switch>
      </Router>

      {/* <RequestInformation/> */}
      {/* <Landing /> */}
      {/* <LoginRegister/> */}

      {/* visible by default the disappear when account is clicked */}
      {/* {showLoginSection ? <LoginSection/> : null} */}
      {/* once register is clicked this becomes visible */}
      {/* --------------------------------------------- */}
      {/* {showRegisterSection ? <RegisterSection/> : null} */}
      {/* --------------------------------------------- */}
      {/* <div className={showLoginSection ? 'login-section': 'hidden-left'}> */}
      {/* <LoginSection/> */}
      {/* </div> */}
      {/* <div className={false ? 'register-section': 'hidden-right'}> */}
      {/* <RegisterSection/> */}
      {/* </div> */}

    </body>
  );
}





export default App;
