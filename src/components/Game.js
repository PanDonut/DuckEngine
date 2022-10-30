import React, { useState, useEffect, Suspense } from "react"
import { io } from "socket.io-client"
import Spinner from './spinner.png';
import { ControlsWrapper } from '../Engine/EngineData/Player/Controls';
import { UserWrapper } from '../Engine/EngineData/Player/Player';
import { Canvas, useThree } from '@react-three/fiber';
import { OrbitControls, Text, Stats, Environment, Lightformer, ambientLight, PerspectiveCamera } from '@react-three/drei'
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
import THREE from "three";
import { EffectComposer, DepthOfField, Bloom, Noise, Vignette, GodRays, SSAO, SMAA } from '@react-three/postprocessing'
import { BlendFunction, Resizer, KernelSize } from "postprocessing";
import { Fog, PCFSoftShadowMap, WebGLRenderer } from 'three';
import LR from '../Engine/EngineData/Player/BaseAssets/LightRay.gltf'
import { useReducer } from "react";
import { getCrosshairData } from "./Globals";
import { extend} from 'react-three-fiber'
import { AudioLoader, AudioListener } from "three"
import ShootSound from '../Engine/EngineData/Player/Weapons/Assets/Shotgun/shotgun_shoot.wav'
import Sounds from "../Engine/EngineData/sounds";
import { Vector3 } from "three";
import { clamp } from "../Engine/EngineData/Functions";
import { ChangeState } from "../Engine/EngineData/Player/Animation/StateMachine";

var AudioList = [];

