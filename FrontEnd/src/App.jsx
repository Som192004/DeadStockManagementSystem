import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Deadstock from './Pages/Deadstock';
import Historycard from './Pages/Historycard';
import Check from './Pages/Check'; // Import the Check component 
import AllHistoryCards from './Pages/AllHistoryCards';
import Login from './Login';
import Register from './Register';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/deadstock' element={<Deadstock />}>
          <Route path='check' element={<Check />} />
        </Route>
        <Route path='/history_card' element={<Historycard />} />
        <Route path='/specific_history_card' element={<AllHistoryCards />} />
      </Routes>
    </Router>
  );
}

export default App;
