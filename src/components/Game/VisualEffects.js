import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

const SpeedLines = ({ active }) => {
  const points = useRef();
  const positions = new Float32Array(300);

  for (let i = 0; i < 100; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 20;      // x
    positions[i * 3 + 1] = Math.random() * 10;          // y
    positions[i * 3 + 2] = (Math.random() - 0.5) * 20;  // z
  }

  useFrame(({ clock }) => {
    if (!points.current || !active) return;
    const speed = Math.sin(clock.getElapsedTime() * 2) * 0.2 + 0.5;

    for (let i = 0; i < 100; i++) {
      const i3 = i * 3;
      points.current.geometry.attributes.position.array[i3 + 2] += speed;
      if (points.current.geometry.attributes.position.array[i3 + 2] > 10) {
        points.current.geometry.attributes.position.array[i3 + 2] = -10;
      }
    }
    points.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <Points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={100}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <PointMaterial
        transparent
        vertexColors
        size={0.1}
        sizeAttenuation={true}
        depthWrite={false}
        color="#60A5FA"
      />
    </Points>
  );
};

const ParticleTrail = ({ position = [0, 0, 0] }) => {
  const trail = useRef();
  const positions = new Float32Array(300);
  const colors = new Float32Array(300);

  useFrame(() => {
    if (!trail.current || !position) return;

    // Shift existing particles back
    for (let i = 99; i > 0; i--) {
      const i3 = i * 3;
      const prev3 = (i - 1) * 3;
      
      for (let j = 0; j < 3; j++) {
        trail.current.geometry.attributes.position.array[i3 + j] =
          trail.current.geometry.attributes.position.array[prev3 + j];
      }
    }

    // Add new particle at current position
    trail.current.geometry.attributes.position.array[0] = position[0];
    trail.current.geometry.attributes.position.array[1] = position[1];
    trail.current.geometry.attributes.position.array[2] = position[2];

    trail.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <Points ref={trail}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={100}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={100}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <PointMaterial
        vertexColors
        size={0.15}
        sizeAttenuation={true}
        transparent
        opacity={0.6}
        depthWrite={false}
      />
    </Points>
  );
};

const GlowEffect = ({ position = [0, 0, 0], color = '#60A5FA', intensity = 1, size = 2 }) => {
  return (
    <mesh position={position}>
      <sphereGeometry args={[size, 32, 32]} />
      <meshBasicMaterial
        color={color}
        transparent
        opacity={0.2}
        blending={THREE.AdditiveBlending}
      />
      <pointLight
        color={color}
        intensity={intensity}
        distance={size * 2}
        decay={2}
      />
    </mesh>
  );
};

const PowerUpEffect = ({ position = [0, 0, 0], type }) => {
  const effectConfig = {
    speedBoost: {
      color: '#EF4444',
      size: 3,
      intensity: 2
    },
    skillMagnet: {
      color: '#10B981',
      size: 2.5,
      intensity: 1.5
    },
    timeSlower: {
      color: '#3B82F6',
      size: 2,
      intensity: 1
    }
  };

  const config = effectConfig[type] || effectConfig.speedBoost;

  return (
    <GlowEffect
      position={position}
      color={config.color}
      intensity={config.intensity}
      size={config.size}
    />
  );
};

const VisualEffects = ({ playerPosition = [0, 0, 0], activePowerUps = [] }) => {
  const hasSpeedBoost = Array.isArray(activePowerUps) && activePowerUps.some(p => p?.type === 'speedBoost');

  return (
    <group>
      <SpeedLines active={hasSpeedBoost} />
      <ParticleTrail position={playerPosition} />
      {Array.isArray(activePowerUps) && activePowerUps.map((powerUp, index) => (
        powerUp && (
          <PowerUpEffect
            key={`${powerUp.type}-${index}`}
            position={playerPosition}
            type={powerUp.type}
          />
        )
      ))}
    </group>
  );
};

export default VisualEffects;
