import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Navbar';
import About from './pages/About';
import Create from './pages/Create';
import Delete from './pages/Delete';
import Read from './pages/Read';
import Update from './pages/Update';
function App() {

    



    return (<div>
        <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" exact element= {<About />} />
          <Route path="/create" element={<Create />} />
          <Route path="/read" element={<Read />} />
          <Route path="/update" element={<Update />} />
          <Route path="/delete" element={<Delete />} />
        </Routes>
      </div>
    </Router>
    </div>

    ); // return end
} // App end
export default App;