export default function Game() {
    var bSunset = [Sunset]

    const gltf = useLoader(GLTFLoader, LR)

    const CanvasRef = useRef();
    const [socketClient, setSocketClient] = useState(null)
    const [clients, setClients] = useState({})

    const [, forceUpdate] = React.useReducer((x) => x + 1, 0);

    window.gameforceUpdate = () => {
        forceUpdate();
    }

    useEffect(() => {
        const conn = io(window.ServerIP, {
            reconnection: false
        });
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
                window.health = clients[socketClient.id].health;
                // console.log(clients)
                // if (clients[socketClient.id].health <= 0) {
                //     ChangeState("dead")
                // }
            })
            const userD = {name: localStorage.getItem("name"), uid: localStorage.getItem("uid")};
            socketClient.on("connect", () => {
                console.log("CON!")
                socketClient.emit("UserData", JSON.stringify(userD))
            })           
            socketClient.on("disconnect", (e) => {
                console.log("disconnect", e)
            })
            socketClient.on("connect_error", (err) => {
                console.log(`connect_error due to ${err.message}`);
                setTimeout(() => {
                    window.isGame = false;
                    // window.onclick = null;
                    window.location.hash = `#mainmenu`
                    window.forceUpdate();
                }, 2000)                
                // window.location.search = `?err=${err.message}`
                // window.forceUpdate();
            });
            socketClient.on("audio", (data) => {
                AudioManager.create(data.type, data.position);
            })
        }
    }, [socketClient])

    useEffect(() => {
        const handleKeyUp = (e) => {
          window.ReloadLogic(e)
          console.log(e)
        }
        document.addEventListener('keyup', handleKeyUp)
        return () => {
          document.removeEventListener('keyup', handleKeyUp)
        }
    }, [])

    const AudioManager = {
        create: (type, position) => {
            const sound = document.createElement("audio");
            sound.src = Sounds[type].url;
            const playerPos = new Vector3().fromArray(window.CameraPosition)
            const distance = playerPos.distanceTo(new Vector3().fromArray(position))
            console.log("distance", distance)
            const vol = 1 - clamp(distance, 0, Sounds[type].range, 0, 1);
            sound.volume = vol >= 0 ? vol : 0;
            document.body.appendChild(sound);
            sound.play();
            sound.onended = () => {
                document.body.removeChild(sound)
            }
            sound.ontimeupdate = () => {
                const playerPos = new Vector3().fromArray(window.CameraPosition)
                const distance = playerPos.distanceTo(new Vector3().fromArray(position))
                console.log("distance", distance)
                const vol = 1 - clamp(distance, 0, Sounds[type].range, 0, 1);
                sound.volume = vol >= 0 ? vol : 0;
                console.log("Movement, Changing volume of " + type + " to " + (1 - clamp(distance, 0, Sounds[type].range, 0, 1)))
            }
            console.log("Audio Created")
        }   
    }

    var mouseDown = false;

    function Fire() {
        if (mouseDown == true) {
            window.ClickAnim();
            window.ShootClick()
        }
    }

    useEffect(() => {
        setInterval(() => {
            console.log(mouseDown)        
            Fire();
        }, 30)
        const handleDown = (e) => {
            mouseDown = true;
            console.log("DOWN")
          }
          const handleUp = (e) => {
            mouseDown = false;
            console.log("UP")
          }
          document.addEventListener('mousedown', handleDown)
          document.addEventListener('mouseup', handleUp)
          return () => {
            document.removeEventListener('mousedown', handleDown)
            document.removeEventListener('mouseup', handleUp)
          }
    }, [])

    return (
        <>
        { socketClient ?
            <>
              <Canvas onFocus={() => {navigator.keyboard.lock()}} ref={CanvasRef} onKeyUp={(e) => {window.RKey(e); if (e.key == "B") {}}} className='GameViewport' onClick={() => {}} dpr={(Math.min(window.devicePixelRatio), 2) / 12 * parseFloat(localStorage.getItem("setting.pixelScale"))} shadows={{autoUpdate: true, enabled:true, type: PCFSoftShadowMap}}>
                  {/* <Stats /> */}
                  <Physics
                    gravity={[0, -9, 0]}
                    tolerance={0}
                    iterations={50}
                    broadphase={"SAP"}
                >
                    <ControlsWrapper socket={socketClient} id={socketClient.id} />
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
                  <directionalLight castShadow intensity={1}/>
                  {/* <primitive object={gltf.scene} position={[0,10,0]} /> */}
                  {/* <spotLight intensity={1} position={[0,10,0]} angle={0.1} /> */}

                  {Object.keys(clients)
                      .filter((clientKey) => clientKey !== socketClient.id)
                      .map((client) => {
                          const { position, rotation } = clients[client]
                          return (
                              <UserWrapper
                                  key={client}
                                  id={client}
                                  position={position}
                                  rotation={rotation}
                                  animState={clients[client].state}
                                  weaponState={clients[client].WState}
                              />
                          )
                      })}
                      {/* <EffectComposer multisampling={0}>
                  <DepthOfField focusDistance={0} focalLength={0.06} bokehScale={2} height={480} />
                  <Bloom luminanceThreshold={0} luminanceSmoothing={10} height={300} />
                  <Vignette eskil={false} offset={0.01} darkness={1.1} />
                  <SMAA preset={1} edgeDetectionMode={2}/>
                  <SSAO
                  blendFunction={BlendFunction.MULTIPLY}
                  samples={30} 
                  rings={4} 
                  distanceThreshold={1.0}
                  distanceFalloff={0.0} 
                  rangeThreshold={0.5}
                  rangeFalloff={0.1} 
                  luminanceInfluence={0.9}
                  radius={20}
                  scale={0.5}
                  bias={0.5}
                  />
                  <SSAO
                  blendFunction={BlendFunction.MULTIPLY}
                  samples={30} 
                  rings={4} 
                  distanceThreshold={1.0}
                  distanceFalloff={0.0} 
                  rangeThreshold={0.5}
                  rangeFalloff={0.1} 
                  luminanceInfluence={0.9}
                  radius={40}
                  scale={0.5}
                  bias={0.5}
                  />
                </EffectComposer> */}
              </Canvas>  
              {
              localStorage.getItem("use3Dmodel") != "false" ?
              <div className="Representation_3D">
                { socketClient && clients[socketClient.id] ?
                <Canvas dpr={1}>
                    <UserWrapper
                    key={socketClient.id}
                    id={socketClient.id}
                    position={[-0.5,-3,2.5]}
                    rotation={[0.4878147781749304, -0.011999712002073833, 0.8089065418644015]}
                    animState={'idle'}
                    />
                    <ambientLight intensity={1}/>
                </Canvas>
                :
                ''
                }
              </div>
              :
              ''
              }
              <GameUI/>          
        </>
        :
        ''
            }
            <div className='LoadScreen'>
            <div className='spinner' style={{backgroundImage: `url(${Spinner})`}}/>
        </div> 
        </>
    )
}

function GameUI() {
    const [, forceUpdate] = React.useReducer((x) => x + 1, 0);
    useEffect(() => {
        window.GameUIUpdate = () => {forceUpdate()}
    }, [])
    return (
        <>
            <div className='cel' style={{opacity: parseFloat(localStorage.getItem("setting.csOP")) / 10}}/>  
            {
                getCrosshairData().type == "horizontal_D" ?
                <div className="H" style={{width: `${getCrosshairData().range}px`, opacity: parseFloat(localStorage.getItem("setting.csOP")) / 10}}>
                    <div/>
                    <div/>
                </div>
                :
                ''
            }         
            <div className='UIAmmo'>
                <h2 className="ClipCount">{0}</h2>
                <h3 className="AmmoCount">{0}</h3>          
            </div>
        </>
    )
}