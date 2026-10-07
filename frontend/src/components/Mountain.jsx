import { useRef, useMemo } from 'react'
import * as THREE from 'three'

export default function Mountain({ position, scale, color = '#6b7280' }) {
  const meshRef = useRef()

  const geometry = useMemo(() => {
    const geo = new THREE.ConeGeometry(1, 1, 6, 1)

    // Randomize vertices for more natural look
    const positionAttribute = geo.getAttribute('position')
    for (let i = 0; i < positionAttribute.count; i++) {
      if (i < positionAttribute.count - 1) { // Don't move the peak
        const x = positionAttribute.getX(i)
        const y = positionAttribute.getY(i)
        const z = positionAttribute.getZ(i)

        // Add slight randomness
        positionAttribute.setXYZ(
          i,
          x + (Math.random() - 0.5) * 0.2,
          y,
          z + (Math.random() - 0.5) * 0.2
        )
      }
    }

    geo.computeVertexNormals()
    return geo
  }, [])

  return (
    <group position={position} scale={scale}>
      <mesh ref={meshRef} geometry={geometry} castShadow receiveShadow>
        <meshStandardMaterial
          color={color}
          roughness={0.95}
          metalness={0}
          flatShading
        />
      </mesh>

      {/* Snow cap on peak */}
      <mesh position={[0, 0.7, 0]} castShadow>
        <coneGeometry args={[0.4, 0.3, 6]} />
        <meshStandardMaterial
          color="#f0f8ff"
          roughness={0.3}
          metalness={0.1}
          flatShading
        />
      </mesh>
    </group>
  )
}
