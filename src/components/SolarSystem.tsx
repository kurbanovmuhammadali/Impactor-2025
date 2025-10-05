import { useRef, useState } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import * as THREE from "three";

interface Asteroid {
  id: string;
  name: string;
  distance: number;
  velocity: number;
  diameter: number;
  hazardous: boolean;
  closeApproachDate: string;
}

// Sun Component
const Sun = () => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.001;
    }
  });

  return (
    <mesh ref={meshRef} position={[-50, 0, 0]}>
      <sphereGeometry args={[3, 32, 32]} />
      <meshBasicMaterial color="#FDB813" />
      <pointLight intensity={2} distance={100} color="#FDB813" />
      {/* Directional light illuminating Earth */}
      <directionalLight position={[-50, 0, 0]} intensity={1} color="#ffffff" />
    </mesh>
  );
};

// Earth Component with texture and light
const Earth = () => {
  const meshRef = useRef<THREE.Mesh>(null);

  // Load texture from Wikipedia URL
  const texture = useLoader(
    THREE.TextureLoader,
      "/textures/earth.jpg"
  );

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.002;
    }
  });

  return (
    <group>
      {/* Earth Mesh */}
      <mesh ref={meshRef}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial map={texture} />
      </mesh>

      {/* Atmosphere Ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[1.5, 1.52, 64]} />
        <meshBasicMaterial
          color="#00d9ff"
          transparent
          opacity={0.3}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Subtle point light on Earth */}
      <pointLight position={[5, 5, 5]} intensity={0.5} distance={10} color="#ffffff" />
    </group>
  );
};

// Asteroid Mesh
const AsteroidMesh = ({
  asteroid,
  onClick,
}: {
  asteroid: Asteroid;
  onClick: (asteroid: Asteroid) => void;
}) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  // Random position around Earth
  const angle = Math.random() * Math.PI * 2;
  const distance = 2 + asteroid.distance / 10000000;
  const x = Math.cos(angle) * distance;
  const z = Math.sin(angle) * distance;
  const y = (Math.random() - 0.5) * 2;

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.01;
      meshRef.current.rotation.y += 0.01;
    }
  });

  const size = Math.max(0.05, Math.min(0.3, asteroid.diameter / 1000));
  // Grey for normal, red for hazardous
  const color = asteroid.hazardous ? "#ff6b35" : "#808080";

  return (
    <mesh
      ref={meshRef}
      position={[x, y, z]}
      onClick={() => onClick(asteroid)}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      scale={hovered ? 1.5 : 1}
    >
      {/* Irregular asteroid shape */}
      <icosahedronGeometry args={[size, 1]} />
      <meshStandardMaterial
        color={color}
        emissive={asteroid.hazardous ? "#ff6b35" : "#000000"}
        emissiveIntensity={hovered ? 1 : 0.5}
      />
      {asteroid.hazardous && (
        <pointLight intensity={0.5} distance={2} color="#ff6b35" />
      )}
    </mesh>
  );
};

// Solar System Component
interface SolarSystemProps {
  asteroids: Asteroid[];
  onAsteroidClick: (asteroid: Asteroid) => void;
}

export const SolarSystem = ({
  asteroids,
  onAsteroidClick,
}: SolarSystemProps) => {
  return (
    <div className="w-full h-full">
      <Canvas camera={{ position: [0, 5, 10], fov: 60 }}>
        <color attach="background" args={["#0a0e27"]} />
        <ambientLight intensity={0.2} />
        <Stars radius={300} depth={60} count={5000} factor={7} fade speed={1} />

        <Sun />
        <Earth />

        {asteroids.map((asteroid) => (
          <AsteroidMesh
            key={asteroid.id}
            asteroid={asteroid}
            onClick={onAsteroidClick}
          />
        ))}

        <OrbitControls
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          minDistance={3}
          maxDistance={30}
        />
      </Canvas>
    </div>
  );
};
