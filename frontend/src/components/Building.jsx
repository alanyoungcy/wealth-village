import { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { Text, Html } from '@react-three/drei'
import * as THREE from 'three'

export default function Building({ position, type = 'house', label, roofColor = '#dc143c', scale = 1, onFocus, dataType }) {
  const groupRef = useRef()
  const [hovered, setHovered] = useState(false)
  const [glowIntensity, setGlowIntensity] = useState(0)

  useFrame((state) => {
    if (hovered) {
      setGlowIntensity(Math.min(glowIntensity + 0.05, 0.5))
    } else {
      setGlowIntensity(Math.max(glowIntensity - 0.05, 0))
    }
  })

  // Building dimensions based on type
  const sizes = {
    bank: { width: 8, height: 6, depth: 6 },
    shop: { width: 6, height: 5, depth: 5 },
    house: { width: 5, height: 4, depth: 4 },
    cottage: { width: 4, height: 3.5, depth: 3.5 },
    stall: { width: 3, height: 2.5, depth: 2 }
  }

  const size = sizes[type] || sizes.house

  const handleClick = () => {
    if (onFocus && dataType) {
      onFocus(position, label, dataType)
    }
  }

  return (
    <group ref={groupRef} position={position} scale={scale}>
      {/* Click hitbox */}
      <mesh
        position={[0, size.height / 2, 0]}
        onClick={handleClick}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        visible={false}
      >
        <boxGeometry args={[size.width + 1, size.height + 1, size.depth + 1]} />
      </mesh>

      {/* Glow effect when hovered */}
      {glowIntensity > 0 && (
        <pointLight
          position={[0, size.height / 2, 0]}
          intensity={glowIntensity * 3}
          distance={size.width * 2}
          color={roofColor}
        />
      )}

      {/* Main building - wooden planks */}
      <mesh
        position={[0, size.height / 2, 0]}
        castShadow
        receiveShadow
        onClick={handleClick}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <boxGeometry args={[size.width, size.height, size.depth]} />
        <meshStandardMaterial
          color={hovered ? "#a08060" : "#8b7355"}
          roughness={0.9}
          metalness={0}
          emissive={hovered ? roofColor : "#000000"}
          emissiveIntensity={hovered ? 0.2 : 0}
        />
      </mesh>

      {/* Roof - low poly peaked roof */}
      <mesh position={[0, size.height + 1, 0]} castShadow>
        <coneGeometry args={[size.width * 0.75, 2.5, 4]} />
        <meshStandardMaterial
          color={roofColor}
          roughness={0.8}
          metalness={0}
          flatShading
          emissive={hovered ? roofColor : "#000000"}
          emissiveIntensity={hovered ? 0.3 : 0}
        />
      </mesh>

      {/* Door */}
      <mesh position={[0, size.height / 3, size.depth / 2 + 0.05]} castShadow>
        <boxGeometry args={[1.2, 2.2, 0.15]} />
        <meshStandardMaterial color="#654321" roughness={0.95} />
      </mesh>

      {/* Door handle */}
      <mesh position={[0.4, size.height / 3, size.depth / 2 + 0.13]} castShadow>
        <sphereGeometry args={[0.05, 8, 8]} />
        <meshStandardMaterial color="#d4af37" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Windows */}
      {type !== 'stall' && (
        <>
          <mesh position={[-size.width / 3, size.height / 1.5, size.depth / 2 + 0.05]} castShadow>
            <boxGeometry args={[0.9, 0.9, 0.08]} />
            <meshStandardMaterial
              color="#4a90e2"
              roughness={0.05}
              metalness={0.9}
              emissive="#ffeb3b"
              emissiveIntensity={0.2}
            />
          </mesh>
          <mesh position={[size.width / 3, size.height / 1.5, size.depth / 2 + 0.05]} castShadow>
            <boxGeometry args={[0.9, 0.9, 0.08]} />
            <meshStandardMaterial
              color="#4a90e2"
              roughness={0.05}
              metalness={0.9}
              emissive="#ffeb3b"
              emissiveIntensity={0.2}
            />
          </mesh>

          {/* Window frames */}
          <mesh position={[-size.width / 3, size.height / 1.5, size.depth / 2 + 0.06]}>
            <boxGeometry args={[0.95, 0.05, 0.05]} />
            <meshStandardMaterial color="#654321" />
          </mesh>
          <mesh position={[-size.width / 3, size.height / 1.5, size.depth / 2 + 0.06]}>
            <boxGeometry args={[0.05, 0.95, 0.05]} />
            <meshStandardMaterial color="#654321" />
          </mesh>
        </>
      )}

      {/* Label for important buildings */}
      {label && (
        <Text
          position={[0, size.height + 3.8, 0]}
          fontSize={0.9}
          color="#ffffff"
          anchorX="center"
          anchorY="middle"
          outlineWidth={0.12}
          outlineColor="#000000"
          fontWeight="bold"
        >
          {label}
        </Text>
      )}

      {/* Hover prompt */}
      {hovered && label && (
        <Html position={[0, size.height + 3, 0]} center>
          <div style={{
            background: 'rgba(0,0,0,0.8)',
            color: 'white',
            padding: '8px 16px',
            borderRadius: '8px',
            fontSize: '14px',
            whiteSpace: 'nowrap',
            pointerEvents: 'none',
            border: '2px solid ' + roofColor
          }}>
            Click to view {label}
          </div>
        </Html>
      )}

      {/* Decorative elements */}
      {type === 'bank' && (
        <>
          {/* Bank columns */}
          <mesh position={[-size.width / 3, size.height / 2, size.depth / 2 + 0.15]} castShadow>
            <cylinderGeometry args={[0.35, 0.35, size.height, 12]} />
            <meshStandardMaterial color="#d4af37" metalness={0.8} roughness={0.3} />
          </mesh>
          <mesh position={[size.width / 3, size.height / 2, size.depth / 2 + 0.15]} castShadow>
            <cylinderGeometry args={[0.35, 0.35, size.height, 12]} />
            <meshStandardMaterial color="#d4af37" metalness={0.8} roughness={0.3} />
          </mesh>

          {/* Bank sign */}
          <mesh position={[0, size.height / 4, size.depth / 2 + 0.08]} castShadow>
            <boxGeometry args={[2, 0.6, 0.1]} />
            <meshStandardMaterial color="#d4af37" metalness={0.7} roughness={0.3} />
          </mesh>
        </>
      )}

      {/* Market stall awning */}
      {type === 'stall' && (
        <>
          <mesh position={[0, size.height + 0.4, size.depth / 4]} castShadow>
            <boxGeometry args={[size.width * 1.3, 0.12, size.depth * 0.9]} />
            <meshStandardMaterial
              color={roofColor}
              roughness={0.7}
              metalness={0}
            />
          </mesh>
          {/* Support poles */}
          {[[-size.width * 0.5, 0], [size.width * 0.5, 0]].map((pos, i) => (
            <mesh key={i} position={[pos[0], size.height / 2, size.depth / 2]} castShadow>
              <cylinderGeometry args={[0.08, 0.08, size.height, 8]} />
              <meshStandardMaterial color="#654321" roughness={0.95} />
            </mesh>
          ))}
        </>
      )}

      {/* Chimney for houses */}
      {(type === 'house' || type === 'cottage') && (
        <group>
          <mesh position={[size.width / 3, size.height + 2.2, -size.depth / 4]} castShadow>
            <boxGeometry args={[0.7, 1.8, 0.7]} />
            <meshStandardMaterial color="#696969" roughness={0.95} />
          </mesh>
          {/* Chimney cap */}
          <mesh position={[size.width / 3, size.height + 3.2, -size.depth / 4]} castShadow>
            <boxGeometry args={[0.85, 0.15, 0.85]} />
            <meshStandardMaterial color="#595959" roughness={0.9} />
          </mesh>
          {/* Smoke particles when hovered */}
          {hovered && (
            <mesh position={[size.width / 3, size.height + 3.5, -size.depth / 4]}>
              <sphereGeometry args={[0.2, 8, 8]} />
              <meshBasicMaterial color="#d3d3d3" transparent opacity={0.3} />
            </mesh>
          )}
        </group>
      )}

      {/* Flower boxes for shops */}
      {type === 'shop' && (
        <>
          <mesh position={[-size.width / 3, size.height / 1.8, size.depth / 2 + 0.15]} castShadow>
            <boxGeometry args={[0.8, 0.2, 0.2]} />
            <meshStandardMaterial color="#8b4513" roughness={0.9} />
          </mesh>
          <mesh position={[-size.width / 3, size.height / 1.6, size.depth / 2 + 0.15]} castShadow>
            <sphereGeometry args={[0.1, 6, 6]} />
            <meshStandardMaterial color="#ff69b4" roughness={0.8} />
          </mesh>
          <mesh position={[-size.width / 3 + 0.3, size.height / 1.65, size.depth / 2 + 0.15]} castShadow>
            <sphereGeometry args={[0.08, 6, 6]} />
            <meshStandardMaterial color="#ff1493" roughness={0.8} />
          </mesh>
        </>
      )}

      {/* Foundation */}
      <mesh position={[0, 0.1, 0]} receiveShadow>
        <boxGeometry args={[size.width + 0.5, 0.2, size.depth + 0.5]} />
        <meshStandardMaterial color="#696969" roughness={0.95} />
      </mesh>
    </group>
  )
}

