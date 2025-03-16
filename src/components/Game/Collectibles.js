import React, { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere, Box } from '@react-three/drei';

const SkillPoint = ({ position, type, onCollect, index }) => {
  const ref = useRef();
  const baseY = position[1];
  const floatAmplitude = 0.2;
  const floatSpeed = 2;

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const time = clock.getElapsedTime();
    ref.current.position.y = baseY + Math.sin(time * floatSpeed) * floatAmplitude;
    ref.current.rotation.y += 0.02;
  });

  const getSkillColor = () => {
    switch (type) {
      case 'ece': return '#10B981'; // Emerald for ECE Core
      case 'ai': return '#8B5CF6';  // Purple for AI/ML
      case 'software': return '#3B82F6'; // Blue for Full Stack
      default: return '#60A5FA';
    }
  };

  return (
    <group ref={ref} position={position}>
      <Sphere args={[0.3, 32, 32]}>
        <meshStandardMaterial
          color={getSkillColor()}
          emissive={getSkillColor()}
          emissiveIntensity={0.5}
          roughness={0.3}
          metalness={0.7}
          transparent
          opacity={0.9}
        />
      </Sphere>
      <pointLight
        color={getSkillColor()}
        intensity={1}
        distance={3}
        decay={2}
      />
    </group>
  );
};

const PowerUp = ({ position, type, onCollect, index }) => {
  const ref = useRef();
  const baseY = position[1];
  const floatAmplitude = 0.3;
  const floatSpeed = 1.5;
  const rotationSpeed = 3;

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const time = clock.getElapsedTime();
    ref.current.position.y = baseY + Math.sin(time * floatSpeed) * floatAmplitude;
    ref.current.rotation.y += 0.03 * rotationSpeed;
    ref.current.rotation.x = Math.sin(time * floatSpeed * 0.5) * 0.2;
  });

  const getPowerUpConfig = () => {
    switch (type) {
      case 'speedBoost':
        return {
          color: '#EF4444', // Red
          emissiveIntensity: 0.8,
          scale: [0.5, 0.5, 1],
          geometry: 'diamond'
        };
      case 'skillMagnet':
        return {
          color: '#10B981', // Green
          emissiveIntensity: 0.6,
          scale: [0.6, 0.6, 0.6],
          geometry: 'sphere'
        };
      case 'timeSlower':
        return {
          color: '#3B82F6', // Blue
          emissiveIntensity: 0.7,
          scale: [0.7, 0.4, 0.4],
          geometry: 'hourglass'
        };
      default:
        return {
          color: '#60A5FA',
          emissiveIntensity: 0.5,
          scale: [0.5, 0.5, 0.5],
          geometry: 'box'
        };
    }
  };

  const config = getPowerUpConfig();

  return (
    <group ref={ref} position={position}>
      <Box args={[1, 1, 1]} scale={config.scale}>
        <meshStandardMaterial
          color={config.color}
          emissive={config.color}
          emissiveIntensity={config.emissiveIntensity}
          roughness={0.2}
          metalness={0.8}
          transparent
          opacity={0.9}
        />
      </Box>
      <pointLight
        color={config.color}
        intensity={1.5}
        distance={4}
        decay={2}
      />
    </group>
  );
};

const generateCollectibles = (playerPosition, currentPhase) => {
  const skillPoints = [];
  const powerUps = [];
  const z = playerPosition[2];

  // Generate skill points based on phase
  const skillCount = {
    'learning': 5,
    'intermediate': 7,
    'advanced': 9,
    'expert': 11,
    'master': 13,
    'legendary': 15
  }[currentPhase] || 5;

  for (let i = 0; i < skillCount; i++) {
    const lane = Math.floor(Math.random() * 5) - 2;
    skillPoints.push({
      position: [lane, 1, z - 10 - i * 5],
      type: lane <= -1 ? 'ece' : lane >= 1 ? 'ai' : 'software'
    });
  }

  // Generate power-ups based on phase
  const powerUpChance = {
    'learning': 0.2,
    'intermediate': 0.25,
    'advanced': 0.3,
    'expert': 0.35,
    'master': 0.4,
    'legendary': 0.45
  }[currentPhase] || 0.2;

  if (Math.random() < powerUpChance) {
    const types = ['speedBoost', 'skillMagnet', 'timeSlower'];
    powerUps.push({
      position: [
        Math.floor(Math.random() * 5) - 2,
        1,
        z - 20 - Math.random() * 10
      ],
      type: types[Math.floor(Math.random() * types.length)]
    });
  }

  return { skillPoints, powerUps };
};

const Collectibles = ({ gameSpeed = 1, playerPosition = [0, 1, 0], onCollect }) => {
  const collectiblesRef = useRef({
    skillPoints: [],
    powerUps: [],
    lastGenerated: 0,
    initialized: false
  });

  // Initialize collectibles when component mounts or player position changes
  useEffect(() => {
    if (!collectiblesRef.current.initialized) {
      const { skillPoints, powerUps } = generateCollectibles(playerPosition, 'learning');
      collectiblesRef.current = {
        skillPoints,
        powerUps,
        lastGenerated: playerPosition[2],
        initialized: true
      };
    }
  }, [playerPosition]); // Include playerPosition in dependencies

  // Handle player movement and collectible generation
  useFrame(() => {
    // Generate new collectibles when player moves forward
    if (playerPosition[2] < collectiblesRef.current.lastGenerated - 30) {
      const { skillPoints, powerUps } = generateCollectibles(playerPosition, 'learning');
      collectiblesRef.current = {
        skillPoints: [...collectiblesRef.current.skillPoints, ...skillPoints],
        powerUps: [...collectiblesRef.current.powerUps, ...powerUps],
        lastGenerated: playerPosition[2],
        initialized: true
      };
    }

    // Remove collectibles that are too far behind
    collectiblesRef.current.skillPoints = collectiblesRef.current.skillPoints.filter(
      point => point.position[2] > playerPosition[2] - 50
    );
    collectiblesRef.current.powerUps = collectiblesRef.current.powerUps.filter(
      powerUp => powerUp.position[2] > playerPosition[2] - 50
    );

    // Check collisions
    collectiblesRef.current.skillPoints.forEach((point, index) => {
      if (checkCollisions(playerPosition, point.position, 1.5)) {
        onCollect('skill', point.type);
        collectiblesRef.current.skillPoints.splice(index, 1);
      }
    });

    collectiblesRef.current.powerUps.forEach((powerUp, index) => {
      if (checkCollisions(playerPosition, powerUp.position, 2)) {
        onCollect('powerUp', powerUp.type);
        collectiblesRef.current.powerUps.splice(index, 1);
      }
    });
  });

  const checkCollisions = (position, itemPosition, radius = 1) => {
    const dx = position[0] - itemPosition[0];
    const dy = position[1] - itemPosition[1];
    const dz = position[2] - itemPosition[2];
    return Math.sqrt(dx * dx + dy * dy + dz * dz) < radius;
  };

  return (
    <group>
      {collectiblesRef.current.skillPoints.map((point, index) => (
        <SkillPoint
          key={`skill-${index}`}
          {...point}
          onCollect={onCollect}
          index={index}
        />
      ))}
      {collectiblesRef.current.powerUps.map((powerUp, index) => (
        <PowerUp
          key={`powerUp-${index}`}
          {...powerUp}
          onCollect={onCollect}
          index={index}
        />
      ))}
    </group>
  );
};

export default Collectibles;
