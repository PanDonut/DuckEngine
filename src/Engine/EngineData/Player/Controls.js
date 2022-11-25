import { FirstPersonControls, OrbitControls, PerspectiveCamera, PointerLockControls, softShadows, Text } from "@react-three/drei"
import React, { useEffect } from "react"
import { useState } from "react"
import { useRef } from "react"
import { BoxGeometry, MeshNormalMaterial } from "three"
import { AudioListener } from "three"
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import DefMap from '../Maps/mapdef.gltf'
import { useFrame, useLoader, useThree } from '@react-three/fiber'
import { usePersonControls } from "./Input"
import { Physics, useSphere, useBox } from "@react-three/cannon"
import { Vector3 } from "three"
import { Raycaster, Layer } from "three"
import { clamp, FInterp, FInterpFromConst, FLerp, RandomFloatInRange } from "../Functions"
import { useReducer } from "react"
import Skybox from "../Graphics/Skybox"
import Weapons, { WeaponList } from "./Weapons"
import { ChangeState } from "./Animation/StateMachine"
import { Matrix4 } from "three"
import { Canvas, extend} from 'react-three-fiber'
import { AudioLoader } from "three"
import { UserWrapper } from "./Player"
import { getCanShoot, getHealth, getPlayerData } from "../../../components/Globals"
import RussianHat from "./Cosmetics/Hats/RussianHat"
import { RussianCoat_Arms, RussianCoat_Body, RussianCoat_Legs } from "./Cosmetics/Hats/RussianCoat"
import { lerp } from "three/src/math/mathutils"
import { useContext } from "react"
import { PlayerDataContext } from "../../../components/App"
import { PhysicsManager } from "../Physics"


