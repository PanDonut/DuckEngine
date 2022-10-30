import { useLoader, useFrame } from "@react-three/fiber"
import React, { Suspense, useEffect } from "react"
import { useEffec, useRef } from "react"
import { AdditiveAnimationBlendMode, MeshNormalMaterial } from "three"
import * as THREE from 'three'
import { BoxGeometry } from "three"
import { GLTFLoader } from "three/examples/jsm/loaders/gltfloader"
import PlayerModel from "./BaseAssets/Player.gltf"
import { useGLTF, useAnimations } from "@react-three/drei";
import { Vector4 } from "three"
import { Vector3 } from "three"
import { clamp, EInterp, VInterp } from "../Functions"
import { Matrix4 } from "three"
import { useState } from "react"
import { ShotgunRenderer } from "./Weapons/Renderer"
import { WeaponList } from "./Weapons"
// import { Physics, useSphere, useBox } from "@react-three/cannon"

export const UserWrapper = ({ position, rotation = [0,0,0,"XYZ"], id, animState, hideParts = [], weaponState}) => {
    const group = useRef();
    const grRef = useRef();
    const body = useRef();
    const head = useRef();
    const lArm = useRef();
    const rArm = useRef();
    const arms = useRef();
    const { nodes, materials, animations } = useGLTF(PlayerModel);
    const { actions } = useAnimations(animations, group);
    const [r, setR] = useState([0,0,0]);
    const [rotate, setRotate] = useState(true);

    // const [sphereRef, api] = useSphere(() => ({
    //     mass: 100,
    //     fixedRotation: true,
    //     position: [0, 1, 0],
    //     args: 0.2,
    //     material: {
    //       friction: 0
    //     }
    //   }));

    const refPrim = React.useRef();

    useEffect(() => {
        switch (animState) {
            case "idle":
                Anim("animation.player.idle")                                              
                break;
            case "crouch":
                Anim("animation.player.crouch")                    
                break;
            case "cf":
                Anim("animation.player.crouchF")                    
                break;
            case "run":
                Anim("animation.player.run")                
                break;
            case "l":
                Anim("animation.player.runL")                
                break;
            case "r":
                Anim("animation.player.runR")                
                break;
            case "sl":
                Anim("animation.player.strafeL")                
                break;
            case "sr":
                Anim("animation.player.strafeR")                
                break;
            case "dead":
                Anim("animation.player.death")                
                break;
            default:
                Anim("animation.player.def")      
                break;
        }
        console.log(actions)
    }, [animState])

    function Anim(animName) {
        actions[animName].fadeIn(0.1); 
        actions[animName].play();
        Object.keys(actions).forEach(element => {
            if (element != animName) {
                actions[element].fadeOut(0.1)
                // actions[element].crossFadeTo(actions[animName])
                setTimeout(() => {
                    actions[element].stop()
                }, 100)
            }
         });
    }

    function IdentifyBodyParts(el) {
        el.children.forEach(element => {
            element.userData.id = id;
            element.castShadow = true;
            if (element.children) {
                IdentifyBodyParts(element);
            }
        });
    }

    useEffect(() => {
        if (group.current) {          
            group.current.userData.id = id;
            console.log(group.current)
            group.current.children.forEach(element => {
                element.userData.id = id;
                element.castShadow = true;
                IdentifyBodyParts(element);
            });
    }}, [group])
    const [lastValue, setLastValue] = useState(new Vector3().toArray());
    // useEffect(() => {
    //   const currentRot = new Vector3().fromArray(rotation);
    //   if (currentRot.length() > (new Vector3().fromArray(lastValue).length())) {
        
    //   }
    //   setLastValue(currentRot.toArray())
    // }, [rotation])
    useEffect(() => {
      var vec = new Vector3();
      var rot = new Vector3().fromArray(rotation);
      vec = rot;
      vec.y = 0;
      vec.add( group.current.position );
      group.current.lookAt( vec );
    }, [rotation])

    useEffect(() => {
      head.current.rotation.x = rotation[1]
      arms.current.rotation.x = rotation[1] + (animState == "cf" ? 1.8 : 1.5)
    }, [rotation])
    
    return (
        <group ref={group} rotation={r} dispose={null} position={position}>
        <group ref={grRef} />
        <group name="blockbench_export">
        <group>
          <group name="Root" rotation={[Math.PI, 0, Math.PI]}>
          <group>
            <group ref={body} name="body" position={[0, 1.5, 0]}>
              <group name="HeadMod" position={[0, 1.56, 0]} ref={head}>
                {
                hideParts.includes("head") ?
                ''
                :
                <group name="head">
                  <mesh
                    name="head_1"
                    castShadow
                    receiveShadow
                    geometry={nodes.head_1.geometry}
                    material={nodes.head_1.material}
                    position={[0, -3.0625, 0]}
                  />
                </group>
                }
              </group>
              <group name="arms" position={[0, 1.25, 0]} ref={arms}>
                <WeaponList.bab.renderer state={weaponState} nodes={useGLTF(WeaponList.bab.model).nodes} animations={useGLTF(WeaponList.bab.model).animations} group={arms} animate={true}/>
              </group>
              <mesh
                name="body_1"
                castShadow
                receiveShadow
                geometry={nodes.body_1.geometry}
                material={nodes.body_1.material}
                position={[0, -1.5, 0]}
              />
            </group>
            </group>
            <group name="left_leg" position={[-0.25, 1.5, 0]}>
              <mesh
                name="left_leg_1"
                castShadow
                receiveShadow
                geometry={nodes.left_leg_1.geometry}
                material={nodes.left_leg_1.material}
                position={[0.25, -1.5, 0]}
              />
            </group>
            <group name="right_leg" position={[0.25, 1.5, 0]}>
              <mesh
                name="right_leg_1"
                castShadow
                receiveShadow
                geometry={nodes.right_leg_1.geometry}
                material={nodes.right_leg_1.material}
                position={[-0.25, -1.5, 0]}
              />
            </group>
          </group>
        </group>
      </group>
      </group>
    )
}

useGLTF.preload(PlayerModel);