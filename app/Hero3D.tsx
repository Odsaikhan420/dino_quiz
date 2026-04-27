import { Canvas } from "@react-three/fiber";
import { OrbitControls, Float, Stage } from "@react-three/drei";
import { Suspense } from "react";
import T_RexModel from "./Model";

export default function Hero3D() {
    return (
        <div className="h-[250px] w-full">
            <Canvas camera={{ position: [0, 1, 6], fov: 50 }}>
                <Suspense fallback={null}>
                    <Stage environment="city" intensity={0.6} adjustCamera={false}>
                        <Float speed={1} rotationIntensity={0.5} floatIntensity={0.5}>
                            <T_RexModel scale={0.3} />
                        </Float>
                    </Stage>
                </Suspense>
                <OrbitControls enableZoom={false} />
            </Canvas>
        </div>
    );
}
