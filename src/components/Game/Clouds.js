import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

const Cloud = ({ position, scale, speed, color }) => {
  const groupRef = useRef();

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();
    groupRef.current.position.z = (position[2] + time * speed) % 20 - 10;
    groupRef.current.rotation.y = Math.sin(time * 0.2) * 0.1;
  });

  return (
    <group ref={groupRef} position={position} scale={scale}>
      {/* Cloud puffs */}
      <mesh>
        <sphereGeometry args={[1, 16, 16]} />
        <meshStandardMaterial color={color} transparent opacity={0.6} />
      </mesh>
      <mesh position={[1, 0, 0]}>
        <sphereGeometry args={[0.8, 16, 16]} />
        <meshStandardMaterial color={color} transparent opacity={0.6} />
      </mesh>
      <mesh position={[-1, 0, 0]}>
        <sphereGeometry args={[0.8, 16, 16]} />
        <meshStandardMaterial color={color} transparent opacity={0.6} />
      </mesh>
      <mesh position={[0, 0.5, 0]}>
        <sphereGeometry args={[0.7, 16, 16]} />
        <meshStandardMaterial color={color} transparent opacity={0.6} />
      </mesh>
    </group>
  );
};

const Clouds = () => {
  // Generate random clouds
  const clouds = Array.from({ length: 20 }, (_, i) => ({
    position: [
      Math.random() * 40 - 20,
      Math.random() * 10 + 5,
      Math.random() * 20 - 10
    ],
    scale: [
      Math.random() * 0.5 + 0.5,
      Math.random() * 0.5 + 0.5,
      Math.random() * 0.5 + 0.5
    ],
    speed: Math.random() * 0.5 + 0.5,
    color: i % 3 === 0 ? '#60A5FA' : i % 3 === 1 ? '#93C5FD' : '#BFDBFE'
  }));

  return (
    <group>
      {/* Background environment */}
      <mesh position={[0, 0, -15]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[100, 100]} />
        <meshStandardMaterial
          color="#1E40AF"
          metalness={0.2}
          roughness={0.8}
          opacity={0.3}
          transparent
        />
      </mesh>

      {/* Stars */}
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={1000}
            array={Float32Array.from(Array.from({ length: 3000 }, () => Math.random() * 100 - 50))}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial size={0.1} color="#FFFFFF" transparent opacity={0.8} />
      </points>

      {/* Clouds */}
      {clouds.map((cloud, index) => (
        <Cloud key={index} {...cloud} />
      ))}

      {/* Ambient fog */}
      <fog attach="fog" args={['#1E40AF', 10, 30]} />
    </group>
  );
};

export default Clouds;
