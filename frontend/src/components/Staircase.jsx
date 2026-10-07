import { useMemo } from 'react'
import * as THREE from 'three'

export default function Staircase({ startPos, endPos }) {
  const stairs = useMemo(() => {
    const [x1, y1, z1] = startPos
    const [x2, y2, z2] = endPos

    const numSteps = 10
    const stepHeight = (y2 - y1) / numSteps
    const stepDepth = 0.5
    const stepWidth = 4 // Wide stairs like reference

    const dx = (x2 - x1) / numSteps
    const dz = (z2 - z1) / numSteps

    return Array.from({ length: numSteps }, (_, i) => ({
      position: [
        x1 + dx * i + dx / 2,
        y1 + stepHeight * i + stepHeight / 2,
        z1 + dz * i + dz / 2
      ],
      rotation: [0, Math.atan2(dx, dz), 0]
    }))
  }, [startPos, endPos])

  return (
    <group>
      {/* Gray steps - matching reference */}
      {stairs.map((step, i) => (
        <mesh
          key={i}
          position={step.position}
          rotation={step.rotation}
          castShadow
          receiveShadow
        >
          <boxGeometry args={[4, 0.2, 0.5]} />
          <meshStandardMaterial
            color="#6b7280"
            metalness={0.1}
            roughness={0.9}
          />
        </mesh>
      ))}

      {/* Tile pattern on steps */}
      {stairs.map((step, i) => (
        <mesh
          key={`tile-${i}`}
          position={[step.position[0], step.position[1] + 0.11, step.position[2]]}
          rotation={step.rotation}
          receiveShadow
        >
          <boxGeometry args={[3.9, 0.02, 0.45]} />
          <meshStandardMaterial
            color="#9ca3af"
            metalness={0}
            roughness={1}
          />
        </mesh>
      ))}

      {/* Simple railings - minimal style like reference */}
      {stairs.map((step, i) => {
        if (i % 2 === 0) { // Every other step for cleaner look
          return (
            <group key={`rail-${i}`}>
              {/* Left railing post */}
              <mesh
                position={[
                  step.position[0] - 1.8 * Math.cos(step.rotation[1]),
                  step.position[1] + 0.4,
                  step.position[2] + 1.8 * Math.sin(step.rotation[1])
                ]}
                castShadow
              >
                <cylinderGeometry args={[0.04, 0.04, 0.8, 8]} />
                <meshStandardMaterial color="#4b5563" metalness={0.3} roughness={0.7} />
              </mesh>

              {/* Right railing post */}
              <mesh
                position={[
                  step.position[0] + 1.8 * Math.cos(step.rotation[1]),
                  step.position[1] + 0.4,
                  step.position[2] - 1.8 * Math.sin(step.rotation[1])
                ]}
                castShadow
              >
                <cylinderGeometry args={[0.04, 0.04, 0.8, 8]} />
                <meshStandardMaterial color="#4b5563" metalness={0.3} roughness={0.7} />
              </mesh>
            </group>
          )
        }
        return null
      })}
    </group>
  )
}
