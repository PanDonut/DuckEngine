import React from 'react'
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import '../assets/css/App.css'
import { GetLoginData } from '../Engine/EngineData/Accounts';
import '../Engine/index.css'
import MainMenu from './MainMenu';
import Start from './start';
import { io } from 'socket.io-client'
import { useState, useEffect } from 'react';
import Game from './Game';
import { softShadows } from '@react-three/drei';

function App() {

  softShadows();
  const [, forceUpdate] = React.useReducer((x) => x + 1, 0);
    
  React.useEffect(() => {
    window.forceUpdate = () => {
      forceUpdate()
    }
    window.UID = GetLoginData().uid;
    const logonToast = document.createElement("div");
    logonToast.className = "logonToast";
    logonToast.innerHTML = `
    <h3>Logged in as <b>${GetLoginData().name}</b></h3>
    `
    document.body.appendChild(logonToast);
    setTimeout(() => {
        document.body.removeChild(logonToast);
    }, 2000)
  }, [])

  return (
    <>
      <Game/>
      <div className='cel'/>
      <div className='UIAmmo'>
        <h2>{window.PrimaryClip}</h2>
        <h3>{window.PrimaryAmmo}</h3>
      </div>
    </>
  )
}

export default App
