import React, { lazy, Suspense } from "react";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import "../assets/css/App.css";
import { GetLoginData } from "../Engine/EngineData/Accounts";
import "../Engine/index.css";
import MainMenu from "./MainMenu";
import Start from "./start";
import { io } from "socket.io-client";
import { useState, useEffect } from "react";
import { softShadows } from "@react-three/drei";
import Vid from "../Engine/EngineData/Splash/splashintro.mp4";

export const PlayerDataContext = React.createContext({
  setPrimaryAmmo: "",
  PrimaryAmmo: "",
  setSecondaryAmmo: "",
  SecondaryAmmo: "",
  setMeleeAmmo: "",
  MeleeAmmo: "",
  setPrimaryClip: "",
  PrimaryClip: "",
  SecondaryClip: "",
  setSecondaryClip: "",
  setMeleeClip: "",
  MeleeClip: "",
  Health: 125,
  setHealth: ""
});

function App() {
  const Game = lazy(() => import("./Game"));

  softShadows();
  const [, forceUpdate] = React.useReducer((x) => x + 1, 0);

  const [PrimaryAmmo, setPrimaryAmmo] = useState(0);
  const [PrimaryClip, setPrimaryClip] = useState(0);

  const [SecondaryAmmo, setSecondaryAmmo] = useState(0);
  const [SecondaryClip, setSecondaryClip] = useState(0);

  const [MeleeAmmo, setMeleeAmmo] = useState(0);
  const [MeleeClip, setMeleeClip] = useState(0);

  const [Health, setHealth] = useState(125);

  React.useEffect(() => {
    window.forceUpdate = () => {
      forceUpdate();
    };
    window.UID = GetLoginData().uid;
    const logonToast = document.createElement("div");
    logonToast.className = "logonToast";
    logonToast.innerHTML = `
    <h3>Logged in as <b>${GetLoginData().name}</b></h3>
    `;
    document.body.appendChild(logonToast);
    setTimeout(() => {
      document.body.removeChild(logonToast);
    }, 2000);
  }, []);

  return (
    <>
      {window.location.hash == "#game" ? (
        <Suspense>
          <PlayerDataContext.Provider
            value={{
              setPrimaryAmmo: (e) => { setPrimaryAmmo(e); forceUpdate() },
              PrimaryAmmo: PrimaryAmmo,
              setSecondaryAmmo: (e) => { setSecondaryAmmo(e); forceUpdate() },
              SecondaryAmmo: SecondaryAmmo,
              setMeleeAmmo: (e) => { setMeleeAmmo(e); forceUpdate() },
              MeleeAmmo: MeleeAmmo,
              setPrimaryClip: (e) => { setPrimaryClip(e); forceUpdate() },
              PrimaryClip: PrimaryClip,
              SecondaryClip: SecondaryClip,
              setSecondaryClip: (e) => { setSecondaryClip(e); forceUpdate() },
              setMeleeClip: (e) => { setMeleeClip(e); forceUpdate() },
              MeleeClip: MeleeClip,
              Health: Health,
              setHealth: (e) => { setHealth(e); forceUpdate() }
            }}
          >
            <Game />
          </PlayerDataContext.Provider>
        </Suspense>
      ) : (
        ""
      )}
      {window.location.hash == "#mainmenu" ? <MainMenu /> : ""}
      <video
        onLoadedData={(e) => {
          setTimeout(() => {
            document.getElementsByClassName("SplashVid")[0].playbackRate = 16;
            document.getElementsByClassName("SplashVid")[0].play();
          }, 2000);
        }}
        className="SplashVid"
        src={Vid}
        onEnded={() => {
          window.location.hash = "#mainmenu";
          window.forceUpdate();
        }}
      />
    </>
  );
}

export default App;
