import { useRef } from 'react'
import * as THREE from 'three'

export default function Tree({ position, type = 'deciduous', season = 'summer', scale = 1 }) {
  const groupRef = useRef()

  // Color based on season
  const foliageColors = {
    summer: {
      deciduous: '#2d8b3e',
      pine: '#1e5c2e'
    },
    autumn: {
      deciduous: ['#f4a460', '#daa520', '#cd853f', '#ffd700', '#ff8c00'],
      pine: '#1e5c2e' // Pine stays green
    }
  }

  // Get color for this tree
  const getColor = () => {
    const colorSet = foliageColors[season][type]
    if (Array.isArray(colorSet)) {
      return colorSet[Math.floor(Math.random() * colorSet.length)]
    }
    return colorSet
  }

  const foliageColor = getColor()

  if (type === 'pine') {
    return (
      <group ref={groupRef} position={position} scale={scale}>
        {/* Trunk */}
        <mesh position={[0, 2, 0]} castShadow>
          <cylinderGeometry args={[0.3, 0.4, 4, 8]} />
          <meshStandardMaterial
            color="#654321"
            roughness={0.95}
            metalness={0}
            flatShading
          />
        </mesh>

        {/* Pine foliage - stacked cones */}
        <mesh position={[0, 5, 0]} castShadow>
          <coneGeometry args={[2, 3, 6]} />
          <meshStandardMaterial
            color={foliageColor}
            roughness={0.9}
            metalness={0}
            flatShading
          />
        </mesh>
        <mesh position={[0, 6.5, 0]} castShadow>
          <coneGeometry args={[1.6, 2.5, 6]} />
          <meshStandardMaterial
            color={foliageColor}
            roughness={0.9}
            metalness={0}
            flatShading
          />
        </mesh>
        <mesh position={[0, 7.8, 0]} castShadow>
          <coneGeometry args={[1.2, 2, 6]} />
          <meshStandardMaterial
            color={foliageColor}
            roughness={0.9}
            metalness={0}
            flatShading
          />
        </mesh>
      </group>
    )
  }

  // Deciduous tree
  return (
    <group ref={groupRef} position={position} scale={scale}>
      {/* Trunk */}
      <mesh position={[0, 2, 0]} castShadow>
        <cylinderGeometry args={[0.3, 0.5, 4, 8]} />
        <meshStandardMaterial
          color="#654321"
          roughness={0.95}
          metalness={0}
          flatShading
        />
      </mesh>

      {/* Foliage - low poly sphere */}
      <mesh position={[0, 5, 0]} castShadow>
        <dodecahedronGeometry args={[2.5, 0]} />
        <meshStandardMaterial
          color={foliageColor}
          roughness={0.9}
          metalness={0}
          flatShading
        />
      </mesh>

      {/* Additional foliage clusters for bushier look */}
      <mesh position={[-0.8, 5.5, 0.5]} castShadow>
        <dodecahedronGeometry args={[1.5, 0]} />
        <meshStandardMaterial
          color={foliageColor}
          roughness={0.9}
          metalness={0}
          flatShading
        />
      </mesh>
      <mesh position={[0.8, 5.3, -0.5]} castShadow>
        <dodecahedronGeometry args={[1.3, 0]} />
        <meshStandardMaterial
          color={foliageColor}
          roughness={0.9}
          metalness={0}
          flatShading
        />
      </mesh>
    </group>
  )
}
