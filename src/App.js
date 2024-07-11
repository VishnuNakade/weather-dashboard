import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MyAppBar from './components/AppBar';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Favorites from './pages/Favorites';

const App = () => {
  return (
    <Router>
      <MyAppBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/favorites" element={<Favorites />} />
      </Routes>
    </Router>
  );
};

export default App;
