import React, { lazy, Suspense } from 'react'
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import '../assets/css/App.css'
import { GetLoginData } from '../Engine/EngineData/Accounts';
import '../Engine/index.css'
import MainMenu from './MainMenu';
import Start from './start';
import { io } from 'socket.io-client'
import { useState, useEffect } from 'react';
import { softShadows } from '@react-three/drei';
import Vid from '../Engine/EngineData/Splash/splashintro.mp4';

function App() {

  const Game = lazy(() => import('./Game'))

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
      {
      window.location.hash == "#game" ?
      <Suspense>
        <Game/>
      </Suspense>     
      :
      ''
      }
      {
      window.location.hash == "#mainmenu" ?
      <MainMenu/>
      :
      ''
      }
      <video onLoadedMetadata={(e) => {document.getElementsByClassName("SplashVid")[0].playbackRate = 10}} className='SplashVid' autoPlay src={Vid} onEnded={() => {
        window.location.hash = "#mainmenu"
        window.forceUpdate();
      }}/>    
    </>
  )
}

export default App
