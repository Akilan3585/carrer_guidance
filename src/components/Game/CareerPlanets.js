import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';

const Planet = ({ position, color, progress, name, description }) => {
  const meshRef = useRef();
  const ringRef = useRef();
  const glowRef = useRef();

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();
    
    // Rotate planet
    meshRef.current.rotation.y += 0.005;
    
    // Animate ring
    ringRef.current.rotation.z = time * 0.3;
    ringRef.current.rotation.x = Math.sin(time * 0.5) * 0.2;
    
    // Pulse glow based on progress
    const glowIntensity = 0.2 + Math.sin(time * 2) * 0.1 + progress * 0.5;
    meshRef.current.material.emissiveIntensity = glowIntensity;
  });

  return (
    <group position={position}>
      {/* Planet core */}
      <mesh ref={meshRef}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial
          color={color}
          metalness={0.3}
          roughness={0.7}
          emissive={color}
          emissiveIntensity={0.2}
        />
      </mesh>

      {/* Orbital ring */}
      <mesh ref={ringRef}>
        <torusGeometry args={[1.5, 0.1, 16, 100]} />
        <meshStandardMaterial
          color={color}
          metalness={0.8}
          roughness={0.2}
          transparent
          opacity={0.6}
        />
      </mesh>

      {/* Glow effect */}
      <mesh ref={glowRef} scale={[1.2, 1.2, 1.2]}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial
          color={color}
          transparent
          opacity={0.2}
          emissive={color}
          emissiveIntensity={0.5}
        />
      </mesh>

      {/* Career path name */}
      <Text
        position={[0, 1.8, 0]}
        fontSize={0.3}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        {name}
      </Text>

      {/* Description (visible when close) */}
      <Text
        position={[0, -1.8, 0]}
        fontSize={0.15}
        color="white"
        anchorX="center"
        anchorY="middle"
        maxWidth={2}
        textAlign="center"
      >
        {description}
      </Text>
    </group>
  );
};

const CareerPlanets = ({ progress = 0 }) => {
  const planets = [
    {
      position: [-8, 0, -5],
      color: '#4299E1',
      name: 'Software Engineering',
      description: 'Build the future through code. Create apps, systems, and digital solutions.'
    },
    {
      position: [8, 0, -5],
      color: '#48BB78',
      name: 'Data Science',
      description: 'Transform data into insights. Drive decisions with analytics and ML.'
    },
    {
      position: [0, 8, -5],
      color: '#ED64A6',
      name: 'AI/ML',
      description: 'Develop intelligent systems. Shape the future of automation and cognition.'
    },
    {
      position: [0, -8, -5],
      color: '#ECC94B',
      name: 'Cybersecurity',
      description: 'Protect digital assets. Defend against cyber threats and ensure data safety.'
    },
    {
      position: [-6, 6, -5],
      color: '#9F7AEA',
      name: 'Cloud Computing',
      description: 'Build scalable infrastructure. Enable global connectivity and services.'
    },
    {
      position: [6, -6, -5],
      color: '#F56565',
      name: 'DevOps',
      description: 'Streamline development. Automate deployment and optimize operations.'
    }
  ];

  // Create connecting lines between planets
  const connections = [
    { start: [-8, 0, -5], end: [0, 8, -5] },    // Software to AI
    { start: [8, 0, -5], end: [0, 8, -5] },     // Data Science to AI
    { start: [-6, 6, -5], end: [0, 8, -5] },    // Cloud to AI
    { start: [6, -6, -5], end: [8, 0, -5] },    // DevOps to Data Science
    { start: [0, -8, -5], end: [6, -6, -5] },   // Cybersecurity to DevOps
  ];

  return (
    <group>
      {/* Career path connections */}
      {connections.map((connection, index) => (
        <line key={index}>
          <bufferGeometry attach="geometry">
            <bufferAttribute
              attach="attributes-position"
              count={2}
              array={new Float32Array([
                ...connection.start,
                ...connection.end
              ])}
              itemSize={3}
            />
          </bufferGeometry>
          <lineBasicMaterial
            attach="material"
            color="#60A5FA"
            opacity={0.3}
            transparent
            linewidth={1}
          />
        </line>
      ))}

      {/* Career planets */}
      {planets.map((planet, index) => (
        <Planet
          key={index}
          position={planet.position}
          color={planet.color}
          name={planet.name}
          description={planet.description}
          progress={progress}
        />
      ))}
    </group>
  );
};

export default CareerPlanets;
