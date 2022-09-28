import * as ReactDOM from 'react-dom/client';
import React from 'react'
import { render } from 'react-dom'
import App from './components/App'
import InitializeLogon from './Engine/EngineData/Accounts/InitLogon';
import { GetLoginData } from './Engine/EngineData/Accounts';
import { Start } from './Engine/EngineData/Splash';
import OfflineLogon from './Engine/EngineData/Accounts/OfflineLogon';

// Since we are using HtmlWebpackPlugin WITHOUT a template, we should create our own root node in the body element before rendering into it
let root = document.createElement('div')

root.id = 'root'
document.body.appendChild(root)

// Now we can render our application into it
const gameroot = ReactDOM.createRoot(document.getElementById('root'))
gameroot.render(<App/>)

setTimeout(() => {
    // InitializeLogon();
    OfflineLogon();
    if (GetLoginData() != null) Start();
}, 1000)

window.addEventListener(
    'beforeunload',
    function(e){
        e.stopPropagation();e.preventDefault();return false;
    },
    true
);