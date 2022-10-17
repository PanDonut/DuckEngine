import React, { useState, useEffect, Suspense } from "react"
import { io } from "socket.io-client"
import { ControlsWrapper } from '../Engine/EngineData/Player/Controls';
import { UserWrapper } from '../Engine/EngineData/Player/Player';
import { Canvas, useThree } from '@react-three/fiber';
import { OrbitControls, Text, Stats, Environment, Lightformer, ambientLight } from '@react-three/drei'
import { useRef } from 'react';
import { useLoader } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import Sunset from './sky.hdr'
import { usePersonControls } from '../Engine/EngineData/Player/Input'
import { useSphere, Physics } from "@react-three/cannon";
import { DefMap } from "../Engine/EngineData/Maps/defmap";
import { Cube } from "../Engine/EngineData/Components/Cube.js";
import { Plane } from "../Engine/EngineData/Components/Plane";
import { Raycaster } from "three";
import LR from '../Engine/EngineData/Player/BaseAssets/LightRay.gltf'

export default function Game() {
    var bSunset = [Sunset]

    const gltf = useLoader(GLTFLoader, LR)

    const CanvasRef = useRef();
    const [socketClient, setSocketClient] = useState(null)
    const [clients, setClients] = useState({})

    useEffect(() => {
        const conn = io("http://localhost:5000");
        console.log("Sever connect...")
        // On mount initialize the socket connection
        setSocketClient(conn)
        window.Server = conn;

        // Dispose gracefuly
        return () => {
            if (socketClient) socketClient.disconnect()
        }
    }, [])

    // useEffect(() => {
    //     window.addEventListener("click", () => {
    //       const raycaster = new Raycaster();
    //       raycaster.setFromCamera({x: 0, y: 0}, camera);
    //       console.log(raycaster.intersectObject(CanvasRef.current))
    //     })
    //   }, [])

    useEffect(() => {
        if (socketClient) {
            socketClient.on('move', (clients) => {
                setClients(clients)
            })
            const userD = {name: localStorage.getItem("name"), uid: localStorage.getItem("uid")};
            socketClient.on("connect", () => {
                console.log("CON!")
                socketClient.emit("UserData", JSON.stringify(userD))
            })
        }
    }, [socketClient])

    return (
            socketClient && (
            <>
              <Canvas ref={CanvasRef} className='GameViewport'>
                  <Stats />
                  <Physics
                    gravity={[0, -9, 0]}
                    tolerance={0}
                    iterations={50}
                    broadphase={"SAP"}
                >
                    <ControlsWrapper socket={socketClient} />
                    {/* <DefMap/>  */}
                    <Plane />
                    <Cube position={[0, 0, -5]} layers={1} />
                    <Cube position={[-0.6, 0, -5]} />
                    <Cube position={[0.6, 0, -5]} />
                    <Cube position={[-0.3, 0.5, -5]} />
                    <Cube position={[0.3, 0.5, -5]} />
                    <Cube position={[0, 1, -5]} />
                    <Cube position={[-5, 0, -5]} />
                    <Cube position={[-5, 0.5, -5]} />
                    <Cube position={[-5, 1, -5]} />
                    <Cube position={[-5, 1.5, -5]} />
                    <Cube position={[0, 0, 5]} type={"Static"} />
                    <Cube position={[0, 0, 5.5]} type={"Static"} />
                    <Cube position={[0, 0.5, 5.5]} type={"Static"} />
                </Physics>
                  {/* <Skybox position={[0,0,0]} /> @DEPRECATED */}
                  <Environment background={true} files={Sunset} />
                  {/* <gridHelper rotation={[0, 0, 0]} position={[0,0,0]} /> */}
                  <ambientLight intensity={0} rotation={[0,1,0]} />
                  <directionalLight intensity={1}/>
                  {/* <primitive object={gltf.scene} position={[0,10,0]} /> */}
                  {/* <spotLight intensity={1} position={[0,10,0]} angle={0.1} /> */}

                  {Object.keys(clients)
                      .filter((clientKey) => clientKey !== socketClient.id)
                      .map((client) => {
                          const { position, rotation } = clients[client]
                          return (
                              <UserWrapper
                                  onClick={() => {
                                    console.log(client)
                                  }}
                                  key={client}
                                  id={client}
                                  position={position}
                                  rotation={rotation}
                                  animState={clients[client].state}
                              />
                          )
                      })}
              </Canvas>
              <div className='cel'/>           
              <div className='UIAmmo'>
                <h2>{window.PrimaryClip}</h2>
                <h3>{window.PrimaryAmmo}</h3>
              </div>
            </>
          )
    )
}