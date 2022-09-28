import Vid from './splashintro.mp4';
import React from 'react';

function Start() {
    console.log("ENGINE.Start()");
    var vid = [Vid];
    const SplashVid = document.createElement('video');
    SplashVid.className = "SplashVid";
    SplashVid.src = vid;
    SplashVid.playbackRate = 60;
    SplashVid.autoplay = "true";
    SplashVid.onended = () => {
        document.body.removeChild(SplashVid);
        const event = new Event('onGameStart');
        window.ongamestart();
        window.dispatchEvent(event)
    }
    document.body.appendChild(SplashVid);
}

export default Start;