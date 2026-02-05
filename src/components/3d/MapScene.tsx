'use client';

import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import { Environment, OrbitControls, PerspectiveCamera, ContactShadows } from '@react-three/drei';
import CityMap from './CityMap';
export default function MapScene() {
    return (
        <div className="w-full h-full relative bg-slate-950">
            <Canvas shadows dpr={[1, 2]}>
                <PerspectiveCamera makeDefault position={[0, 10, 15]} fov={50} />

                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={1} castShadow />
                <spotLight position={[-10, 10, 5]} angle={0.15} penumbra={1} intensity={2} castShadow />

                <Suspense fallback={null}>
                    <CityMap />
                    <Environment preset="night" />
                </Suspense>

                <ContactShadows resolution={1024} scale={20} blur={2} opacity={0.35} far={10} color="#000000" />

                {/* OrbitControls disabled or restricted for the snapping behavior */}
                <OrbitControls
                    enablePan={false}
                    enableZoom={true}
                    minDistance={10}
                    maxDistance={30}
                    maxPolarAngle={Math.PI / 2.5}
                />
            </Canvas>
        </div>
    );
}
