import { BrowserRouter, Routes , Route } from 'react-router-dom';

import Landing from './pages/Landing';
import RequestInformation from './pages/RequestInformation';
import TrainerDashboard from './pages/TrainerDashboard'
import RegisterPage from "./RegisterPage"

import './App.css';

function App() {


  return (
    <body className='site-container'>
      <BrowserRouter>
        <Routes>
          <Route path="/" exact element={<Landing/>}/>
          <Route path="/request-info" exact element={<RequestInformation/>} />
          <Route path="/trainer-dashboard" exact element={<TrainerDashboard/>} />
          <Route path="/register" exact element={<RegisterPage />} />
        </Routes>
      </BrowserRouter>
    </body>
  );
}

export default App;
