import { FirstPersonControls, OrbitControls, PerspectiveCamera, PointerLockControls, Text } from "@react-three/drei"
import React, { useEffect } from "react"
import { useState } from "react"
import { useRef } from "react"
import { BoxGeometry, MeshNormalMaterial } from "three"
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import DefMap from '../Maps/mapdef.gltf'
import { useFrame, useLoader, useThree } from '@react-three/fiber'
import { usePersonControls } from "./Input"
import { Physics, useSphere, useBox } from "@react-three/cannon"
import { Vector3 } from "three"
import { Raycaster } from "three"
import { FInterp, FInterpFromConst } from "../Functions"
import { useReducer } from "react"

export const ControlsWrapper = ({ socket }) => {
    const [, forceUpdate] = useReducer((x) => x + 1, 0);
    const { camera, scene } = useThree();
    const [updateCallback, setUpdateCallback] = useState(null)
    const controlsRef = useRef();

    // init movement
    const speed = 300;
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

    useEffect(() => {
      // console.log(crouch)
      if (crouch) {
        FInterp(height, 0.5, 0.05, 20, setHeight);
      } else {
        FInterp(height, 1, 0.05, 20, setHeight);
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
            setVertical(0.5);      
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

        /** Updates camera position */
        camera.position.set(
          sphereRef.current.position.x,
          height + sphereRef.current.position.y,
          sphereRef.current.position.z
        );
        
        if (controlsRef.current) {
          onControlsChange(sphereRef.current.position, camera.rotation);
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

    return (
      <group>    
        <PointerLockControls ref={controlsRef} camera={camera} /> 
      </group>    
    )
}
