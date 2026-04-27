import { useGLTF } from "@react-three/drei";
import { Group } from "three";
import type { GLTF } from "three-stdlib";
import type { JSX } from "react";

type T_RexModelProps = JSX.IntrinsicElements["group"];

export default function T_RexModel(props: T_RexModelProps) {
    const { scene } = useGLTF("/models/scene.gltf") as GLTF & {
        scene: Group;
    };

    return <primitive object={scene} {...props} />;
}

useGLTF.preload("/models/scene.gltf");
