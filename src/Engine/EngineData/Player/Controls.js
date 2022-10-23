import { FirstPersonControls, OrbitControls, PerspectiveCamera, PointerLockControls, Text } from "@react-three/drei"
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
import { clamp, FInterp, FInterpFromConst, RandomFloatInRange } from "../Functions"
import { useReducer } from "react"
import Skybox from "../Graphics/Skybox"
import Weapons, { WeaponList } from "./Weapons"
import { ChangeState } from "./Animation/StateMachine"
import { Matrix4 } from "three"
import { Canvas, extend} from 'react-three-fiber'
import { AudioLoader } from "three"


export const ControlsWrapper = ({ socket, PrimaryClip, setPrimaryClip, PrimaryAmmo, setPrimaryAmmo }) => {

    const [, forceUpdate] = useReducer((x) => x + 1, 0);
    const { camera, scene } = useThree();

    // window.camera = camera;
    const [updateCallback, setUpdateCallback] = useState(null)
    const [astate, setAState] = useState("stop")
    const [roty, setRY] = useState(0)
    const controlsRef = useRef();
    const gr = useRef();
    const gro = useRef();

    // init movement
    const speed = 600;
    const bulletSpeed = 30;
    const bulletCoolDown = 300;
    const jumpSpeed = 5;
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

    useEffect(() => {
      api.velocity.subscribe((v) => (state.current.vel = v));
    }, [api]);

    const { forward, backward, left, right, jump, crouch } = usePersonControls();

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
      "bab", "aba", "daba"
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
    //   console.log(forwardVector)
    //   const raycaster = new Raycaster(camera.position, (forwardVector));
    //   // raycaster.setFromCamera({x: 0, y: 0}, camera);
    //   raycaster.intersectObjects(scene.children, true, ArrayOfObjects)
    //   // console.log(ArrayOfObjects[0])
    //   console.log(ArrayOfObjects[0].object.userData.id)   
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
    //       console.log("THIS", thisSpread)
    //     }
    //   })
    //   // window.addEventListener("mousemove", (e) => {
    //   //   if (gro.current) {
    //   //     FInterp(Math.abs(gro.current.rotation.y), 100, 1, 20, setRY)
    //   //   }
    //   // })
    // }, []) 

    useEffect(() => {
      // console.log(crouch)
      if (crouch) {
        FInterp(height, 2.55, 0.05, 9, setHeight);
      } else {
        FInterp(height, 3.45, 0.05, 9, setHeight);
      }
    }, [crouch])

    const [hor, setHor] = useState(1);
    const [ver, setVer] = useState(1);
    const [horizontal, setHorizontal] = useState(1);
    const [vertical, setVertical] = useState(1);

    useEffect(() => {
      FInterp(hor, horizontal, 0.05, 20, setHor)
      // setHor(horizontal)
      // console.log(horizontal, hor)
    }, [horizontal])
    
    useEffect(() => {
      FInterp(ver, vertical, 0.05, 20, setVer)
      // setVer(vertical)
      // console.log(vertical, ver)
    }, [vertical])

    useFrame((_, delta) => {

        let velocity = new Vector3(0, 0, 0);
        let cameraDirection = new Vector3();
        camera.getWorldDirection(cameraDirection);

        let w = new Vector3();
        w.setFromMatrixColumn(camera.matrix, 0);
        w.crossVectors(camera.up, w);

        let d = new Vector3();
        d.setFromMatrixColumn(camera.matrix, 0);


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
          if (forward && !right && !left) {
            ChangeState("cf")
          } 
          if (!forward && right) {

          } 
          if (!forward && left) {

          } 
          if (!forward && !right && !left) {
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
          if (right && forward) {
            ChangeState("sr")
          } else if (left && forward) {
            ChangeState("sl")
          }
          if (forward && !right && !left) {
            ChangeState("run")  
          }
          if (right && !forward) {
            ChangeState("r")
          } else if (left && !forward) {
            ChangeState("l")
          }
          if (!right && !left && !forward && !backward) {
            ChangeState("idle")
          }
        }
        if (crouch) {
          state.current.crouching = true;
        } else {
          state.current.crouching = false;
        }
        // if (jump) {
        //   api.velocity.set(0, 3, 0)     
        // }
        if (horizontal !== 0 && vertical !== 0) {
          velocity
            .add(w.clone().multiplyScalar(speed * ver))
            .add(d.clone().multiplyScalar(speed * hor));
          velocity.clampLength(-speed, speed);
        } else if (horizontal !== 0) {
          velocity.add(d.clone().multiplyScalar(speed * hor));
        } else if (vertical !== 0) {
          velocity.add(w.clone().multiplyScalar(speed * ver));
        }

        api.velocity.set(
          velocity.x * delta,
          state.current.vel[1],
          velocity.z * delta
        );

        camera.eulerOrder = 'YXZ'

        // console.log(cameraDirection.toArray()[1])

        /** Updates camera position */
        camera.position.set(
          sphereRef.current.position.x,
          height + sphereRef.current.position.y,
          sphereRef.current.position.z
        );
        window.CameraPosition =sphereRef.current.position.toArray();
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

        if ((forward || backward || right || left) && !crouch) {
          setAState("run")
        } else if ((forward || backward || right || left) && crouch) {
          setAState("crouch")
        } else {
          setAState("idle")
        } 
        
        if (controlsRef.current) {
          var rot = new Vector3(0, 0, 0);
          camera.getWorldDirection(rot)
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
          console.log(e.deltaY)
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
          setLoadout(Loadout)
          setSelW(selectedWeapon)
          socket.emit('selW', selectedWeapon)
          console.log(selectedWeapon)
          forceUpdate();
          window.GameUIUpdate()
          window.selectedWeapon = selectedWeapon;
        })
      }, [])

      useEffect(() => {
        console.log(selectedWeapon)
        forceUpdate()
      }, [selectedWeapon])

      useEffect(() => {
        console.log("Make_Weapons")
        window.PrimaryAmmo = WeaponList[Loadout[0]].ammoSize;
        window.PrimaryClip = WeaponList[Loadout[0]].clipSize;

        window.SecondaryAmmo = WeaponList[Loadout[1]].ammoSize;
        window.SecondaryClip =  WeaponList[Loadout[1]].clipSize;

        window.MeleeAmmo = WeaponList[Loadout[2]].ammoSize;
        window.MeleeClip =  WeaponList[Loadout[2]].clipSize;

        forceUpdate();
        window.forceUpdate();
      }, [])

      function ReturnWeapon(Itm) {
        return (
          <Itm.ref PrimaryAmmo={window.PrimaryAmmo} setPrimaryAmmo={setPrimaryAmmo} PrimaryClip={window.PrimaryClip} setPrimaryClip={setPrimaryClip} state={astate} camera={camera} scene={scene} />
        )
      }

      useEffect(() => {
        socket.emit('loadout', Loadout)
      }, [Loadout])

    return (
      <>
        <group>  
          <PointerLockControls minPolarAngle={0.01} maxPolarAngle={3} ref={controlsRef} camera={camera} />               
        </group> 
        <group ref={gr} scale={[0.1, 0.1, 0.1]} renderOrder={2}>
          <group ref={gro} position={[0.3, -0.3, 0]}>
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