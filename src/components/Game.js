import React, { useState, useEffect, Suspense } from "react";
import { io } from "socket.io-client";
import Spinner from "./spinner.png";
import { ControlsWrapper } from "../Engine/EngineData/Player/Controls";
import { UserWrapper } from "../Engine/EngineData/Player/Player";
import { Canvas, useThree } from "@react-three/fiber";
import {
  OrbitControls,
  Text,
  Stats,
  Environment,
  Lightformer,
  ambientLight,
  PerspectiveCamera,
} from "@react-three/drei";
import { useRef } from "react";
import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import Sunset from "./sky.hdr";
import { usePersonControls } from "../Engine/EngineData/Player/Input";
import { useSphere, Physics } from "@react-three/cannon";
import { DefMap } from "../Engine/EngineData/Maps/defmap";
import { Cube } from "../Engine/EngineData/Components/Cube.js";
import { Plane } from "../Engine/EngineData/Components/Plane";
import { CameraHelper, Raycaster } from "three";
import THREE from "three";
import {
  EffectComposer,
  DepthOfField,
  Bloom,
  Noise,
  Vignette,
  GodRays,
  SSAO,
  SMAA,
} from "@react-three/postprocessing";
import { BlendFunction, Resizer, KernelSize } from "postprocessing";
import { Fog, PCFSoftShadowMap, WebGLRenderer } from "three";
import LR from "../Engine/EngineData/Player/BaseAssets/LightRay.gltf";
import { useReducer } from "react";
import { getConfig, getCrosshairData, getGClients, getHealth, getPlayerData, setConfig, setGClients, setHealth } from "./Globals";
import { extend } from "react-three-fiber";
import { AudioLoader, AudioListener } from "three";
import ShootSound from "../Engine/EngineData/Player/Weapons/Assets/Shotgun/shotgun_shoot.wav";
import Sounds from "../Engine/EngineData/sounds";
import { Vector3 } from "three";
import { clamp } from "../Engine/EngineData/Functions";
import { ChangeState } from "../Engine/EngineData/Player/Animation/StateMachine";
import RussianHat from "../Engine/EngineData/Player/Cosmetics/Hats/RussianHat";
import {
  RussianCoat_ArmL,
  RussianCoat_ArmR,
  RussianCoat_Arms,
  RussianCoat_Body,
  RussianCoat_Legs,
} from "../Engine/EngineData/Player/Cosmetics/Hats/RussianCoat";
import { GetKillIcon } from "../assets/KillIcons";

import HealthIcon from "./health.png";
import HealthIconRed from "./health_red.png";

import AmmoBGBlue from "./ammo_blue.png";
import AmmoBGGreen from "./ammo_green.png";
import { DirectionalLightHelper } from "three";
import { Vector2 } from "three";
import { Observer } from "../Engine/EngineData/Wrappers/HookWrapers";
import { FixedSpotlight } from "../Engine/EngineData/Rendering/ShadowFix";
import { Control } from "../Engine/EngineData/Components/Control";
import { ShootingRangeMap } from "../Engine/EngineData/Maps/area_shooting_range";
import { useContext } from "react";
import { PlayerDataContext } from "./App";
import { Euler } from "three";
import axios from "axios";
import { Projectile } from "../Engine/EngineData/Projectile";
import TranqDart from "../Engine/EngineData/Player/Weapons/Projectile/TranqualizerProjectile";
import { Delay } from '@shyrii/web-audio-effects';
import { Ragdoll } from "../Engine/EngineData/Player/Ragdoll";

var AudioList = [];

var KillList = [];
var GameData = {
  points: {
    blue: 0,
    green: 0,
  },
};

var Projectiles = [];

let audioContext = new AudioContext();

var team = "green";

