import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css"
import Login from "./Spotify/Login"
import Dashboard from "./Spotify/Dashboard"

function App() {
  const code = new URLSearchParams(window.location.search).get("code")

  return code ? <Dashboard code={code} /> : <Login />
}

export default App;

