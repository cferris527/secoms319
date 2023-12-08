import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Navbar';
import Create from './pages/Create';
import Read from './pages/Read';
import Update from './pages/Update';
import Delete from './pages/Delete';
import About from './pages/About';

const App = () => {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" exact element={<About/>} />
          <Route path="/create" element ={<Create/>} />
          <Route path="/read" element={<Read/>} />
          <Route path="/update" element={<Update/>} />
          <Route path="/delete" element={<Delete/>} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