function CamEdit({LightRef, light}) {
  const { gl, camera, scene } = useThree();
  // const renderer = new WebGLRenderer( { antialias: true } );
  gl.shadowMap.enabled = true;
  useEffect(() => {
    if (light.current) {
      const helper = new CameraHelper(light.current.shadow.camera);
      scene.add(helper);
      const dhelper = new DirectionalLightHelper(light.current);
      scene.add(dhelper);
      //console.log(light.current)
      light.current.shadow.camera.updateProjectionMatrix();
      light.current.shadow.mapSize = new Vector2(parseFloat(localStorage.getItem("setting.shadowQ"))* 1024, parseFloat(localStorage.getItem("setting.shadowQ")) * 1024);
      light.current.shadow.bias = -0.004;
      light.current.shadow.camera.left = 100;
      light.current.shadow.camera.right = 100;
      light.current.shadow.camera.top = 100;
      light.current.shadow.camera.bottom = 100;
    }
  }, [light])
  // //console.log(light)
  // gl.shadowMap.type = PCFSoftShadowMap
  // camera.position.set(0, 1.51, -6.32)
  // camera.rotation.set(Math.PI / 2, 0, Math.PI)

    // useEffect(() => {
    //   if (LightRef.current) {
    //     //console.log(LightRef.current.shadow);
    //     LightRef.current.shadow.mapSize = new Vector2(parseFloat(localStorage.getItem("setting.shadowQ"))* 1024, parseFloat(localStorage.getItem("setting.shadowQ")) * 1024)
    //   }
    // }, [LightRef])
}


