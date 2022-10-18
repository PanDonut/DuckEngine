import Vid from './splashintro.mp4';
import React from 'react';

function Start() {
    console.log("ENGINE.Start()");
    var vid = [Vid];
    const SplashVid = document.createElement('video');
    SplashVid.className = "SplashVid";
    SplashVid.src = vid;
    SplashVid.playbackRate = 10;
    SplashVid.autoplay = "true";
    SplashVid.onended = () => {
        window.location.hash = "#mainmenu"
        document.body.removeChild(SplashVid);
        window.forceUpdate();
    }
    document.body.appendChild(SplashVid);
}

export default Start;