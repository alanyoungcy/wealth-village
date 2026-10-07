import { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { Text } from '@react-three/drei'
import * as THREE from 'three'

export default function WealthAgent({ position, color, name, zone, level }) {
  const groupRef = useRef()
  const bodyRef = useRef()
  const leftLegRef = useRef()
  const rightLegRef = useRef()
  const leftArmRef = useRef()
  const rightArmRef = useRef()

  const [walkTime, setWalkTime] = useState(0)

  // Simplified paths - just patrol the level with occasional stair use
  const paths = {
    portfolio: [
      [-8, 8.3, 1], [-6, 8.3, 1], [-4, 8.3, 1],
      [-4, 8.3, -1], [-6, 8.3, -1], [-8, 8.3, -1],
      [-8, 8.3, 0], [-6, 8.3, 0],
    ],
    research: [
      [8, 4.3, 2], [10, 4.3, 2], [12, 4.3, 1],
      [12, 4.3, -1], [10, 4.3, -1], [8, 4.3, -1],
      [6, 4.3, 0], [8, 4.3, 0],
    ],
    tax: [
      [-8, 0.3, 1], [-6, 0.3, 1], [-4, 0.3, 1],
      [-4, 0.3, -1], [-6, 0.3, -1], [-8, 0.3, -1],
      [-8, 0.3, 0], [-6, 0.3, 0],
    ]
  }

  const zonePath = paths[zone] || paths.portfolio

  useFrame((state, delta) => {
    if (!groupRef.current) return

    setWalkTime((t) => t + delta * 2)

    // Animate legs - simplified
    if (leftLegRef.current && rightLegRef.current) {
      leftLegRef.current.rotation.x = Math.sin(walkTime * 3) * 0.4
      rightLegRef.current.rotation.x = Math.sin(walkTime * 3 + Math.PI) * 0.4
    }

    // Animate arms - slight swing
    if (leftArmRef.current && rightArmRef.current) {
      leftArmRef.current.rotation.x = Math.sin(walkTime * 3 + Math.PI) * 0.25
      rightArmRef.current.rotation.x = Math.sin(walkTime * 3) * 0.25
    }

    // Subtle body bob
    if (bodyRef.current) {
      bodyRef.current.position.y = Math.abs(Math.sin(walkTime * 3)) * 0.08
    }

    // Move along path
    const speed = 0.2
    const pathIndex = Math.floor((state.clock.elapsedTime * speed) % zonePath.length)
    const nextIndex = (pathIndex + 1) % zonePath.length
    const progress = ((state.clock.elapsedTime * speed) % 1)

    const current = new THREE.Vector3(...zonePath[pathIndex])
    const next = new THREE.Vector3(...zonePath[nextIndex])
    const targetPos = new THREE.Vector3().lerpVectors(current, next, progress)

    groupRef.current.position.lerp(targetPos, 0.1)

    // Face direction of movement
    const direction = new THREE.Vector3().subVectors(next, current)
    if (direction.length() > 0.01) {
      const angle = Math.atan2(direction.x, direction.z)
      groupRef.current.rotation.y = angle
    }
  })

  return (
    <group ref={groupRef} position={position}>
      <group ref={bodyRef}>
        {/* Head - simple sphere with skin tone */}
        <mesh position={[0, 1.6, 0]} castShadow>
          <sphereGeometry args={[0.2, 16, 16]} />
          <meshStandardMaterial
            color="#ffdbac"
            metalness={0}
            roughness={0.9}
          />
        </mesh>

        {/* Hair - simple cap */}
        <mesh position={[0, 1.75, 0]} castShadow>
          <sphereGeometry args={[0.18, 16, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
          <meshStandardMaterial
            color="#3d2817"
            metalness={0}
            roughness={1}
          />
        </mesh>

        {/* Torso - colorful jacket */}
        <mesh position={[0, 1.0, 0]} castShadow>
          <boxGeometry args={[0.5, 0.7, 0.3]} />
          <meshStandardMaterial
            color={color}
            metalness={0}
            roughness={0.8}
          />
        </mesh>

        {/* Arms - simple cylinders */}
        <group ref={leftArmRef} position={[-0.3, 1.2, 0]}>
          <mesh position={[0, -0.25, 0]} castShadow>
            <cylinderGeometry args={[0.06, 0.06, 0.5, 8]} />
            <meshStandardMaterial
              color={color}
              metalness={0}
              roughness={0.8}
            />
          </mesh>
          {/* Hand */}
          <mesh position={[0, -0.5, 0]} castShadow>
            <sphereGeometry args={[0.07, 8, 8]} />
            <meshStandardMaterial color="#ffdbac" metalness={0} roughness={0.9} />
          </mesh>
        </group>

        <group ref={rightArmRef} position={[0.3, 1.2, 0]}>
          <mesh position={[0, -0.25, 0]} castShadow>
            <cylinderGeometry args={[0.06, 0.06, 0.5, 8]} />
            <meshStandardMaterial
              color={color}
              metalness={0}
              roughness={0.8}
            />
          </mesh>
          {/* Hand */}
          <mesh position={[0, -0.5, 0]} castShadow>
            <sphereGeometry args={[0.07, 8, 8]} />
            <meshStandardMaterial color="#ffdbac" metalness={0} roughness={0.9} />
          </mesh>
        </group>
      </group>

      {/* Legs - simple cylinders for pants */}
      <group ref={leftLegRef} position={[-0.12, 0.6, 0]}>
        <mesh position={[0, -0.3, 0]} castShadow>
          <cylinderGeometry args={[0.08, 0.08, 0.6, 8]} />
          <meshStandardMaterial
            color="#2c3e50"
            metalness={0}
            roughness={0.9}
          />
        </mesh>
        {/* Shoe */}
        <mesh position={[0, -0.6, 0.05]} castShadow>
          <boxGeometry args={[0.12, 0.08, 0.18]} />
          <meshStandardMaterial color="#1a1a1a" metalness={0} roughness={0.8} />
        </mesh>
      </group>

      <group ref={rightLegRef} position={[0.12, 0.6, 0]}>
        <mesh position={[0, -0.3, 0]} castShadow>
          <cylinderGeometry args={[0.08, 0.08, 0.6, 8]} />
          <meshStandardMaterial
            color="#2c3e50"
            metalness={0}
            roughness={0.9}
          />
        </mesh>
        {/* Shoe */}
        <mesh position={[0, -0.6, 0.05]} castShadow>
          <boxGeometry args={[0.12, 0.08, 0.18]} />
          <meshStandardMaterial color="#1a1a1a" metalness={0} roughness={0.8} />
        </mesh>
      </group>

      {/* Name label - subtle */}
      <Text
        position={[0, 2.1, 0]}
        fontSize={0.2}
        color="#374151"
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.01}
        outlineColor="#ffffff"
      >
        {name}
      </Text>
    </group>
  )
}

