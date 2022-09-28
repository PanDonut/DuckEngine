import { useLoader } from "@react-three/fiber"
import React, { Suspense } from "react"
import { GLTFLoader } from "three/examples/jsm/loaders/gltfloader"
import SkyboxModel from './skybox.gltf'

export default function Skybox({position}) {
    const gltf = useLoader(GLTFLoader, SkyboxModel)
    return (
        <primitive object={gltf.scene} scale={[100,100,100]} position={position} />
    )
}