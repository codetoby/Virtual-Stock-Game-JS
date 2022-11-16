import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './Login';
import Home from './Home';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <Routes>
      <Route path="/userportfolio" element = {<App />} />
      <Route path="/login" element = {<Login />} />
      <Route path="/" element = {<Home />} />
    </Routes>
  </BrowserRouter>,
    
  </React.StrictMode>
);
