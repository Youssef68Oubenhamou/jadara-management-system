import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from "./pages/Login";
import Register from "./pages/Register";
import logo from './jadaralogo-8ba458e5.png';
import { useState } from 'react';

const App = () => {

  const [ token , setToken ] = useState(localStorage.getItem('access-token'));

  return (
    <Router>
      <div className="bg flex items-center justify-center min-h-screen">
        <div className="w-full max-w-sm text-center">
          <img src={logo} alt="Logo" className="mb-4 w-24 mx-33" />
          <Routes>
            <Route path="/login" element={<Login setToken={setToken} />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
