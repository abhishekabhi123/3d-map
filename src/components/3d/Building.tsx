'use client';

import { useGLTF, Html } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useRef, useState } from 'react';
import * as THREE from 'three';
import { useStore, MarkerData } from '@/store/useStore';

interface BuildingProps {
    modelPath: string;
    position: [number, number, number];
    rotation?: [number, number, number];
    scale?: number;
    data: MarkerData;
}

export default function Building({ modelPath, position, rotation = [0, 0, 0], scale = 1, data }: BuildingProps) {
    const { scene } = useGLTF(modelPath);
    const { setSelectedMarker } = useStore();
    const [hovered, setHovered] = useState(false);
    const meshRef = useRef<THREE.Group>(null);

    useFrame((state) => {
        if (meshRef.current) {
            // Subtle float effect
            meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime + position[0]) * 0.1;
        }
    });

    // Clone the scene so multiple buildings can use the same model if needed
    const clonedScene = scene.clone();

    return (
        <group
            ref={meshRef}
            position={position}
            rotation={rotation}
            scale={scale * (hovered ? 1.05 : 1)}
            onPointerOver={() => setHovered(true)}
            onPointerOut={() => setHovered(false)}
            onClick={(e) => {
                e.stopPropagation();
                setSelectedMarker(data);
            }}
        >
            <primitive object={clonedScene} />

            {/* Visual Indicator/Marker */}
            <Html position={[0, 4, 0]} center distanceFactor={15}>
                <div
                    className={`w-6 h-6 rounded-full border-2 border-yellow-500 bg-black/50 cursor-pointer transition-all duration-300 flex items-center justify-center
            ${hovered ? 'scale-125 bg-yellow-500/50' : 'scale-100'}
          `}
                >
                    <div className="w-2 h-2 rounded-full bg-yellow-500 shadow-[0_0_10px_#eab308]" />
                </div>
            </Html>
        </group>
    );
}

useGLTF.preload('/models/barrack.glb');
useGLTF.preload('/models/darkTower.glb');
useGLTF.preload('/models/fireTower.glb');
useGLTF.preload('/models/lightTower.glb');
useGLTF.preload('/models/waterTower.glb');
useGLTF.preload('/models/windTower.glb');
useGLTF.preload('/models/centerCrystal.glb');
useGLTF.preload('/models/map.glb');
