import logo from './logo.svg';
import './App.css';
import TextBox from "./components/TextBox"
import Button from './components/Button';
import TwoEntry from './components/TwoEntry';
import { useState } from 'react'
import LoginRegister from './pages/LoginRegister';
import Landing from './pages/Landing';

function App() {


  return (
    <body>
      
      
      <Landing />
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
