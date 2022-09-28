import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import untitled from './untitled.gltf'

export function DefMap(props) {
  const { nodes, materials } = useGLTF(untitled);
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane.geometry}
        material={nodes.Plane.material}
        scale={10}
        position={[0, -1.82, 0]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube.geometry}
        material={nodes.Cube.material}
        position={[-5.6307621, -0.94808942, 5.88302088]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube001.geometry}
        material={nodes.Cube001.material}
        position={[-2.13197327, -0.94808906, -6.28079748]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube002.geometry}
        material={nodes.Cube002.material}
        position={[6.68118668, -0.94808918, 6.78217745]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube003.geometry}
        material={nodes.Cube003.material}
        position={[4.97380257, -0.94808942, -2.50088835]}
      />
    </group>
  );
}

useGLTF.preload(untitled);
