import { BrowserRouter, Routes , Route } from 'react-router-dom';

import Landing from './pages/Landing';
import RequestInformation from './pages/RequestInformation';
import ForgotPass from './components/ForgotPass';
import TrainerDashboard from './pages/TrainerDashboard'


import './App.css';

function App() {


  return (
    <body className='site-container'>
      <BrowserRouter>
        <Routes>
          <Route path="/" exact element={<Landing/>}/>
          <Route path="/request-info" exact element={<RequestInformation/>}/>
          <Route path="/forgot-password" exact element={<ForgotPass/>}/>
          <Route path="/trainer-dashboard" exact element={<TrainerDashboard/>}/>
        </Routes>
      </BrowserRouter>
    </body>
  );
}

export default App;
