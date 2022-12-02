import * as ReactDOM from 'react-dom/client';
import React from 'react'
import { render } from 'react-dom'
import App from './components/App'
import InitializeLogon from './Engine/EngineData/Accounts/InitLogon';
import { GetLoginData } from './Engine/EngineData/Accounts';
import { Start } from './Engine/EngineData/Splash';
import OfflineLogon from './Engine/EngineData/Accounts/OfflineLogon';
import FONT from './assets/css/pixel.woff'

window.location.hash = "";
// Since we are using HtmlWebpackPlugin WITHOUT a template, we should create our own root node in the body element before rendering into it
let root = document.createElement('div')

root.id = 'root'
document.body.appendChild(root)

document.documentElement.style.setProperty("--url", `url(${FONT})`)
window.ServerIP = ""
// Now we can render our application into it
const gameroot = ReactDOM.createRoot(document.getElementById('root'))
gameroot.render(<App/>)

setTimeout(() => {
    // InitializeLogon();
    OfflineLogon();
    const e = new Event("EngineStart");
    window.dispatchEvent(e)
    if (GetLoginData() != null) Start();
}, 1000)

window.ongamelogin = () => {
    console.log("gamelogin event")
}
window.ongamestart = () => {
    console.log("gamestart event")
}

if (localStorage.getItem("setting.pixelScale") == null) {
    localStorage.setItem("setting.pixelScale", 5)
}

if (localStorage.getItem("setting.shadowQ") == null) {
    localStorage.setItem("setting.shadowQ", 1)
}

if (localStorage.getItem("setting.AO") == null) {
    localStorage.setItem("setting.AO", "false")
}

if (localStorage.getItem("setting.antialiasing") == null) {
    localStorage.setItem("setting.antialiasing", "true")
}

if (localStorage.getItem("setting.antialiasingMode") == null) {
    localStorage.setItem("setting.antialiasingMode", 2)
}

if (localStorage.getItem("setting.DoF") == null) {
    localStorage.setItem("setting.DoF", "true")
}

if (localStorage.getItem("setting.Bloom") == null) {
    localStorage.setItem("setting.Bloom", "true")
}

if (localStorage.getItem("setting.Vignette") == null) {
    localStorage.setItem("setting.Vignette", "true")
}

if (localStorage.getItem("setting.use3Dmodel") == null) {
    localStorage.setItem("setting.use3Dmodel", "true")
}

if (localStorage.getItem("setting.csOP") == null) {
    localStorage.setItem("setting.csOP", 1)
}

if (localStorage.getItem("loadout") == null) {
    localStorage.setItem("loadout", JSON.stringify(["bab", "aba", "naba"]))
}

window.addEventListener(
    'beforeunload',
    function(e){
        e.stopPropagation();e.preventDefault();return false;
    },
    true
);

// Class extensions

Array.prototype.random = function() {
    return this[this.length * Math.random() | 0];
};

Math.randomInRange = function(min, max, decimalPoints) {
    const str = (Math.random() * (max - min) + min).toFixed(decimalPoints);
    return parseFloat(str);
}

// Plugin crap

window.API = {};
window.API.HUD = {
    inject: (element, style) => {
        const styleFile = document.createElement("style");
        styleFile.innerHTML = `
        ${element.replace("#", ".")} {
            ${style}
        }
        `
        document.body.appendChild(styleFile);
    }
}
window.API.Plugins = {};
window.API.dom = {};
window.API.Data = API;
window.API.AddData = (data) => {API.push(data)}

function InitPlugin(manifest) {
  if (window.ExtensionManifest == undefined) {
      window.ExtensionManifest = [];
  }
  window.ExtensionManifest.push(manifest);
  console.log(manifest.name + " - MOD INIT");
}
window.API.Plugins.InitPlugin = InitPlugin;

if (localStorage.getItem("df_extenstions") != null) {
  JSON.parse(localStorage.getItem("df_extenstions")).forEach(element => {
    setTimeout(() => {       
      var scriptInject = document.createElement("script");
    //   scriptInject.innerHTML = `this.onerror = (e) => { console.error("Uncaught Mod Error:"); console.error(e, ":(")  } \n` + element.script;
      scriptInject.innerHTML = `try {\n` + element.script + `\n} catch(e) { 
        console.error("%cUncaught Mod Error: \\n", 'font-size: 18px;', "\\n" + e.toString()); \n}`;
      document.body.appendChild(scriptInject);
      window.API.Plugins.List = window.ExtensionManifest;
    }, 300)   
  });
}