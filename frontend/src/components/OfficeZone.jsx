import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Text } from '@react-three/drei'
import * as THREE from 'three'

export default function OfficeZone({ position, color, label, rotation }) {
  const groupRef = useRef()
  const glowRef = useRef()

  useFrame((state) => {
    if (glowRef.current) {
      // Pulsing glow effect
      const pulse = Math.sin(state.clock.elapsedTime * 2) * 0.2 + 0.8
      glowRef.current.material.emissiveIntensity = pulse * 0.3
    }
  })

  return (
    <group ref={groupRef} position={position} rotation={rotation}>
      {/* Office Platform */}
      <mesh position={[0, 0.1, 0]} receiveShadow castShadow>
        <boxGeometry args={[8, 0.2, 6]} />
        <meshStandardMaterial
          color={color}
          metalness={0.3}
          roughness={0.7}
          emissive={color}
          emissiveIntensity={0.1}
        />
      </mesh>

      {/* Desk */}
      <mesh position={[0, 0.9, -1]} castShadow>
        <boxGeometry args={[3, 0.1, 1.5]} />
        <meshStandardMaterial color="#8b4513" metalness={0.2} roughness={0.8} />
      </mesh>

      {/* Desk Legs */}
      <mesh position={[-1.3, 0.5, -1.5]} castShadow>
        <boxGeometry args={[0.1, 0.8, 0.1]} />
        <meshStandardMaterial color="#654321" />
      </mesh>
      <mesh position={[1.3, 0.5, -1.5]} castShadow>
        <boxGeometry args={[0.1, 0.8, 0.1]} />
        <meshStandardMaterial color="#654321" />
      </mesh>
      <mesh position={[-1.3, 0.5, -0.5]} castShadow>
        <boxGeometry args={[0.1, 0.8, 0.1]} />
        <meshStandardMaterial color="#654321" />
      </mesh>
      <mesh position={[1.3, 0.5, -0.5]} castShadow>
        <boxGeometry args={[0.1, 0.8, 0.1]} />
        <meshStandardMaterial color="#654321" />
      </mesh>

      {/* Monitor/Screen */}
      <mesh position={[0, 1.5, -1]} castShadow>
        <boxGeometry args={[1.8, 1.2, 0.1]} />
        <meshStandardMaterial
          color="#1a1a1a"
          emissive={color}
          emissiveIntensity={0.5}
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>

      {/* Chair */}
      <group position={[0, 0.7, 0.5]}>
        <mesh castShadow>
          <boxGeometry args={[0.8, 0.1, 0.8]} />
          <meshStandardMaterial color="#2c3e50" />
        </mesh>
        <mesh position={[0, 0.4, -0.3]} castShadow>
          <boxGeometry args={[0.8, 0.8, 0.1]} />
          <meshStandardMaterial color="#2c3e50" />
        </mesh>
      </group>

      {/* Filing Cabinet */}
      <mesh position={[-2.5, 0.6, -1]} castShadow>
        <boxGeometry args={[0.8, 1.2, 0.6]} />
        <meshStandardMaterial color="#34495e" metalness={0.6} roughness={0.4} />
      </mesh>

      {/* Plant */}
      <group position={[2.5, 0.2, -1]}>
        <mesh castShadow>
          <cylinderGeometry args={[0.2, 0.25, 0.4, 16]} />
          <meshStandardMaterial color="#8b4513" />
        </mesh>
        <mesh position={[0, 0.5, 0]} castShadow>
          <sphereGeometry args={[0.3, 8, 8]} />
          <meshStandardMaterial color="#27ae60" />
        </mesh>
      </group>

      {/* Glowing border */}
      <mesh ref={glowRef} position={[0, 0.21, 0]}>
        <boxGeometry args={[8.2, 0.05, 6.2]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.3}
          transparent
          opacity={0.6}
        />
      </mesh>

      {/* Zone Label */}
      <Text
        position={[0, 2.5, -2]}
        fontSize={0.6}
        color="white"
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.05}
        outlineColor="#000000"
        fontWeight="bold"
      >
        {label}
      </Text>

      {/* Wall backdrop */}
      <mesh position={[0, 1.5, -2.9]} castShadow>
        <boxGeometry args={[7, 3, 0.2]} />
        <meshStandardMaterial
          color="#2c3e50"
          metalness={0.1}
          roughness={0.9}
        />
      </mesh>
    </group>
  )
}
