'use client';

import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import * as THREE from 'three';
import { easing } from 'maath';
import { useStore, MarkerData } from '@/store/useStore';
import Building from './Building';

const BUILDINGS_DATA: (MarkerData & { model: string, angle: number })[] = [
    { id: '1', name: 'Barracks', level: 10, element: 'Fire', attack: 50, defense: 40, model: '/models/barrack.glb', angle: 0, position: [7, 0, 0] },
    { id: '2', name: 'Dark Tower', level: 15, element: 'Dark', attack: 80, defense: 20, model: '/models/darkTower.glb', angle: 60, position: [3.5, 0, 6.06] },
    { id: '3', name: 'Fire Tower', level: 12, element: 'Fire', attack: 60, defense: 30, model: '/models/fireTower.glb', angle: 120, position: [-3.5, 0, 6.06] },
    { id: '4', name: 'Light Tower', level: 18, element: 'Light', attack: 40, defense: 90, model: '/models/lightTower.glb', angle: 180, position: [-7, 0, 0] },
    { id: '5', name: 'Water Tower', level: 14, element: 'Water', attack: 45, defense: 65, model: '/models/waterTower.glb', angle: 240, position: [-3.5, 0, -6.06] },
    { id: '6', name: 'Wind Tower', level: 16, element: 'Wind', attack: 70, defense: 35, model: '/models/windTower.glb', angle: 300, position: [3.5, 0, -6.06] },
];

export default function CityMap() {
    const { currentSide } = useStore();
    const groupRef = useRef<THREE.Group>(null);
    const { scene: mapScene } = useGLTF('/models/map.glb');
    const { scene: crystalScene } = useGLTF('/models/centerCrystal.glb');

    useFrame((state, delta) => {
        if (groupRef.current) {
            // Rotation snapping logic
            // Target rotation is currentSide * 60 degrees in radians
            // We subtract to make it rotate "towards" the user
            const targetRotationY = -currentSide * (Math.PI / 3);
            easing.dampE(groupRef.current.rotation, [0, targetRotationY, 0], 0.25, delta);
        }
    });

    return (
        <group ref={groupRef}>
            {/* Base Map */}
            <primitive object={mapScene} scale={1} position={[0, -0.5, 0]} />

            {/* Center Piece */}
            <group position={[0, 0, 0]} scale={1.5}>
                <primitive object={crystalScene} />
            </group>

            {/* Buildings */}
            {BUILDINGS_DATA.map((b) => (
                <Building
                    key={b.id}
                    modelPath={b.model}
                    position={b.position}
                    data={b}
                    scale={0.8}
                />
            ))}
        </group>
    );
}
