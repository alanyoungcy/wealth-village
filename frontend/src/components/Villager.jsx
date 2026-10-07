import { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { Text } from '@react-three/drei'
import * as THREE from 'three'

export default function Villager({ position, color, name, role }) {
  const groupRef = useRef()
  const bodyRef = useRef()
  const leftLegRef = useRef()
  const rightLegRef = useRef()
  const leftArmRef = useRef()
  const rightArmRef = useRef()

  const [walkTime, setWalkTime] = useState(Math.random() * 10)

  // Generate a patrol path through the village
  const [path] = useState(() => {
    // Create a path that goes around the village center
    const points = []
    const numPoints = 8
    const radius = 15 + Math.random() * 10

    for (let i = 0; i < numPoints; i++) {
      const angle = (i / numPoints) * Math.PI * 2
      const x = Math.cos(angle) * radius + (Math.random() - 0.5) * 5
      const z = Math.sin(angle) * radius + (Math.random() - 0.5) * 5
      points.push([x, 0.3, z])
    }

    return points
  })

  useFrame((state, delta) => {
    if (!groupRef.current) return

    setWalkTime((t) => t + delta * 2)

    // Walking animation
    if (leftLegRef.current && rightLegRef.current) {
      leftLegRef.current.rotation.x = Math.sin(walkTime * 3) * 0.5
      rightLegRef.current.rotation.x = Math.sin(walkTime * 3 + Math.PI) * 0.5
    }

    if (leftArmRef.current && rightArmRef.current) {
      leftArmRef.current.rotation.x = Math.sin(walkTime * 3 + Math.PI) * 0.3
      rightArmRef.current.rotation.x = Math.sin(walkTime * 3) * 0.3
    }

    // Body bob
    if (bodyRef.current) {
      bodyRef.current.position.y = Math.abs(Math.sin(walkTime * 3)) * 0.08
    }

    // Move along path
    const speed = 0.15
    const pathProgress = (state.clock.elapsedTime * speed) % path.length
    const currentIndex = Math.floor(pathProgress)
    const nextIndex = (currentIndex + 1) % path.length
    const segmentProgress = pathProgress - currentIndex

    const current = new THREE.Vector3(...path[currentIndex])
    const next = new THREE.Vector3(...path[nextIndex])
    const targetPos = new THREE.Vector3().lerpVectors(current, next, segmentProgress)

    groupRef.current.position.lerp(targetPos, 0.1)

    // Face direction
    const direction = new THREE.Vector3().subVectors(next, current)
    if (direction.length() > 0.01) {
      const angle = Math.atan2(direction.x, direction.z)
      groupRef.current.rotation.y = angle
    }
  })

  return (
    <group ref={groupRef} position={position}>
      <group ref={bodyRef}>
        {/* Head */}
        <mesh position={[0, 1.6, 0]} castShadow receiveShadow>
          <sphereGeometry args={[0.22, 16, 16]} />
          <meshStandardMaterial
            color="#ffdbac"
            roughness={0.9}
            metalness={0}
          />
        </mesh>

        {/* Hair */}
        <mesh position={[0, 1.78, 0]} castShadow>
          <sphereGeometry args={[0.2, 12, 12, 0, Math.PI * 2, 0, Math.PI / 2]} />
          <meshStandardMaterial
            color="#3d2817"
            roughness={1}
            metalness={0}
          />
        </mesh>

        {/* Eyes */}
        <mesh position={[0.12, 1.65, 0.18]} castShadow>
          <sphereGeometry args={[0.03, 8, 8]} />
          <meshStandardMaterial color="#000000" />
        </mesh>
        <mesh position={[-0.12, 1.65, 0.18]} castShadow>
          <sphereGeometry args={[0.03, 8, 8]} />
          <meshStandardMaterial color="#000000" />
        </mesh>

        {/* Torso - colorful jacket */}
        <mesh position={[0, 1.0, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.5, 0.7, 0.3]} />
          <meshStandardMaterial
            color={color}
            roughness={0.8}
            metalness={0}
          />
        </mesh>

        {/* Belt */}
        <mesh position={[0, 0.7, 0]} castShadow>
          <boxGeometry args={[0.52, 0.08, 0.32]} />
          <meshStandardMaterial color="#654321" roughness={0.9} />
        </mesh>

        {/* Arms */}
        <group ref={leftArmRef} position={[-0.3, 1.2, 0]}>
          <mesh position={[0, -0.25, 0]} castShadow receiveShadow>
            <cylinderGeometry args={[0.07, 0.07, 0.5, 12]} />
            <meshStandardMaterial color={color} roughness={0.8} />
          </mesh>
          <mesh position={[0, -0.52, 0]} castShadow>
            <sphereGeometry args={[0.08, 10, 10]} />
            <meshStandardMaterial color="#ffdbac" roughness={0.9} />
          </mesh>
        </group>

        <group ref={rightArmRef} position={[0.3, 1.2, 0]}>
          <mesh position={[0, -0.25, 0]} castShadow receiveShadow>
            <cylinderGeometry args={[0.07, 0.07, 0.5, 12]} />
            <meshStandardMaterial color={color} roughness={0.8} />
          </mesh>
          <mesh position={[0, -0.52, 0]} castShadow>
            <sphereGeometry args={[0.08, 10, 10]} />
            <meshStandardMaterial color="#ffdbac" roughness={0.9} />
          </mesh>
        </group>
      </group>

      {/* Legs */}
      <group ref={leftLegRef} position={[-0.13, 0.6, 0]}>
        <mesh position={[0, -0.3, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[0.09, 0.09, 0.6, 12]} />
          <meshStandardMaterial color="#2c3e50" roughness={0.9} />
        </mesh>
        <mesh position={[0, -0.62, 0.05]} castShadow>
          <boxGeometry args={[0.13, 0.08, 0.2]} />
          <meshStandardMaterial color="#1a1a1a" roughness={0.8} />
        </mesh>
      </group>

      <group ref={rightLegRef} position={[0.13, 0.6, 0]}>
        <mesh position={[0, -0.3, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[0.09, 0.09, 0.6, 12]} />
          <meshStandardMaterial color="#2c3e50" roughness={0.9} />
        </mesh>
        <mesh position={[0, -0.62, 0.05]} castShadow>
          <boxGeometry args={[0.13, 0.08, 0.2]} />
          <meshStandardMaterial color="#1a1a1a" roughness={0.8} />
        </mesh>
      </group>

      {/* Name label */}
      <Text
        position={[0, 2.2, 0]}
        fontSize={0.25}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.05}
        outlineColor="#000000"
      >
        {name}
      </Text>

      {/* Role badge */}
      <Text
        position={[0, 1.95, 0]}
        fontSize={0.15}
        color="#ffd700"
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.03}
        outlineColor="#000000"
      >
        {role}
      </Text>
    </group>
  )
}
