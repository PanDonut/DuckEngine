import React from 'react'
import { useEffect } from 'react'
import { useNavigate } from "react-router-dom";

export default function Start() {
    const navigate = useNavigate();
    useEffect(() => {
        setTimeout(() => {
            navigate("/game");
        }, 5000)        
    }, [])
    return (
        <div className='start'></div>
    )
}