import React, { useRef, useState } from "react";
import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import { Stars, OrbitControls } from "@react-three/drei";

const METEOR_PARAMS = {
    frequency: 0.05,
    maxCount: 5,
    colors: [
        [1.0, 0.9, 0.7],
        [0.8, 0.9, 1.0],
        [1.0, 0.6, 0.4]
    ]
};

const vertexShader = `
    attribute float aOpacity;
    varying float vOpacity;

    void main() {
        vOpacity = aOpacity;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
`;

const fragmentShader = `
    varying float vOpacity;
    uniform vec3 uColor;

    void main() {
        gl_FragColor = vec4(uColor, vOpacity);
    }
`;

const RealisticMeteor = ({ onDestroy }) => {
    const groupRef = useRef();
    const trailRef = useRef();
    const [trailPoints, setTrailPoints] = useState([]);

    const [config] = useState(() => {
        const angle = Math.random() * Math.PI * 2;
        return {
            position: new THREE.Vector3(
                Math.cos(angle) * 250,
                Math.random() * 150 - 75,
                Math.sin(angle) * 250
            ),
            direction: new THREE.Vector3(
                -Math.cos(angle) * 0.5,
                (Math.random() - 0.5) * 0.3,
                -Math.sin(angle) * 0.5
            ).normalize(),
            speed: 25 + Math.random() * 15,
            color: new THREE.Color(...METEOR_PARAMS.colors[Math.floor(Math.random() * 3)]),
            lifetime: 0,
            maxLifetime: 3
        };
    });

    const materialRef = useRef();

    useFrame((_, delta) => {
        const newPosition = config.position.clone().addScaledVector(config.direction, config.speed * delta);
        setTrailPoints(prev => {
            const newPoints = [newPosition.clone(), ...prev]; // Insertamos al principio
            return newPoints.slice(0, 100); // mantenemos el largo limitado
        });

        config.position.copy(newPosition);
        config.lifetime += delta;

        if (trailRef.current) {
            const positions = [];
            const opacities = [];

            trailPoints.forEach((point, i) => {
                positions.push(point.x, point.y, point.z);
                const t = i / trailPoints.length;
                opacities.push(Math.pow(1 - t, 2.5));
            });

            const geometry = new THREE.BufferGeometry();
            geometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
            geometry.setAttribute("aOpacity", new THREE.Float32BufferAttribute(opacities, 1));
            trailRef.current.geometry = geometry;
        }

        if (config.lifetime > config.maxLifetime) onDestroy();
    });

    return (
        <group ref={groupRef}>
            <mesh position={config.position}>
                <sphereGeometry args={[0.5, 10, 10]} />
                <meshBasicMaterial color={config.color} toneMapped={false} />
            </mesh>

            {trailPoints.length > 1 && (
                <line ref={trailRef}>
                    <bufferGeometry />
                    <shaderMaterial
                        ref={materialRef}
                        args={[{
                            uniforms: {
                                uColor: { value: config.color }
                            },
                            vertexShader,
                            fragmentShader,
                            transparent: true,
                            depthWrite: false
                        }]}
                    />
                </line>
            )}
        </group>
    );
};

const MeteorShower = () => {
    const [meteors, setMeteors] = useState([]);

    useFrame(() => {
        if (
            meteors.length < METEOR_PARAMS.maxCount &&
            Math.random() < METEOR_PARAMS.frequency
        ) {
            setMeteors(prev => [...prev, { id: Date.now() + Math.random() }]);
        }
    });

    return (
        <>
            {meteors.map(meteor => (
                <RealisticMeteor
                    key={meteor.id}
                    onDestroy={() =>
                        setMeteors(prev => prev.filter(m => m.id !== meteor.id))
                    }
                />
            ))}
        </>
    );
};

const AnimatedStars = () => {
    return (
        <div
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100vw",
                height: "100vh",
                zIndex: -1,
                background: "radial-gradient(ellipse at center, #0b0c2a 0%, #000014 100%)"
            }}
        >
            <Canvas>
                <Stars
                    radius={150}
                    depth={60}
                    count={3000}
                    factor={6}
                    saturation={0}
                    fade
                    speed={0}
                />
                <MeteorShower />
                <ambientLight intensity={0.05} color="#ffffff" />
                <OrbitControls
                    autoRotate
                    autoRotateSpeed={0.02}
                    enableZoom={false}
                    minPolarAngle={Math.PI / 3}
                    maxPolarAngle={Math.PI / 2.5}
                    enablePan={false}
                    rotateSpeed={0.1}
                />
            </Canvas>
        </div>
    );
};

export default AnimatedStars;