export default function Game() {
  useEffect(() => {
    axios.get(window.ServerIP + "/config").then(res => {
      setConfig(res.data);
    })
  }, [])

  const ProjectileManager = {
    create: (type, position, rotation, direction, shooterID) => {
      Projectiles.push({
        type: type,
        startPosition: [ position[0], position[1] + 3.55, position[2] ],
        rotation: rotation,
        direction: direction,
        shooterID: shooterID,
        id: "projectile_" + type + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
      })
    }
  };

  const PlayerContext = useContext(PlayerDataContext);

  const ViewmodelGroup = useRef();
  const light = useRef();
  useEffect(() => {
    getPlayerData().setTeam(team)
  }, [team]);
  const [Cosmetics, setCosmetics] = useState(["bab", "daba", "naba"]);
  const [Parts, setParts] = useState({
    head: RussianHat,
    body: RussianCoat_Body,
    arms: {
      L: RussianCoat_ArmL,
      R: RussianCoat_ArmR,
    },
    legs: RussianCoat_Legs,
  });

  var bSunset = [Sunset];

  const gltf = useLoader(GLTFLoader, LR);

  const CanvasRef = useRef();
  const [socketClient, setSocketClient] = useState(null);
  const [clients, setClients] = useState({});

  const [, forceUpdate] = React.useReducer((x) => x + 1, 0);

  window.gameforceUpdate = () => {
    forceUpdate();
  };

  useEffect(() => {
    const conn = io(window.ServerIP, {
      reconnection: false,
    });
    //console.log("Sever connect...");
    // On mount initialize the socket connection
    setSocketClient(conn);
    window.Server = conn;

    // Dispose gracefuly
    return () => {
      if (socketClient) socketClient.disconnect();
    };
  }, []);

  // useEffect(() => {
  //     window.addEventListener("click", () => {
  //       const raycaster = new Raycaster();
  //       raycaster.setFromCamera({x: 0, y: 0}, camera);
  //       //console.log(raycaster.intersectObject(CanvasRef.current))
  //     })
  //   }, [])

  const [ PlayerHealth, setPlayerHealth ] = useState(125);

  useEffect(() => {
    if (getHealth() <= 0) {
      setTimeout(() => {
        socketClient.emit("respawn");
      }, getConfig().sv.respawnTime * 1000)
    }
  }, [getHealth()])

  useEffect(() => {
    if (socketClient) {
      socketClient.on("move", (clients) => {
        setClients(clients);
        setGClients(clients);
        window.health = clients[socketClient.id].health;
        setHealth(clients[socketClient.id].health);
        // window.GameUIUpdate();
        // window.forceUpdate()
        // forceUpdate();
        // //console.log(clients)
        if (clients[socketClient.id].health <= 0) {
            ChangeState("dead")            
        }
      });
      socketClient.on("spawnProjectile", (data) => {
        console.log("SPAWNING")
        ProjectileManager.create("tranq_dart", data.position, data.rotation, data.direction, data.id)
      });
      socketClient.on("kill", (data) => {
        var newArr = KillList;
        newArr.push(data);
        KillList = newArr.reverse()
        setTimeout(() => {
          KillList.splice(KillList.indexOf(data), 1);
          // document.getElementsByClassName("KillList")[0].style.animation = "kill 0.5s ease";
          // setTimeout(() => {
          //   document.getElementsByClassName("KillList")[0].style.animation = "none";
          // }, 700)
        }, 2000);
      });
      const userD = {
        name: localStorage.getItem("name"),
        uid: localStorage.getItem("uid"),
      };
      socketClient.on("connect", () => {
        //console.log("CON!");
        socketClient.emit("UserData", JSON.stringify(userD));
      });
      socketClient.on("disconnect", (e) => {
        //console.log("disconnect", e);
      });
      socketClient.on("connect_error", (err) => {
        //console.log(`connect_error due to ${err.message}`);
        setTimeout(() => {
          window.isGame = false;
          // window.onclick = null;
          window.location.hash = `#mainmenu`;
          window.forceUpdate();
        }, 2000);
        // window.location.search = `?err=${err.message}`
        // window.forceUpdate();
      });
      socketClient.on("audio", (data) => {
        AudioManager.create(data.type, data.position, data.private);
      });
      socketClient.on("gamedata", (data) => {
        GameData = data;
      });
    }
  }, [socketClient]);

  useEffect(() => {
    const handleKeyUp = (e) => {
      window.ReloadLogic(e);
      //console.log(e);
    };
    document.addEventListener("keyup", handleKeyUp);
    return () => {
      document.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  useEffect(() => {
    /**
     * 
     * @param {KeyboardEvent} e 
     */
    const Move = (e) => {
      if (e.code == "Numpad7") {
        //console.log("Kys")
        //console.log(socketClient)
        const id = socketClient.id;
        //console.log(id)
        window.Server.emit("dmg", {
          id: id,
          dmg: 1000,
          weapon: "self",
        });
        window.forceUpdate()
        forceUpdate();
        window.GameUIUpdate();
        //console.log(clients)
      }
    }

    if (socketClient) { window.addEventListener("keyup", Move) }
    return () => { window.removeEventListener("keyup", Move) }
  }, [socketClient])

  const AudioManager = {
    create: (type, position, attach) => {
      if (!attach || attach == socketClient.id) {
        const sound = document.createElement("audio");
        sound.src = Sounds[type].url;
        const playerPos = new Vector3().fromArray(window.CameraPosition);
        const distance = playerPos.distanceTo(new Vector3().fromArray(position));
        //console.log("distance", distance);
        const vol = attach ? 1 : 1 - clamp(distance, 0, Sounds[type].range, 0, 1);
        sound.volume = vol >= 0 ? vol : 0;
        document.body.appendChild(sound);
        sound.play();
        sound.onended = () => {
          document.body.removeChild(sound);
        };
        if (getGClients()[socketClient.id].effects.tranqualizer == true) {
          console.log("TIME", attach)
          if (!attach) {
            sound.playbackRate = 0.9
          }
        } else {
          sound.playbackRate = 1
        }
        sound.ontimeupdate = () => {
          if (!attach) {
            const playerPos = new Vector3().fromArray(window.CameraPosition);
            const distance = playerPos.distanceTo(
              new Vector3().fromArray(position)
            );
            //console.log("distance", distance);
            const vol = 1 - clamp(distance, 0, Sounds[type].range, 0, 1);
            sound.volume = vol >= 0 ? vol : 0;
            if (getGClients()[socketClient.id].effects.tranqualizer == true) {
              console.log("TIME", attach)
              if (!attach) {
                sound.playbackRate = 0.9
              }
            } else {
              sound.playbackRate = 1
            }
          }
        };
        //console.log("Audio Created");
    }
  }
  };

  var mouseDown = false;

  function Fire() {
    if (mouseDown == true) {
      window.ClickAnim();
      window.ShootClick();
    }
  }

  useEffect(() => {
    setInterval(() => {
      //console.log(mouseDown);
      Fire();
    }, 30);
    const handleDown = (e) => {
      mouseDown = true;
      //console.log("DOWN");
    };
    const handleUp = (e) => {
      mouseDown = false;
      //console.log("UP");
    };
    document.addEventListener("mousedown", handleDown);
    document.addEventListener("mouseup", handleUp);
    return () => {
      document.removeEventListener("mousedown", handleDown);
      document.removeEventListener("mouseup", handleUp);
    };
  }, []);

  useEffect(() => {
    if (socketClient) {
      window.ID = socketClient.id;
    }
  }, [socketClient]);

  return (
    <>
      {socketClient ? (
        <>
          <Canvas
            style={{ filter: clients[socketClient.id] ? clients[socketClient.id].effects.tranqualizer == true ? "grayscale(200%) brightness(75%) blur(2px)" : '' : '', transition: "filter 1s ease-in-out" }}
            onFocus={() => {
              navigator.keyboard.lock();
            }}
            ref={CanvasRef}
            onKeyUp={(e) => {
              window.RKey(e);
              if (e.key == "B") {
              }
            }}
            className={`GameViewport ${clients[socketClient.id] ? clients[socketClient.id].effects.tranqualizer == true ? 'shakeDrunk' : '' : ''}`}
            onClick={() => {}}
            dpr={
              ((Math.min(window.devicePixelRatio), 2) / 12) *
              parseFloat(localStorage.getItem("setting.pixelScale"))
            }
            shadows={{
              autoUpdate: true,
              enabled: true,
              type: PCFSoftShadowMap
            }}
          >
            <Stats/>
            {/* <CamEdit light={light}/> */}
            {/* <Stats /> */}
            <Physics
              gravity={[0, -9, 0]}
              tolerance={0}
              iterations={50}
              broadphase={"Naive"}
            >
              { getHealth() > 0 ?
                <ControlsWrapper
                  socket={socketClient}
                  id={socketClient.id}
                  Parts={Parts}
                />
              :
              <>
                <KillCam clients={clients} killer={clients[socketClient.id].lastDamage}/>
              </>
              }
              {/* <DefMap/>  */}
              <Plane />
              <ShootingRangeMap/>
              {
                Projectiles.map((item) => {
                  if (item.type = "tranq_dart") {
                    return (
                      <TranqDart socketID={socketClient.id} damagerID={item.shooterID} direction={item.direction} startPosition={item.startPosition} rotation={item.rotation} key={item.id} />
                    )
                  } else {
                    return (
                      <></>
                    )
                  }
                })
              }
              {Object.keys(clients)
              .filter((clientKey) => clientKey !== socketClient.id)
              .map((client) => {
                const { position, rotation, loadout, selW, health } = getGClients()[client];

                if (health > 0) {
                  return (
                    <group position={position}>
                      <UserWrapper
                      key={client}
                      id={client}
                      position={position}
                      rotation={rotation}
                      animState={clients[client].state}
                      weaponState={clients[client].WState}
                      Parts={Parts}
                      loadout={loadout}
                      selW={selW}
                      health={health}
                    />
                    </group>
                  )
                } else {
                  return (
                    <Ragdoll 
                    key={client}
                    id={client}
                    position={position}
                    rotation={rotation}
                    animState={clients[client].state}
                    weaponState={clients[client].WState}
                    Parts={Parts}
                    loadout={loadout}
                    selW={selW}
                    health={health}
                    />
                  )
                }
              })}  
            </Physics>
            {/* <Skybox position={[0,0,0]} /> @DEPRECATED */}
            <Environment background={true} files={Sunset} />
            {/* <gridHelper rotation={[0, 0, 0]} position={[0,0,0]} /> */}
            <ambientLight color={"#feb489"} intensity={0.3} />
            {/* <directionalLight ref={light} shadowBias={-0.004} intensity={1} castShadow /> */}
            {/* <primitive object={gltf.scene} position={[0,10,0]} /> */}
            {/* <spotLight ref={light} shadowBias={-0.004} intensity={1} castShadow position={[0,10,0]} angle={1} /> */}
            <FixedSpotlight color={"#ffffff"} shadowBias={-0.004} intensity={2} OriginPosition={[0,5,0]} position={[0,5,0]} rotation={[0,0,0]} angle={0.9}/>
            

                        
            <EffectComposer multisampling={0}>
              {/* {localStorage.getItem("setting.Bloom") != "false" ? (
                <Bloom
                  luminanceThreshold={0}
                  luminanceSmoothing={10}
                  height={300}
                />
              ) : (
                ""
              )} */}
              {localStorage.getItem("setting.Vignette") != "false" ? (
                <Vignette eskil={false} offset={0.1} darkness={0.8} />
              ) : (
                ""
              )}
              {localStorage.getItem("setting.antialiasing") != "false" ? (
                <SMAA
                  preset={1}
                  edgeDetectionMode={parseInt(
                    localStorage.getItem("setting.antialiasingMode")
                  )}
                />
              ) : (
                ""
              )}
              {localStorage.getItem("setting.AO") != "false" ? (
                <>
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
                </>
              ) : (
                ""
              )}
            </EffectComposer>
          </Canvas>
          {/* {localStorage.getItem("use3Dmodel") != "false" ? (
            <div className="Representation_3D">
              {socketClient && clients[socketClient.id] ? (
                <Canvas dpr={1}>
                  <UserWrapper
                    key={socketClient.id}
                    id={socketClient.id}
                    position={[-0.5, -3, 2.5]}
                    rotation={[
                      0.4878147781749304, -0.011999712002073833,
                      0.8089065418644015,
                    ]}
                    animState={"idle"}
                    Parts={Parts}
                  />
                  <ambientLight intensity={1} />
                </Canvas>
              ) : (
                ""
              )}
            </div>
          ) : (
            ""
          )} */}
          <GameUI PlayerHealth={PlayerHealth} clients={clients} id={socketClient.id} />
        </>
      ) : (
        ""
      )}
      <div className="LoadScreen">
        <div
          className="spinner"
          style={{ backgroundImage: `url(${Spinner})` }}
        />
      </div>
    </>
  );
}

function GameUI({ clients, id, PlayerHealth }) {
  const PlayerContext = useContext(PlayerDataContext);
  const [, forceUpdate] = React.useReducer((x) => x + 1, 0);
  useEffect(() => {
    window.GameUIUpdate = () => {
      forceUpdate();
    };
  }, []);
  return (
    <>
      <div className="Points">
        <p>{GameData.points.blue}</p>
        <p>{GameData.points.green}</p>
      </div>
        <div style={{opacity: getHealth() > 0 ? 1 : 0}} className="Health">
          <img className="Red" src={HealthIconRed} />
          <img
            className={getHealth() < 50 ? "redFlash" : ""}
            src={HealthIcon}
          />
          <p>{getHealth()}</p>
        </div>
      <div className="KillList">
        {KillList.map((item, index) => {
          return (
            <div className="Kill" key={JSON.stringify(item) + index}>
              <p style={{ color: item.by[1] == "blue" ? "#4a8bed" : "#3f9b26" }}>{clients[item.by[0]].name}</p>
              <img src={GetKillIcon(item.weapon)} />
              <p style={{ color: item.who[1] == "blue" ? "#4a8bed" : "#3f9b26"}}>{clients[item.who[0]].name}</p>
            </div>
          );
        })}
      </div>
      <div
        className="cel"
        style={{
          opacity: parseFloat(localStorage.getItem("setting.csOP")) / 10,
        }}
      />
      {getCrosshairData().type == "horizontal_D" ? (
        <div
          className="H"
          style={{
            width: `${getCrosshairData().range / 2}px`,
            opacity: parseFloat(localStorage.getItem("setting.csOP")) / 10,
          }}
        >
          <div />
          <div />
        </div>
      ) : (
        ""
      )}
      <div style={{opacity: getHealth() > 0 ? 1 : 0}} className="UIAmmo">
        <h2 className="ClipCount">{0}</h2>
        <h3 className="AmmoCount">{0}</h3>
        <img src={getPlayerData().team == "green" ? AmmoBGGreen : AmmoBGBlue} />
      </div>
      <Control>
      <div
      style={{
        display: "inline-block",
        width: "200px",
        height: "100px",
        background: 'blue'
      }}
    />
    </Control>
    </>
  );
}

function KillCam({ killer, clients }) {
  const { camera } = useThree();
  const [rot, setRot] = useState([0,0,0, "XYZ"])
  useEffect(() => {
    
    const inter = setInterval(() => {
      var pos = new Vector3().fromArray(getGClients()[killer].position);
      pos.add(new Vector3(0,2,0));
      camera.lookAt(pos);
    }, 10)
    setTimeout(() => {
      clearInterval(inter);
    }, 5000)
  }, [])
  return (
    <>
      {/* <PerspectiveCamera rotation={camera.rotation.toArray()} position={[0,1,0]} makeDefault={true}/> */}
    </>
  )
}