export const ControlsWrapper = ({ socket, PrimaryClip, setPrimaryClip, PrimaryAmmo, setPrimaryAmmo, id, Parts }) => {
  softShadows();
    const [, forceUpdate] = useReducer((x) => x + 1, 0);
    const { camera, scene } = useThree();

    const PlayerContext = useContext(PlayerDataContext);

    // window.camera = camera;
    const [updateCallback, setUpdateCallback] = useState(null)
    const [WorldRotation, setWorldRotation] = useState([0,0,0,"XYZ"])
    const [astate, setAState] = useState("stop")
    const [roty, setRY] = useState(0)
    const controlsRef = useRef();
    const gr = useRef();
    const gro = useRef();
    const PlayerRef = useRef();

    // init movement
    const speed = 700;
    const bulletSpeed = 30;
    const bulletCoolDown = 300;
    const jumpSpeed = 4;
    const jumpCoolDown = 400;

    const [sphereRef, api] = useSphere(() => ({
      mass: 100,
      fixedRotation: true,
      position: [0, 1, 0],
      args: 0.2,
      material: {
        friction: 0
      }
    }));

    const state = useRef({
      timeToShoot: 0,
      timeTojump: 0,
      vel: [0, 0, 0],
      jumping: false,
      crouching: false
    });

    const [HorRot, setHorRot] = useState(0);

    const [HorRot1, setHorRot1] = useState(0);
    const [target, setTarget] = useState(0);

    const [HorRot2, setHorRot2] = useState(0);
    const [targetX, setTargetX] = useState(0);

    useEffect(() => {
      api.velocity.subscribe((v) => (state.current.vel = v));
    }, [api]);

    const { forward, backward, left, right, jump, crouch } = usePersonControls();

    useEffect(() => {
      if (right) {
        FInterp(HorRot, -0.05, 0.002, 5, setHorRot)
      }
      if (left) {
        FInterp(HorRot, 0.05, 0.002, 5, setHorRot)
      }
      if (!right && !left) {
        FInterp(HorRot, 0.0, 0.002, 5, setHorRot)
      }
    }, [forward, backward, left, right])

    /**
     * 
     * @param {*} position 
     * @param {Matrix4} rotation 
     */

    const onControlsChange = (position, rotation) => {
        const { id } = socket
        const posArray = []
        const rotArray = []

        position.toArray(posArray)
        rotation.toArray(rotArray)

        socket.emit('move', {
            id,
            rotation: rotArray,
            position: posArray,
        })
    }  

    const [height, setHeight] = useState(0);
    let selectedWeapon = 0;
    const [Loadout, setLoadout] = useState([
      "bab", "tranq", "naba"
    ]);

    

    const [CanShoot, setCanShoot] = useState(false);

    /**
     * 
     * @param {Vector3} spread 
     */

    // function Shoot(spread) {
    //   let forwardVector = new Vector3();
    //   let ArrayOfObjects = [];     
    //   camera.getWorldDirection(forwardVector)
    //   forwardVector.add(spread);
    //   //console.log(forwardVector)
    //   const raycaster = new Raycaster(camera.position, (forwardVector));
    //   // raycaster.setFromCamera({x: 0, y: 0}, camera);
    //   raycaster.intersectObjects(scene.children, true, ArrayOfObjects)
    //   // //console.log(ArrayOfObjects[0])
    //   //console.log(ArrayOfObjects[0].object.userData.id)   
    //   if (ArrayOfObjects[0].object.userData.id) {
    //     window.Server.emit("dmg", {id: ArrayOfObjects[0].object.userData.id, dmg: 5})
    //   }  
    // }

    // useEffect(() => {
    //   window.addEventListener("click", () => {  
    //     var spread =  new Vector3(0,0,0);           
    //     Shoot(spread);
    //     for (let index = 0; index < WeaponList[Loadout[selectedWeapon]].bulletsPerShot - 1; index++) {
    //       var thisSpread = new Vector3(RandomFloatInRange(WeaponList[Loadout[selectedWeapon]].spread, 0), RandomFloatInRange(WeaponList[Loadout[selectedWeapon]].spread, 0), 0);
    //       Shoot(thisSpread)
    //       //console.log("THIS", thisSpread)
    //     }
    //   })
      
    // }, []) 

    useEffect(() => {
      if (getHealth() > 0) {
      // //console.log(crouch)
      if (crouch) {
        FInterp(height, 3.00, 0.05, 9, setHeight);
      } else {
        FInterp(height, 3.55, 0.05, 9, setHeight);
      }
    }
    }, [crouch])

    const [hor, setHor] = useState(1);
    const [ver, setVer] = useState(1);
    const [horizontal, setHorizontal] = useState(1);
    const [vertical, setVertical] = useState(1);

    useEffect(() => {
      FInterp(hor, horizontal, 0.05, 20, setHor)
      // setHor(horizontal)
      // //console.log(horizontal, hor)
    }, [horizontal])
    
    useEffect(() => {
      FInterp(ver, vertical, 0.05, 20, setVer)
      // setVer(vertical)
      // //console.log(vertical, ver)
    }, [vertical])

    useFrame((_, delta) => {
      const airRay = new Raycaster(sphereRef.current.position, new Vector3(0, -1, 0), 1, 1000);
      // if (airRay.intersectObject(scene)) {
      //   ChangeState("inair")
      // }

        let velocity = new Vector3(0, 0, 0);
        let cameraDirection = new Vector3();
        camera.getWorldDirection(cameraDirection);

        let w = new Vector3();
        w.setFromMatrixColumn(camera.matrix, 0);
        w.crossVectors(camera.up, w);

        let d = new Vector3();
        d.setFromMatrixColumn(camera.matrix, 0);

        if (getHealth() > 0) {
        if (state.current.jumping) {
          if (forward) {
            setVertical(0.75);      
          } else if (backward) {
            setVertical(-0.5);
          }  else {
            setVertical(0)
          }
          if (right) {
            setHorizontal(0.5);      
          } else if (left) {
            setHorizontal(-0.5);
          }  else {
            setHorizontal(0)
          }
          ChangeState("jump")
        } 
        else if (state.current.crouching) {         
          if (forward) {
            setVertical(0.6);      
          } else if (backward) {
            setVertical(-0.6);
          }  else {
            setVertical(0)
          }
          if (right) {
            setHorizontal(0.6);      
          } else if (left) {
            setHorizontal(-0.6);
          }  else {
            setHorizontal(0)
          }
          if (forward && !right && !left && !state.current.jumping) {
            ChangeState("cf")
          } 
          if (!forward && right) {

          } 
          if (!forward && left) {

          } 
          if (!forward && !right && !left && !state.current.jumping) {
            ChangeState("crouch")
          } 
        }
        else {
          if (forward) {
            setVertical(1);               
          } else if (backward) {
            setVertical(-1);
          }  else {
            setVertical(0)            
          }
          if (right) {
            setHorizontal(1);    
          } else if (left) {
            setHorizontal(-1);
          }  else {
            setHorizontal(0)
          }
          if (right && forward && !state.current.jumping) {
            ChangeState("sr")
          } else if (left && forward && !state.current.jumping) {
            ChangeState("sl")
          }
          if (forward && !right && !left && !state.current.jumping) {
            ChangeState("run")  
          }
          if (right && !forward) {
            ChangeState("r")
          } else if (left && !forward && !state.current.jumping) {
            ChangeState("l")
          }
          if (!right && !left && !forward && !backward && !state.current.jumping) {
            ChangeState("idle")
          }
        }
        if (crouch) {
          state.current.crouching = true;
        } else {
          state.current.crouching = false;
        }
        }
        // if (jump) {
        //   api.velocity.set(0, 3, 0)     
        // }
        if (horizontal !== 0 && vertical !== 0) {
          velocity
            .add(w.clone().multiplyScalar(speed * vertical))
            .add(d.clone().multiplyScalar(speed * horizontal));
          velocity.clampLength(-speed, speed);
        } else if (horizontal !== 0) {
          velocity.add(d.clone().multiplyScalar(speed * horizontal));
        } else if (vertical !== 0) {
          velocity.add(w.clone().multiplyScalar(speed * vertical));
        }

        api.velocity.set(
          velocity.x * delta,
          state.current.vel[1],
          velocity.z * delta
        );

        camera.eulerOrder = 'YXZ'

        // //console.log(cameraDirection.toArray()[1])

        /** Updates camera position */
        camera.position.set(
          sphereRef.current.position.x,
          height + sphereRef.current.position.y,
          sphereRef.current.position.z
        );
        if (PlayerRef.current) {
          PlayerRef.current.position.set(sphereRef.current.position.x,sphereRef.current.position.y,sphereRef.current.position.z)
        }     
        // setWorldRotation([cameraDirection.toArray()[0],cameraDirection.toArray()[1],cameraDirection.toArray()[2], "XYZ"])
        window.CameraPosition = sphereRef.current.position.toArray();
        // gr.current.position.set(
        //   sphereRef.current.position.x,
        //   height + sphereRef.current.position.y,
        //   sphereRef.current.position.z
        // );

        var dist = 0.075;
        var cwd = new Vector3();
    
        camera.getWorldDirection(cwd);
    
        cwd.multiplyScalar(dist);
        cwd.add(camera.position);
    
        gr.current.position.set(cwd.x, cwd.y, cwd.z);
        gr.current.setRotationFromQuaternion(camera.quaternion);

        if (getHealth() > 0) {
        if ((forward || backward || right || left) && !crouch) {
          setAState("run")
        } else if ((forward || backward || right || left) && crouch) {
          setAState("crouch")
        } else {
          setAState("idle")
        } 
      }
        
        if (controlsRef.current) {
          onControlsChange(sphereRef.current.position, cameraDirection);
        }

        if (state.current.jumping && state.current.vel[1] < 0) {
          /** Ground check */
          const raycaster = new Raycaster(
            sphereRef.current.position,
            new Vector3(0, -1, 0),
            0,
            0.2
          );
          const intersects = raycaster.intersectObjects(scene.children);
          if (intersects.length !== 0) {
            state.current.jumping = false;
          }
        }

    
        if (jump && !state.current.jumping) {
          const now = Date.now();
          if (now > state.current.timeTojump) {
            state.current.timeTojump = now + jumpCoolDown;
            state.current.jumping = true;
            api.velocity.set(state.current.vel[0], jumpSpeed, state.current.vel[2]);
          }
        }

        // onControlsChange(controlsRef.current.camera.position, controlsRef.current.camera.rotation)
      });

      const [selW, setSelW] = useState(0);

      useEffect(() => {
        window.addEventListener("wheel", (e) => {
          forceUpdate();
          if (getCanShoot() == true) {
            //console.log(e.deltaY)
            if (e.deltaY > 1) {
              selectedWeapon - 1 >= 0 ?
              selectedWeapon = selectedWeapon - 1
              :
              selectedWeapon = 2
            }
            if (e.deltaY < -1) {
              selectedWeapon + 1 <= 2 ?
              selectedWeapon = selectedWeapon + 1
              :
              selectedWeapon = 0
            }
            setCanShoot(false);
            setLoadout(Loadout)
            setSelW(selectedWeapon)
            socket.emit('selW', selectedWeapon)
            //console.log(selectedWeapon)
            forceUpdate();
            window.GameUIUpdate()
            window.selectedWeapon = selectedWeapon;
          }
        })
      }, [])

      useEffect(() => {
        //console.log(selectedWeapon)
        forceUpdate()
      }, [selectedWeapon])

      useEffect(() => {
        console.log("Make_Weapons")
        getPlayerData().setPrimaryAmmo(WeaponList[Loadout[0]].ammoSize);
        getPlayerData().setPrimaryClip(WeaponList[Loadout[0]].clipSize);

        getPlayerData().setSecondaryAmmo(WeaponList[Loadout[1]].ammoSize);
        getPlayerData().setSecondaryClip(WeaponList[Loadout[1]].clipSize);

        getPlayerData().setMeleeAmmo(WeaponList[Loadout[2]].ammoSize);
        getPlayerData().setMeleeClip(WeaponList[Loadout[2]].clipSize);
      }, [])

      function ReturnWeapon(Itm) {
        return (
          <Itm.ref camera={camera} Arms={Parts.arms} PrimaryAmmo={PlayerContext.PrimaryAmmo} setPrimaryAmmo={setPrimaryAmmo} PrimaryClip={PlayerContext.PrimaryClip} setPrimaryClip={setPrimaryClip} state={astate} camera={camera} scene={scene} />
        )
      }

      useEffect(() => {
        socket.emit('loadout', Loadout)
      }, [Loadout])

      useEffect(() => {
        /**
         * 
         * @param {MouseEvent} e 
         */
        const Move = (e) => {
          if (gr.current) {
            //console.log(e, gr.current)
            // gr.current.rotateY(e.movementX / 100)
            setTarget(HorRot1 + Math.PI/180 * (e.movementX / 5))
            setTargetX(HorRot2 + Math.PI/180 * (e.movementY / 3))
          }
        }

        window.addEventListener("mousemove", Move)
        return () => { window.removeEventListener("mousemove", Move) }
      }, [])

      useEffect(() => {
        /**
         * 
         * @param {KeyboardEvent} e 
         */
        const Move = (e) => {
          switch (e.key) {
            case "1":
              forceUpdate();
              if (getCanShoot() == true) {
                var selectedWeapon = 0;
                setCanShoot(false);
                setSelW(selectedWeapon);
                socket.emit('selW', selectedWeapon);
                forceUpdate();
                window.GameUIUpdate()
                window.selectedWeapon = selectedWeapon;
              }
              break;
            case "2":
              forceUpdate();
              if (getCanShoot() == true) {
                var selectedWeapon = 1;
                setCanShoot(false);
                setSelW(selectedWeapon);
                socket.emit('selW', selectedWeapon);
                forceUpdate();
                window.GameUIUpdate()
                window.selectedWeapon = selectedWeapon;
              }
              break;
            case "3":
              forceUpdate();
              if (getCanShoot() == true) {
                var selectedWeapon = 2;
                setCanShoot(false);
                setSelW(selectedWeapon);
                socket.emit('selW', selectedWeapon);
                forceUpdate();
                window.GameUIUpdate()
                window.selectedWeapon = selectedWeapon;
              }
              break;
          
            default:
              break;
          }
        }

        window.addEventListener("keyup", Move)
        return () => { window.removeEventListener("keyup", Move) }
      }, [])

      useFrame(() => {
        if (gro.current) {
          setHorRot1(lerp(HorRot1, target, 0.1))
          setHorRot2(lerp(HorRot2, targetX, 0.1))
        }
      })

      useEffect(() => {
        camera.near = 0.01;
      }, [])

    return (
      <>
        <group>  
          <PointerLockControls minPolarAngle={0.01} maxPolarAngle={3} ref={controlsRef} enabled={true} camera={camera} />               
        </group> 
        {/* <group ref={PlayerRef}>
          <UserWrapper
          key={"PlayerWorldModel"}
          id={id}
          position={[0,0,0]}
          rotation={[0,0,0]}
          animState={astate}
          hideParts={["head"]}
          />
        </group>       */}
          <group ref={gr} scale={[0.1, 0.1, 0.1]} renderOrder={2}>
            <group ref={gro} position={[0.3, -0.3, 0]} rotation={[HorRot2, HorRot1, HorRot]} >
              {
                selW == 0 ?
                ReturnWeapon(WeaponList[Loadout[0]])       
                :
                ''
              }
              {
                selW == 1 ?
                ReturnWeapon(WeaponList[Loadout[1]])       
                :
                ''
              }
              {
                selW == 2 ?
                ReturnWeapon(WeaponList[Loadout[2]])
                :
                ''
              }
            </group>        
          </group>   
      </>   
    )
}