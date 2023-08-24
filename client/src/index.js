import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import Home from './Components/Homepage/Home.js';
import { DogDetails } from './Components/DogDetails/DogDetails.js';
import { AllWalkers } from './Components/Walkers/AllWalkers.js';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route
        path="/"
        element={<App />}
      >
        <Route
          index
          element={<Home />}
        />
        <Route
          path="/dogdetails/:dogId"
          element={<DogDetails />}
        />
        <Route
          path="/walkers"
          element={<AllWalkers />}
        />
      </Route>
    </Routes>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
