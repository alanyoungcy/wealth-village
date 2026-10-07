import { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export default function Animal({ type = 'cow', position }) {
  const groupRef = useRef()
  const [time, setTime] = useState(Math.random() * 100)
  const [walkTime, setWalkTime] = useState(0)

  // Random path for each animal
  const [path] = useState(() => {
    const baseX = position[0]
    const baseZ = position[2]
    const radius = 5 + Math.random() * 8
    return [
      [baseX, 0, baseZ],
      [baseX + radius, 0, baseZ + radius * 0.5],
      [baseX + radius * 0.5, 0, baseZ + radius],
      [baseX - radius * 0.5, 0, baseZ + radius * 0.5],
      [baseX - radius, 0, baseZ - radius * 0.5],
      [baseX, 0, baseZ]
    ]
  })

  const leftLegRef = useRef()
  const rightLegRef = useRef()
  const headRef = useRef()

  useFrame((state, delta) => {
    setTime(t => t + delta)
    setWalkTime(t => t + delta * 2)

    if (groupRef.current) {
      // Walk along path
      const speed = type === 'chicken' ? 0.08 : 0.05
      const pathProgress = (time * speed) % path.length
      const currentIndex = Math.floor(pathProgress)
      const nextIndex = (currentIndex + 1) % path.length
      const segmentProgress = pathProgress - currentIndex

      const current = new THREE.Vector3(...path[currentIndex])
      const next = new THREE.Vector3(...path[nextIndex])
      const targetPos = new THREE.Vector3().lerpVectors(current, next, segmentProgress)

      groupRef.current.position.lerp(targetPos, 0.1)

      // Face direction of movement
      const direction = new THREE.Vector3().subVectors(next, current)
      if (direction.length() > 0.01) {
        const angle = Math.atan2(direction.x, direction.z)
        groupRef.current.rotation.y = angle
      }

      // Walking animation - leg movement
      if (leftLegRef.current && rightLegRef.current) {
        leftLegRef.current.rotation.x = Math.sin(walkTime * 4) * 0.4
        rightLegRef.current.rotation.x = Math.sin(walkTime * 4 + Math.PI) * 0.4
      }

      // Head bob
      if (headRef.current) {
        headRef.current.position.y = Math.abs(Math.sin(walkTime * 4)) * 0.05
      }
    }
  })

  if (type === 'cow') {
    return (
      <group ref={groupRef} position={position}>
        {/* Body */}
        <mesh position={[0, 0.8, 0]} castShadow receiveShadow>
          <boxGeometry args={[1.5, 0.8, 0.8]} />
          <meshStandardMaterial
            color="#ffffff"
            roughness={0.9}
            metalness={0}
          />
        </mesh>

        {/* Spots */}
        <mesh position={[-0.3, 0.9, 0.3]} castShadow>
          <sphereGeometry args={[0.25, 8, 8]} />
          <meshStandardMaterial color="#000000" roughness={0.9} />
        </mesh>
        <mesh position={[0.4, 0.85, -0.2]} castShadow>
          <sphereGeometry args={[0.18, 8, 8]} />
          <meshStandardMaterial color="#000000" roughness={0.9} />
        </mesh>
        <mesh position={[-0.6, 0.75, -0.1]} castShadow>
          <sphereGeometry args={[0.15, 8, 8]} />
          <meshStandardMaterial color="#000000" roughness={0.9} />
        </mesh>

        {/* Head with bob animation */}
        <group ref={headRef}>
          <mesh position={[0.9, 1, 0]} castShadow receiveShadow>
            <boxGeometry args={[0.5, 0.5, 0.5]} />
            <meshStandardMaterial color="#ffffff" roughness={0.9} />
          </mesh>

          {/* Snout */}
          <mesh position={[1.15, 0.9, 0]} castShadow>
            <boxGeometry args={[0.2, 0.3, 0.4]} />
            <meshStandardMaterial color="#ffc0cb" roughness={0.9} />
          </mesh>

          {/* Ears */}
          <mesh position={[1, 1.3, -0.3]} rotation={[0, 0, -0.3]} castShadow>
            <boxGeometry args={[0.1, 0.35, 0.25]} />
            <meshStandardMaterial color="#ffc0cb" roughness={0.9} />
          </mesh>
          <mesh position={[1, 1.3, 0.3]} rotation={[0, 0, 0.3]} castShadow>
            <boxGeometry args={[0.1, 0.35, 0.25]} />
            <meshStandardMaterial color="#ffc0cb" roughness={0.9} />
          </mesh>

          {/* Horns */}
          <mesh position={[0.95, 1.4, -0.2]} rotation={[0, 0, 0.5]} castShadow>
            <coneGeometry args={[0.05, 0.25, 6]} />
            <meshStandardMaterial color="#d2b48c" roughness={0.8} />
          </mesh>
          <mesh position={[0.95, 1.4, 0.2]} rotation={[0, 0, -0.5]} castShadow>
            <coneGeometry args={[0.05, 0.25, 6]} />
            <meshStandardMaterial color="#d2b48c" roughness={0.8} />
          </mesh>
        </group>

        {/* Legs with walking animation */}
        <group ref={leftLegRef} position={[-0.5, 0.4, -0.3]}>
          <mesh position={[0, -0.2, 0]} castShadow>
            <cylinderGeometry args={[0.12, 0.12, 0.6, 8]} />
            <meshStandardMaterial color="#ffffff" roughness={0.9} />
          </mesh>
          <mesh position={[0, -0.5, 0]} castShadow>
            <cylinderGeometry args={[0.13, 0.1, 0.1, 8]} />
            <meshStandardMaterial color="#2f2f2f" roughness={0.95} />
          </mesh>
        </group>

        <group ref={rightLegRef} position={[0.5, 0.4, -0.3]}>
          <mesh position={[0, -0.2, 0]} castShadow>
            <cylinderGeometry args={[0.12, 0.12, 0.6, 8]} />
            <meshStandardMaterial color="#ffffff" roughness={0.9} />
          </mesh>
          <mesh position={[0, -0.5, 0]} castShadow>
            <cylinderGeometry args={[0.13, 0.1, 0.1, 8]} />
            <meshStandardMaterial color="#2f2f2f" roughness={0.95} />
          </mesh>
        </group>

        {/* Back legs - opposite phase */}
        <group position={[-0.5, 0.4, 0.3]}>
          <mesh position={[0, -0.2, 0]} castShadow>
            <cylinderGeometry args={[0.12, 0.12, 0.6, 8]} />
            <meshStandardMaterial color="#ffffff" roughness={0.9} />
          </mesh>
        </group>

        <group position={[0.5, 0.4, 0.3]}>
          <mesh position={[0, -0.2, 0]} castShadow>
            <cylinderGeometry args={[0.12, 0.12, 0.6, 8]} />
            <meshStandardMaterial color="#ffffff" roughness={0.9} />
          </mesh>
        </group>

        {/* Tail */}
        <mesh position={[-0.8, 0.9, 0]} rotation={[0, 0, 0.5]} castShadow>
          <cylinderGeometry args={[0.04, 0.06, 0.6, 6]} />
          <meshStandardMaterial color="#ffffff" roughness={0.9} />
        </mesh>
        <mesh position={[-1.05, 0.75, 0]} castShadow>
          <sphereGeometry args={[0.08, 6, 6]} />
          <meshStandardMaterial color="#2f2f2f" roughness={0.9} />
        </mesh>
      </group>
    )
  }

  if (type === 'sheep') {
    return (
      <group ref={groupRef} position={position}>
        {/* Fluffy body */}
        <mesh position={[0, 0.7, 0]} castShadow receiveShadow>
          <sphereGeometry args={[0.7, 12, 12]} />
          <meshStandardMaterial
            color="#f5f5f5"
            roughness={1}
            metalness={0}
          />
        </mesh>

        {/* Extra fluff */}
        <mesh position={[-0.3, 0.8, 0]} castShadow>
          <sphereGeometry args={[0.4, 10, 10]} />
          <meshStandardMaterial color="#f0f0f0" roughness={1} />
        </mesh>
        <mesh position={[0.3, 0.75, 0]} castShadow>
          <sphereGeometry args={[0.35, 10, 10]} />
          <meshStandardMaterial color="#f0f0f0" roughness={1} />
        </mesh>

        {/* Head */}
        <group ref={headRef}>
          <mesh position={[0.6, 0.85, 0]} castShadow receiveShadow>
            <sphereGeometry args={[0.3, 10, 10]} />
            <meshStandardMaterial color="#e0e0e0" roughness={0.9} />
          </mesh>

          {/* Ears */}
          <mesh position={[0.7, 1.05, -0.2]} rotation={[0, 0, -0.5]} castShadow>
            <boxGeometry args={[0.08, 0.25, 0.15]} />
            <meshStandardMaterial color="#d0d0d0" roughness={0.9} />
          </mesh>
          <mesh position={[0.7, 1.05, 0.2]} rotation={[0, 0, 0.5]} castShadow>
            <boxGeometry args={[0.08, 0.25, 0.15]} />
            <meshStandardMaterial color="#d0d0d0" roughness={0.9} />
          </mesh>
        </group>

        {/* Legs */}
        <group ref={leftLegRef} position={[-0.3, 0.3, -0.2]}>
          <mesh position={[0, -0.15, 0]} castShadow>
            <cylinderGeometry args={[0.09, 0.09, 0.5, 8]} />
            <meshStandardMaterial color="#2f2f2f" roughness={0.9} />
          </mesh>
        </group>

        <group ref={rightLegRef} position={[0.3, 0.3, -0.2]}>
          <mesh position={[0, -0.15, 0]} castShadow>
            <cylinderGeometry args={[0.09, 0.09, 0.5, 8]} />
            <meshStandardMaterial color="#2f2f2f" roughness={0.9} />
          </mesh>
        </group>

        <group position={[-0.3, 0.3, 0.2]}>
          <mesh position={[0, -0.15, 0]} castShadow>
            <cylinderGeometry args={[0.09, 0.09, 0.5, 8]} />
            <meshStandardMaterial color="#2f2f2f" roughness={0.9} />
          </mesh>
        </group>

        <group position={[0.3, 0.3, 0.2]}>
          <mesh position={[0, -0.15, 0]} castShadow>
            <cylinderGeometry args={[0.09, 0.09, 0.5, 8]} />
            <meshStandardMaterial color="#2f2f2f" roughness={0.9} />
          </mesh>
        </group>
      </group>
    )
  }

  if (type === 'chicken') {
    return (
      <group ref={groupRef} position={position}>
        {/* Body */}
        <mesh position={[0, 0.4, 0]} castShadow receiveShadow>
          <sphereGeometry args={[0.35, 10, 10]} />
          <meshStandardMaterial
            color="#ffffff"
            roughness={0.9}
            metalness={0}
          />
        </mesh>

        {/* Head */}
        <group ref={headRef}>
          <mesh position={[0.3, 0.65, 0]} castShadow receiveShadow>
            <sphereGeometry args={[0.18, 10, 10]} />
            <meshStandardMaterial color="#ffffff" roughness={0.9} />
          </mesh>

          {/* Beak */}
          <mesh position={[0.42, 0.62, 0]} rotation={[0, Math.PI / 2, 0]} castShadow>
            <coneGeometry args={[0.06, 0.18, 4]} />
            <meshStandardMaterial color="#ff8c00" roughness={0.9} />
          </mesh>

          {/* Comb */}
          <mesh position={[0.3, 0.8, 0]} castShadow>
            <boxGeometry args={[0.12, 0.2, 0.06]} />
            <meshStandardMaterial color="#dc143c" roughness={0.9} />
          </mesh>

          {/* Wattle */}
          <mesh position={[0.35, 0.55, 0]} castShadow>
            <sphereGeometry args={[0.06, 6, 6]} />
            <meshStandardMaterial color="#dc143c" roughness={0.9} />
          </mesh>
        </group>

        {/* Wings */}
        <mesh position={[-0.25, 0.45, 0]} rotation={[0, 0, 0.3]} castShadow>
          <boxGeometry args={[0.3, 0.15, 0.4]} />
          <meshStandardMaterial color="#f5f5f5" roughness={0.85} />
        </mesh>
        <mesh position={[0.25, 0.45, 0]} rotation={[0, 0, -0.3]} castShadow>
          <boxGeometry args={[0.3, 0.15, 0.4]} />
          <meshStandardMaterial color="#f5f5f5" roughness={0.85} />
        </mesh>

        {/* Legs */}
        <group ref={leftLegRef} position={[-0.12, 0.2, 0]}>
          <mesh position={[0, -0.1, 0]} castShadow>
            <cylinderGeometry args={[0.035, 0.035, 0.3, 6]} />
            <meshStandardMaterial color="#ff8c00" roughness={0.9} />
          </mesh>
          {/* Feet */}
          <mesh position={[0, -0.25, 0.05]} castShadow>
            <boxGeometry args={[0.08, 0.02, 0.12]} />
            <meshStandardMaterial color="#ff8c00" roughness={0.9} />
          </mesh>
        </group>

        <group ref={rightLegRef} position={[0.12, 0.2, 0]}>
          <mesh position={[0, -0.1, 0]} castShadow>
            <cylinderGeometry args={[0.035, 0.035, 0.3, 6]} />
            <meshStandardMaterial color="#ff8c00" roughness={0.9} />
          </mesh>
          {/* Feet */}
          <mesh position={[0, -0.25, 0.05]} castShadow>
            <boxGeometry args={[0.08, 0.02, 0.12]} />
            <meshStandardMaterial color="#ff8c00" roughness={0.9} />
          </mesh>
        </group>

        {/* Tail feathers */}
        <mesh position={[-0.35, 0.5, 0]} rotation={[0, 0, 0.8]} castShadow>
          <boxGeometry args={[0.25, 0.08, 0.3]} />
          <meshStandardMaterial color="#f0f0f0" roughness={0.85} />
        </mesh>
      </group>
    )
  }

  return null
}

