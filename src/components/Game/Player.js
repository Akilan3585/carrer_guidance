import React, { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { useSpring, animated } from '@react-spring/three';
import * as THREE from 'three';

const Player = ({ position }) => {
  const groupRef = useRef();
  const jetRef = useRef();
  const trailRef = useRef();
  const trailPoints = useRef(Array(20).fill([0, 0, 0]));

  // Smooth animations for tilting and banking
  const { tilt, bank } = useSpring({
    tilt: Math.abs(position[0] - (groupRef.current?.position.x || 0)) > 0.1 
      ? (position[0] - (groupRef.current?.position.x || 0)) * -0.5
      : 0,
    bank: position[1] > 1.5 ? -0.3 : 0,
    config: { tension: 170, friction: 15 }
  });

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    
    const time = clock.getElapsedTime();

    // Smooth position interpolation
    groupRef.current.position.x += (position[0] - groupRef.current.position.x) * 0.1;
    groupRef.current.position.y += (position[1] - groupRef.current.position.y) * 0.1;
    groupRef.current.position.z = position[2];

    // Hover animation
    const hoverOffset = Math.sin(time * 3) * 0.05;
    groupRef.current.position.y += hoverOffset;

    // Engine thrust animation
    const thrustScale = 0.8 + Math.sin(time * 20) * 0.2;
    if (jetRef.current) {
      jetRef.current.scale.z = thrustScale;
    }

    // Update trail
    if (trailRef.current) {
      trailPoints.current.push([
        groupRef.current.position.x,
        groupRef.current.position.y - 0.5,
        groupRef.current.position.z + 1
      ]);
      trailPoints.current.shift();
      
      const positions = new Float32Array(trailPoints.current.flat());
      trailRef.current.geometry.setAttribute(
        'position',
        new THREE.BufferAttribute(positions, 3)
      );
    }
  });

  return (
    <animated.group 
      ref={groupRef} 
      position={position}
      rotation-z={tilt}
      rotation-x={bank}
    >
      {/* Main body */}
      <mesh>
        <cylinderGeometry args={[0.2, 0.4, 2, 8]} />
        <meshStandardMaterial color="#2C5282" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Cockpit */}
      <mesh position={[0, 0.3, 0.4]}>
        <sphereGeometry args={[0.2, 16, 16]} />
        <meshStandardMaterial 
          color="#60A5FA" 
          metalness={0.9} 
          roughness={0.1}
          emissive="#60A5FA"
          emissiveIntensity={0.5}
        />
      </mesh>

      {/* Wings */}
      <mesh position={[0, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <boxGeometry args={[1.2, 0.1, 0.4]} />
        <meshStandardMaterial color="#4299E1" metalness={0.7} roughness={0.3} />
      </mesh>

      {/* Tail */}
      <mesh position={[0, 0.3, -0.8]} rotation={[0.3, 0, 0]}>
        <boxGeometry args={[0.1, 0.5, 0.3]} />
        <meshStandardMaterial color="#4299E1" metalness={0.7} roughness={0.3} />
      </mesh>

      {/* Engine glow */}
      <group ref={jetRef} position={[0, 0, -1]}>
        <pointLight color="#60A5FA" intensity={2} distance={3} />
        <mesh>
          <sphereGeometry args={[0.15, 16, 16]} />
          <meshStandardMaterial
            color="#60A5FA"
            emissive="#60A5FA"
            emissiveIntensity={2}
            transparent
            opacity={0.7}
          />
        </mesh>
      </group>

      {/* Particle trail */}
      <points ref={trailRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={20}
            array={new Float32Array(60)}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          color="#60A5FA"
          size={0.1}
          transparent
          opacity={0.6}
          sizeAttenuation
        />
      </points>

      {/* Speed lines effect */}
      {Array.from({ length: 10 }).map((_, i) => (
        <mesh
          key={i}
          position={[
            (Math.random() - 0.5) * 2,
            (Math.random() - 0.5) * 2,
            -2 - Math.random() * 3
          ]}
          scale={[0.05, 0.05, 1 + Math.random()]}
        >
          <boxGeometry />
          <meshBasicMaterial
            color="#60A5FA"
            transparent
            opacity={0.3}
          />
        </mesh>
      ))}
    </animated.group>
  );
};

export default Player;
