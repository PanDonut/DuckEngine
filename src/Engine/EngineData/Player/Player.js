import { useLoader } from "@react-three/fiber"
import React from "react"
import { MeshNormalMaterial } from "three"
import { BoxGeometry } from "three"
import { GLTFLoader } from "three/examples/jsm/loaders/gltfloader"
import PlayerModel from "./BaseAssets/Player.gltf"

export const UserWrapper = ({ position, rotation, id }) => {
    const gltf = useLoader(GLTFLoader, PlayerModel)
    return (
        <group position={position} rotation={rotation}>
            <primitive object={gltf.scene} />
        </group>
    )
}