import { BrowserRouter, Routes , Route } from 'react-router-dom';

import Landing from './pages/Landing';
import RequestInformation from './pages/RequestInformation';
import TrainerDashboard from './pages/TrainerDashboard';
import ClientDashboard from './pages/ClientDashboard';

import './App.css';

function App() {


  return (
    <body className='site-container'>
      <BrowserRouter>
        <Routes>
          <Route path="/" exact element={<Landing/>}/>
          <Route path="/request-info" exact element={<RequestInformation/>}/>
          <Route path="/trainer-dashboard" exact element={<TrainerDashboard/>}/>
          <Route path="/dashboard" exact element={<ClientDashboard/>}/>
        </Routes>
      </BrowserRouter>
    </body>
  );
}

export default App;
