

import { useRef, useEffect, useState, useMemo } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import * as THREE from "three";
import { ImpactParams, ImpactResults } from "@/lib/impactPhysics";

const EARTH_RADIUS = 5;

interface SimulatorGlobeProps {
  params: ImpactParams;
  setParams: (params: ImpactParams) => void;
  results: ImpactResults | null;
  isSimulating: boolean;
}

const Earth = ({ targetPos }: { targetPos: THREE.Vector3 }) => {
  const meshRef = useRef<THREE.Mesh>(null);

  // Load local Earth texture
  const texture = useLoader(
    THREE.TextureLoader,
    "/textures/earth.jpg"
  );

  // Earth doesn't rotate
  useFrame(() => {});

  return (
    <group>
      <mesh ref={meshRef}>
        <sphereGeometry args={[EARTH_RADIUS, 64, 64]} />
        <meshStandardMaterial map={texture} />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[EARTH_RADIUS + 0.1, EARTH_RADIUS + 0.12, 64]} />
        <meshBasicMaterial color="#00d9ff" transparent opacity={0.3} side={THREE.DoubleSide} />
      </mesh>
      {/* Target Marker */}
      <mesh position={targetPos}>
        <sphereGeometry args={[0.1, 16, 16]} />
        <meshBasicMaterial color="#ff453a" />
      </mesh>
    </group>
  );
};

interface AsteroidProps {
  startPos: THREE.Vector3;
  targetPos: THREE.Vector3;
  isAnimating: boolean;
  diameter: number;
}

const Asteroid = ({ startPos, targetPos, isAnimating, diameter }: AsteroidProps) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const [progress, setProgress] = useState(0);

  // Jagged asteroid geometry
  const geometry = useMemo(() => {
    const geo = new THREE.IcosahedronGeometry(0.2 + (diameter / 5000) * 0.5, 1);
    const verts = geo.attributes.position;
    for (let i = 0; i < verts.count; i++) {
      verts.setX(i, verts.getX(i) + (Math.random() - 0.5) * 0.05);
      verts.setY(i, verts.getY(i) + (Math.random() - 0.5) * 0.05);
      verts.setZ(i, verts.getZ(i) + (Math.random() - 0.5) * 0.05);
    }
    geo.computeVertexNormals();
    return geo;
  }, [diameter]);

  useFrame(() => {
    if (isAnimating && meshRef.current && progress < 1) {
      setProgress((p) => Math.min(p + 0.01, 1));
      meshRef.current.position.lerpVectors(startPos, targetPos, progress);
      meshRef.current.rotation.x += 0.1;
      meshRef.current.rotation.y += 0.05;
    }
  });

  useEffect(() => {
    if (isAnimating) setProgress(0);
  }, [isAnimating]);

  return (
    <mesh ref={meshRef} geometry={geometry} position={startPos}>
      <meshStandardMaterial color="#887766" roughness={0.9} />
    </mesh>
  );
};

export const SimulatorGlobe = ({
  params,
  setParams,
  results,
  isSimulating,
}: SimulatorGlobeProps) => {
  const targetPos = latLonToVector3(params.lat, params.lon, EARTH_RADIUS);
  const startPos = calculateStartPosition(targetPos, params.angle, params.approach);

  const handleDoubleClick = (event: any) => {
    const intersects = event.intersects;
    if (intersects.length > 0) {
      const point = intersects[0].point;
      const { lat, lon } = vector3ToLatLon(point, EARTH_RADIUS);
      setParams({ ...params, lat: parseFloat(lat.toFixed(2)), lon: parseFloat(lon.toFixed(2)) });
    }
  };

  return (
    <div className="w-full h-full rounded-xl overflow-hidden border border-primary/20 glow-border bg-background/50">
      <Canvas camera={{ position: [0, 0, 15], fov: 45 }}>
        <color attach="background" args={["#0a0e27"]} />
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 5, 10]} intensity={1.5} />
        <Stars radius={300} depth={60} count={5000} factor={7} fade speed={1} />

        <group onDoubleClick={handleDoubleClick}>
          <Earth targetPos={targetPos} />
        </group>

        {isSimulating && (
          <Asteroid
            startPos={startPos}
            targetPos={targetPos}
            isAnimating={isSimulating}
            diameter={params.diameter}
          />
        )}

        <OrbitControls
          enableDamping
          dampingFactor={0.05}
          minDistance={7}
          maxDistance={30}
          enablePan={false}
        />
      </Canvas>
    </div>
  );
};

function latLonToVector3(lat: number, lon: number, radius: number): THREE.Vector3 {
  const phi = ((90 - lat) * Math.PI) / 180;
  const theta = ((lon + 180) * Math.PI) / 180;
  return new THREE.Vector3(
    -radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta)
  );
}

function vector3ToLatLon(point: THREE.Vector3, radius: number) {
  const lat = 90 - (Math.acos(point.y / radius) * 180) / Math.PI;
  const lon = (Math.atan2(point.z, -point.x) * 180) / Math.PI - 180;
  return { lat, lon };
}

function calculateStartPosition(
  targetPos: THREE.Vector3,
  angle: number,
  approach: string
): THREE.Vector3 {
  const distance = 15;
  const angleRad = (angle * Math.PI) / 180;
  const up = targetPos.clone().normalize();

  if (approach === "top") {
    return up.clone().multiplyScalar(distance);
  }

  let horizontalDir = new THREE.Vector3(1, 0, 0);
  const tangent = new THREE.Vector3().crossVectors(up, new THREE.Vector3(0, 1, 0)).normalize();
  const bitangent = new THREE.Vector3().crossVectors(up, tangent).normalize();

  switch (approach) {
    case "north":
      horizontalDir = bitangent.negate();
      break;
    case "east":
      horizontalDir = tangent;
      break;
    case "south":
      horizontalDir = bitangent;
      break;
    case "west":
      horizontalDir = tangent.negate();
      break;
  }

  const verticalComponent = up.clone().multiplyScalar(Math.sin(angleRad));
  const horizontalComponent = horizontalDir.multiplyScalar(Math.cos(angleRad));

  return targetPos
    .clone()
    .add(verticalComponent.add(horizontalComponent).normalize().multiplyScalar(distance));
}

