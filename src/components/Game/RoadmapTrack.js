import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Box, Text } from '@react-three/drei';
import * as THREE from 'three';

const TrackSegment = ({ position, color, label }) => {
  return (
    <group position={position}>
      {/* Track base */}
      <Box args={[2, 0.1, 10]} position={[0, -0.05, 0]}>
        <meshStandardMaterial color={color} metalness={0.6} roughness={0.2} />
      </Box>
      
      {/* Track borders */}
      <Box args={[0.1, 0.2, 10]} position={[-1, 0.05, 0]}>
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.5} />
      </Box>
      <Box args={[0.1, 0.2, 10]} position={[1, 0.05, 0]}>
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.5} />
      </Box>

      {/* Path label */}
      <Text
        position={[0, 0.5, 0]}
        fontSize={0.5}
        color={color}
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.02}
        outlineColor="#000000"
      >
        {label}
      </Text>
    </group>
  );
};

const RoadmapTrack = ({ playerPosition }) => {
  const trackRef = useRef();
  const trackSegments = [
    { color: '#3B82F6', label: 'Full Stack' },  // Blue
    { color: '#8B5CF6', label: 'AI/ML' },       // Purple
    { color: '#10B981', label: 'ECE' }          // Green
  ];

  useFrame(({ clock }) => {
    if (!trackRef.current) return;
    
    // Move track segments
    const segments = trackRef.current.children;
    segments.forEach((segment, index) => {
      segment.position.z += 0.2; // Move forward
      if (segment.position.z > 20) {
        segment.position.z -= 60; // Reset position
      }
    });

    // Add subtle floating animation to labels
    const time = clock.getElapsedTime();
    segments.forEach((segment, index) => {
      const label = segment.children[3]; // Text mesh
      if (label) {
        label.position.y = 0.5 + Math.sin(time * 2 + index) * 0.1;
      }
    });
  });

  return (
    <group ref={trackRef}>
      {/* Generate track segments for each path */}
      {Array.from({ length: 6 }).map((_, i) => (
        <group key={i} position={[0, 0, i * -10]}>
          {trackSegments.map((track, j) => (
            <TrackSegment
              key={`${i}-${j}`}
              position={[(j - 1) * 4, 0, 0]}
              color={track.color}
              label={track.label}
            />
          ))}
        </group>
      ))}

      {/* Add decorative elements */}
      {Array.from({ length: 20 }).map((_, i) => (
        <group key={`decor-${i}`}>
          {/* Floating skill orbs */}
          <mesh position={[
            (Math.random() - 0.5) * 12,
            1 + Math.sin(i) * 0.5,
            -i * 3
          ]}>
            <sphereGeometry args={[0.2, 16, 16]} />
            <meshStandardMaterial
              color={trackSegments[i % 3].color}
              emissive={trackSegments[i % 3].color}
              emissiveIntensity={0.5}
            />
          </mesh>

          {/* Light beams */}
          <pointLight
            position={[
              (Math.random() - 0.5) * 12,
              2,
              -i * 3
            ]}
            color={trackSegments[i % 3].color}
            intensity={0.5}
            distance={5}
          />
        </group>
      ))}
    </group>
  );
};

export default RoadmapTrack;
