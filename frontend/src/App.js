import { BrowserRouter, Routes , Route } from 'react-router-dom';

import { useState } from 'react';

import Landing from './pages/Landing';
import RequestInformation from './pages/RequestInformation';
import TrainerDashboard from './pages/TrainerDashboard';
import ClientDashboard from './pages/ClientDashboard';

import './App.css';
import AccessDenied from './pages/AccessDenied';

function App() {
  
  return (
    <body className='site-container'>
      <BrowserRouter>
        <Routes>
          <Route path="/" exact element={<Landing/>}/>
          <Route path="/request-info" exact element={<RequestInformation/>}/>
          <Route path="/trainer-dashboard" exact element={<TrainerDashboard/>}/>
          <Route path="/" exact element={<Landing />}/>
          <Route path="/request-info" exact element={<RequestInformation/>} />
          <Route path="/trainer-dashboard" exact element={<TrainerDashboard/>} />
          <Route path="/dashboard" exact element={<ClientDashboard/>}/>
          <Route path="/register" exact element={<RegisterPage />} />
          <Route path="/access-denied" exact element={<AccessDenied />} />
        </Routes>
      </BrowserRouter>
    </body>
  );
}

export default App;
