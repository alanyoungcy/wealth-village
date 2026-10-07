import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export default function Water({ position, size = [40, 30] }) {
  const waterRef = useRef()
  const meshRef = useRef()

  // Create organic lake shape using custom geometry
  const lakeGeometry = useMemo(() => {
    const shape = new THREE.Shape()

    // Create organic, irregular lake shape
    const points = []
    const numPoints = 32
    const baseRadius = size[0] / 2

    for (let i = 0; i < numPoints; i++) {
      const angle = (i / numPoints) * Math.PI * 2
      // Vary radius for organic shape
      const radiusVariation = 1 + Math.sin(angle * 3) * 0.15 + Math.cos(angle * 5) * 0.1
      const noise = (Math.sin(angle * 7) * 0.08 + Math.cos(angle * 11) * 0.06)
      const radius = baseRadius * radiusVariation + baseRadius * noise

      const x = Math.cos(angle) * radius
      const y = Math.sin(angle) * radius * (size[1] / size[0]) // Elongate slightly

      if (i === 0) {
        shape.moveTo(x, y)
      } else {
        // Use bezier curves for smooth organic edges
        const prevAngle = ((i - 1) / numPoints) * Math.PI * 2
        const prevRadiusVar = 1 + Math.sin(prevAngle * 3) * 0.15 + Math.cos(prevAngle * 5) * 0.1
        const prevRadius = baseRadius * prevRadiusVar
        const prevX = Math.cos(prevAngle) * prevRadius
        const prevY = Math.sin(prevAngle) * prevRadius * (size[1] / size[0])

        const cp1x = prevX + (x - prevX) * 0.5 + (Math.random() - 0.5) * 2
        const cp1y = prevY + (y - prevY) * 0.5 + (Math.random() - 0.5) * 2

        shape.bezierCurveTo(cp1x, cp1y, x, y, x, y)
      }

      points.push(new THREE.Vector2(x, y))
    }

    shape.closePath()

    // Extrude to create 3D geometry with subdivisions for waves
    const geometry = new THREE.ShapeGeometry(shape, 64)

    return { geometry, points }
  }, [size])

  useFrame((state, delta) => {
    if (waterRef.current) {
      // Animate water surface with gentle waves
      const positions = waterRef.current.geometry.attributes.position
      const time = state.clock.elapsedTime

      for (let i = 0; i < positions.count; i++) {
        const x = positions.getX(i)
        const y = positions.getY(i)

        // Create wave effect
        const wave1 = Math.sin(x * 0.1 + time * 0.5) * 0.08
        const wave2 = Math.cos(y * 0.15 + time * 0.3) * 0.06
        const wave3 = Math.sin((x + y) * 0.08 + time * 0.4) * 0.04

        positions.setZ(i, wave1 + wave2 + wave3)
      }

      positions.needsUpdate = true
      waterRef.current.geometry.computeVertexNormals()
    }

    if (meshRef.current) {
      // Gentle vertical bobbing
      meshRef.current.position.y = 0.1 + Math.sin(state.clock.elapsedTime * 0.5) * 0.03
    }
  })

  // Generate shoreline rocks based on lake shape
  const shorelineRocks = useMemo(() => {
    const rocks = []
    const numRocks = 35

    for (let i = 0; i < numRocks; i++) {
      const angle = (i / numRocks) * Math.PI * 2
      const radiusVariation = 1 + Math.sin(angle * 3) * 0.15 + Math.cos(angle * 5) * 0.1
      const noise = (Math.sin(angle * 7) * 0.08 + Math.cos(angle * 11) * 0.06)
      const radius = (size[0] / 2) * radiusVariation + (size[0] / 2) * noise

      // Place rocks slightly outside the water edge
      const rockRadius = radius + 1 + Math.random() * 2.5
      const x = Math.cos(angle) * rockRadius
      const z = Math.sin(angle) * rockRadius * (size[1] / size[0])
      const rockSize = 0.4 + Math.random() * 0.9

      rocks.push({ x, z, size: rockSize })
    }

    return rocks
  }, [size])

  // Generate lily pads randomly within lake
  const lilyPads = useMemo(() => {
    const pads = []
    const numPads = 18

    for (let i = 0; i < numPads; i++) {
      const angle = Math.random() * Math.PI * 2
      const distance = Math.random() * (size[0] / 2 - 5)
      const x = Math.cos(angle) * distance
      const z = Math.sin(angle) * distance * (size[1] / size[0])
      const padSize = 0.25 + Math.random() * 0.25
      const rotation = Math.random() * Math.PI

      pads.push({ x, z, size: padSize, rotation })
    }

    return pads
  }, [size])

  return (
    <group position={position} ref={meshRef}>
      {/* Organic shaped water surface */}
      <mesh
        ref={waterRef}
        rotation={[-Math.PI / 2, 0, 0]}
        receiveShadow
      >
        <primitive object={lakeGeometry.geometry} attach="geometry" />
        <meshStandardMaterial
          color="#4fc3f7"
          roughness={0.05}
          metalness={0.85}
          transparent
          opacity={0.95}
          envMapIntensity={1.5}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Caustics effect - lighter patches */}
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, 0.15, 0]}
        receiveShadow
      >
        <primitive object={lakeGeometry.geometry} attach="geometry" />
        <meshBasicMaterial
          color="#a8e6ff"
          transparent
          opacity={0.12}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Shoreline rocks - organic placement */}
      {shorelineRocks.map((rock, i) => (
        <mesh
          key={`rock-${i}`}
          position={[rock.x, 0.3, rock.z]}
          castShadow
          receiveShadow
        >
          <dodecahedronGeometry args={[rock.size, 0]} />
          <meshStandardMaterial
            color="#d3d3d3"
            roughness={0.95}
            metalness={0}
            flatShading
          />
        </mesh>
      ))}

      {/* Additional smaller rocks near water edge */}
      {shorelineRocks.slice(0, 20).map((rock, i) => {
        const innerRadius = 0.85
        return (
          <mesh
            key={`inner-rock-${i}`}
            position={[rock.x * innerRadius, 0.15, rock.z * innerRadius]}
            castShadow
            receiveShadow
          >
            <dodecahedronGeometry args={[rock.size * 0.6, 0]} />
            <meshStandardMaterial
              color="#c0c0c0"
              roughness={0.95}
              metalness={0}
              flatShading
            />
          </mesh>
        )
      })}

      {/* Wooden dock - positioned at a nice inlet */}
      <group position={[0, 0.3, -size[1] / 2 + 5]}>
        {/* Dock planks */}
        {Array.from({ length: 10 }).map((_, i) => (
          <mesh
            key={i}
            position={[0, 0, i * 1.2]}
            castShadow
            receiveShadow
          >
            <boxGeometry args={[4.5, 0.25, 1]} />
            <meshStandardMaterial
              color="#8b7355"
              roughness={0.85}
              metalness={0}
            />
          </mesh>
        ))}

        {/* Dock posts */}
        {[[-2, 0], [2, 0], [-2, 7], [2, 7]].map((pos, i) => (
          <mesh key={i} position={[pos[0], -0.6, pos[1]]} castShadow>
            <cylinderGeometry args={[0.18, 0.18, 1.2, 12]} />
            <meshStandardMaterial color="#654321" roughness={0.95} />
          </mesh>
        ))}

        {/* Dock railings */}
        <mesh position={[-2.2, 0.5, 3.5]} castShadow>
          <boxGeometry args={[0.1, 0.6, 8]} />
          <meshStandardMaterial color="#654321" roughness={0.9} />
        </mesh>
        <mesh position={[2.2, 0.5, 3.5]} castShadow>
          <boxGeometry args={[0.1, 0.6, 8]} />
          <meshStandardMaterial color="#654321" roughness={0.9} />
        </mesh>
      </group>

      {/* Enhanced boats positioned naturally */}
      <group position={[-12, 0.35, 5]} rotation={[0, Math.PI / 4, 0]}>
        {/* Hull */}
        <mesh castShadow>
          <boxGeometry args={[3.5, 0.6, 1.8]} />
          <meshStandardMaterial color="#8b4513" roughness={0.85} metalness={0.1} />
        </mesh>
        {/* Deck */}
        <mesh position={[0, 0.5, 0]} castShadow>
          <boxGeometry args={[3.2, 0.15, 1.6]} />
          <meshStandardMaterial color="#dc143c" roughness={0.75} />
        </mesh>
        {/* Mast */}
        <mesh position={[0, 2, 0]} castShadow>
          <cylinderGeometry args={[0.08, 0.08, 3, 8]} />
          <meshStandardMaterial color="#8b7355" roughness={0.9} />
        </mesh>
        {/* Sail */}
        <mesh position={[0, 2.5, 0.3]} castShadow>
          <boxGeometry args={[1.5, 2, 0.05]} />
          <meshStandardMaterial color="#f0f0f0" roughness={0.8} side={THREE.DoubleSide} />
        </mesh>
      </group>

      <group position={[14, 0.35, -6]} rotation={[0, -Math.PI / 5, 0]}>
        {/* Hull */}
        <mesh castShadow>
          <boxGeometry args={[3, 0.5, 1.5]} />
          <meshStandardMaterial color="#8b4513" roughness={0.85} metalness={0.1} />
        </mesh>
        {/* Deck */}
        <mesh position={[0, 0.4, 0]} castShadow>
          <boxGeometry args={[2.8, 0.15, 1.3]} />
          <meshStandardMaterial color="#4169e1" roughness={0.75} />
        </mesh>
        {/* Cabin */}
        <mesh position={[-0.5, 0.8, 0]} castShadow>
          <boxGeometry args={[1, 0.6, 1]} />
          <meshStandardMaterial color="#8b7355" roughness={0.9} />
        </mesh>
        <mesh position={[-0.5, 1.3, 0]} castShadow>
          <coneGeometry args={[0.6, 0.4, 4]} />
          <meshStandardMaterial color="#dc143c" roughness={0.8} flatShading />
        </mesh>
      </group>

      {/* Small fishing boat */}
      <group position={[-6, 0.25, -10]} rotation={[0, Math.PI / 6, 0]}>
        <mesh castShadow>
          <boxGeometry args={[2, 0.4, 1]} />
          <meshStandardMaterial color="#8b4513" roughness={0.9} />
        </mesh>
        <mesh position={[0, 0.3, 0]} castShadow>
          <boxGeometry args={[1.8, 0.1, 0.8]} />
          <meshStandardMaterial color="#654321" roughness={0.85} />
        </mesh>
      </group>

      {/* Lily pads scattered naturally */}
      {lilyPads.map((pad, i) => (
        <mesh
          key={`lily-${i}`}
          position={[pad.x, 0.22, pad.z]}
          rotation={[-Math.PI / 2, 0, pad.rotation]}
          receiveShadow
        >
          <circleGeometry args={[pad.size, 8]} />
          <meshStandardMaterial
            color="#2d5016"
            roughness={0.9}
            metalness={0}
            side={THREE.DoubleSide}
          />
        </mesh>
      ))}

      {/* Small reeds/grass near shore */}
      {shorelineRocks.slice(0, 15).map((rock, i) => {
        const angle = (i / 15) * Math.PI * 2
        const reeds = []
        for (let j = 0; j < 3; j++) {
          const offsetX = rock.x * 0.92 + (Math.random() - 0.5) * 0.5
          const offsetZ = rock.z * 0.92 + (Math.random() - 0.5) * 0.5
          reeds.push(
            <mesh
              key={`reed-${i}-${j}`}
              position={[offsetX, 0.3, offsetZ]}
              castShadow
            >
              <cylinderGeometry args={[0.02, 0.03, 0.6, 6]} />
              <meshStandardMaterial color="#3d5016" roughness={0.9} />
            </mesh>
          )
        }
        return reeds
      })}
    </group>
  )
}


