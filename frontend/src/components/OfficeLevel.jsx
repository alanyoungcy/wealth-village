import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Text } from '@react-three/drei'
import * as THREE from 'three'

export default function OfficeLevel({ position, color, label, level, isLarge = false }) {
  const groupRef = useRef()
  const labelRef = useRef()

  const width = isLarge ? 16 : 12
  const depth = isLarge ? 10 : 8

  useFrame((state) => {
    // Slight floating animation for the label
    if (labelRef.current) {
      labelRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1
    }
  })

  return (
    <group ref={groupRef} position={position}>
      {/* Main Floor Platform - Gray tiles like reference */}
      <mesh position={[0, 0, 0]} receiveShadow castShadow>
        <boxGeometry args={[width, 0.2, depth]} />
        <meshStandardMaterial
          color="#6b7280"
          metalness={0.1}
          roughness={0.9}
        />
      </mesh>

      {/* Tile grid pattern on floor */}
      {Array.from({ length: Math.floor(width / 2) }).map((_, x) =>
        Array.from({ length: Math.floor(depth / 2) }).map((_, z) => (
          <mesh
            key={`tile-${x}-${z}`}
            position={[
              -width / 2 + x * 2 + 1,
              0.11,
              -depth / 2 + z * 2 + 1
            ]}
            receiveShadow
          >
            <boxGeometry args={[1.9, 0.02, 1.9]} />
            <meshStandardMaterial
              color="#9ca3af"
              metalness={0}
              roughness={1}
            />
          </mesh>
        ))
      )}

      {/* Beige desks - matching reference style */}
      <group position={[-width / 4, 0.1, -depth / 3]}>
        <mesh position={[0, 0.4, 0]} castShadow>
          <boxGeometry args={[3, 0.1, 1.5]} />
          <meshStandardMaterial color="#d4a574" metalness={0} roughness={0.8} />
        </mesh>
        {/* Desk legs */}
        {[[-1.4, -0.7], [1.4, -0.7], [-1.4, 0.7], [1.4, 0.7]].map((pos, i) => (
          <mesh key={i} position={[pos[0], 0.2, pos[1]]} castShadow>
            <boxGeometry args={[0.1, 0.4, 0.1]} />
            <meshStandardMaterial color="#b8935f" />
          </mesh>
        ))}
        {/* Monitor */}
        <mesh position={[0, 0.8, -0.3]} castShadow>
          <boxGeometry args={[0.8, 0.6, 0.05]} />
          <meshStandardMaterial
            color="#1a1a1a"
            emissive="#4ade80"
            emissiveIntensity={0.3}
          />
        </mesh>
      </group>

      {/* Another desk */}
      <group position={[width / 4, 0.1, -depth / 3]}>
        <mesh position={[0, 0.4, 0]} castShadow>
          <boxGeometry args={[3, 0.1, 1.5]} />
          <meshStandardMaterial color="#d4a574" metalness={0} roughness={0.8} />
        </mesh>
        {[[-1.4, -0.7], [1.4, -0.7], [-1.4, 0.7], [1.4, 0.7]].map((pos, i) => (
          <mesh key={i} position={[pos[0], 0.2, pos[1]]} castShadow>
            <boxGeometry args={[0.1, 0.4, 0.1]} />
            <meshStandardMaterial color="#b8935f" />
          </mesh>
        ))}
        <mesh position={[0, 0.8, -0.3]} castShadow>
          <boxGeometry args={[0.8, 0.6, 0.05]} />
          <meshStandardMaterial
            color="#1a1a1a"
            emissive="#60a5fa"
            emissiveIntensity={0.3}
          />
        </mesh>
      </group>

      {/* Orange sofa - matching reference */}
      <group position={[0, 0.1, depth / 3]}>
        {/* Sofa base */}
        <mesh position={[0, 0.3, 0]} castShadow>
          <boxGeometry args={[3, 0.4, 1.2]} />
          <meshStandardMaterial color="#f97316" metalness={0} roughness={0.7} />
        </mesh>
        {/* Sofa back */}
        <mesh position={[0, 0.7, -0.5]} castShadow>
          <boxGeometry args={[3, 0.6, 0.2]} />
          <meshStandardMaterial color="#ea580c" metalness={0} roughness={0.7} />
        </mesh>
        {/* Armrests */}
        <mesh position={[-1.5, 0.5, 0]} castShadow>
          <boxGeometry args={[0.2, 0.6, 1.2]} />
          <meshStandardMaterial color="#ea580c" metalness={0} roughness={0.7} />
        </mesh>
        <mesh position={[1.5, 0.5, 0]} castShadow>
          <boxGeometry args={[0.2, 0.6, 1.2]} />
          <meshStandardMaterial color="#ea580c" metalness={0} roughness={0.7} />
        </mesh>
      </group>

      {/* Plants in yellow pots - matching reference */}
      <group position={[-width / 2 + 1, 0.1, depth / 2 - 1]}>
        <mesh position={[0, 0.2, 0]} castShadow>
          <cylinderGeometry args={[0.25, 0.3, 0.4, 16]} />
          <meshStandardMaterial color="#fbbf24" metalness={0} roughness={0.8} />
        </mesh>
        <mesh position={[0, 0.6, 0]} castShadow>
          <coneGeometry args={[0.3, 0.8, 8]} />
          <meshStandardMaterial color="#84cc16" metalness={0} roughness={0.9} />
        </mesh>
      </group>

      <group position={[width / 2 - 1, 0.1, depth / 2 - 1]}>
        <mesh position={[0, 0.2, 0]} castShadow>
          <cylinderGeometry args={[0.25, 0.3, 0.4, 16]} />
          <meshStandardMaterial color="#fbbf24" metalness={0} roughness={0.8} />
        </mesh>
        <mesh position={[0, 0.6, 0]} castShadow>
          <coneGeometry args={[0.3, 0.8, 8]} />
          <meshStandardMaterial color="#84cc16" metalness={0} roughness={0.9} />
        </mesh>
      </group>

      {/* Department Label - Floating 3D sign like reference */}
      <group ref={labelRef} position={[width / 2 + 1.5, 2, 0]} rotation={[0, -Math.PI / 4, 0]}>
        {/* Sign board */}
        <mesh castShadow>
          <boxGeometry args={[3, 0.8, 0.1]} />
          <meshStandardMaterial color="#374151" metalness={0.2} roughness={0.7} />
        </mesh>
        {/* Sign text */}
        <Text
          position={[0, 0, 0.06]}
          fontSize={0.35}
          color="white"
          anchorX="center"
          anchorY="middle"
          fontWeight="bold"
        >
          {label}
        </Text>
      </group>

      {/* Simple chairs - matching reference style */}
      {[-1.5, 0, 1.5].map((xOffset, i) => (
        <group key={i} position={[xOffset, 0.1, -depth / 3 + 1.2]}>
          <mesh position={[0, 0.25, 0]} castShadow>
            <boxGeometry args={[0.5, 0.1, 0.5]} />
            <meshStandardMaterial color="#f97316" metalness={0} roughness={0.8} />
          </mesh>
          <mesh position={[0, 0.5, -0.2]} castShadow>
            <boxGeometry args={[0.5, 0.4, 0.1]} />
            <meshStandardMaterial color="#ea580c" metalness={0} roughness={0.8} />
          </mesh>
        </group>
      ))}
    </group>
  )
}
