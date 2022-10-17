import React, { Suspense } from 'react'
import Spinner from './spinner.png';
import { useEffect } from 'react';
import { lazy } from 'react';

function Loader() {
    return (
        <div className='LoadScreen'>
            <div className='spinner' style={{backgroundImage: `url(${Spinner})`}}/>
        </div> 
    )
}

export default function MainMenu() {
    const MenuUI = lazy(() => import("./MainMenuUI"));
    return (
        <div>              
            <Suspense fallback={<div/>}>              
                <MenuUI/>  
            </Suspense>
            <Loader/>
        </div>
    )
}