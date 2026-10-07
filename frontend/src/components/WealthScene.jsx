import { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { OrbitControls, Sky } from '@react-three/drei'
import { EffectComposer, Bloom, SSAO } from '@react-three/postprocessing'
import Building from './Building'
import Tree from './Tree'
import Mountain from './Mountain'
import Water from './Water'
import Animal from './Animal'
import Villager from './Villager'
import * as THREE from 'three'

export default function WealthScene({ season = 'summer', onBuildingFocus }) {
  const [currentSeason, setCurrentSeason] = useState(season)

  // Color palettes for seasons
  const colors = {
    summer: {
      grass: '#5cb85c',
      trees: '#2d8b3e',
      sky: '#87CEEB'
    },
    autumn: {
      grass: '#8b9c5e',
      trees: ['#f4a460', '#daa520', '#cd853f', '#ffd700'],
      sky: '#b0c4de'
    }
  }

  const palette = colors[currentSeason]

  return (
    <>
      {/* Enhanced Sky */}
      <Sky
        distance={450000}
        sunPosition={[100, 20, 100]}
        inclination={0.6}
        azimuth={0.25}
      />
      <fog attach="fog" args={[palette.sky, 60, 220]} />

      {/* Enhanced Lighting */}
      <ambientLight intensity={0.7} />
      <directionalLight
        position={[60, 60, 60]}
        intensity={1.2}
        castShadow
        shadow-mapSize-width={4096}
        shadow-mapSize-height={4096}
        shadow-camera-far={250}
        shadow-camera-left={-120}
        shadow-camera-right={120}
        shadow-camera-top={120}
        shadow-camera-bottom={-120}
        shadow-bias={-0.0001}
      />

      {/* Fill lights for better illumination */}
      <directionalLight position={[-40, 30, -40]} intensity={0.5} color="#b0c4de" />
      <pointLight position={[0, 20, 0]} intensity={0.8} distance={100} decay={2} />

      {/* Terrain - Enhanced with vertex displacement */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[300, 300, 80, 80]} />
        <meshStandardMaterial
          color={palette.grass}
          roughness={0.95}
          metalness={0}
        />
      </mesh>

      {/* Water/Lake - Enhanced */}
      <Water position={[0, 0.1, 40]} size={[65, 45]} />

      {/* Mountains - Enhanced background */}
      <Mountain position={[-90, 0, -60]} scale={[35, 45, 35]} color="#6b7280" />
      <Mountain position={[-65, 0, -70]} scale={[28, 38, 28]} color="#7b8390" />
      <Mountain position={[-35, 0, -65]} scale={[22, 32, 22]} color="#8b93a0" />

      <Mountain position={[90, 0, -60]} scale={[35, 45, 35]} color="#6b7280" />
      <Mountain position={[65, 0, -70]} scale={[28, 38, 28]} color="#7b8390" />
      <Mountain position={[35, 0, -65]} scale={[22, 32, 22]} color="#8b93a0" />

      {/* Financial Buildings - All clickable */}
      <Building
        position={[0, 0, -10]}
        type="bank"
        label="WEALTH BANK"
        roofColor="#dc143c"
        dataType="portfolio"
        onFocus={onBuildingFocus}
      />

      <Building
        position={[-18, 0, -15]}
        type="shop"
        label="TRADING POST"
        roofColor="#4169e1"
        dataType="research"
        onFocus={onBuildingFocus}
      />

      <Building
        position={[18, 0, -15]}
        type="shop"
        label="TREASURY"
        roofColor="#ffd700"
        dataType="portfolio"
        onFocus={onBuildingFocus}
      />

      <Building
        position={[-23, 0, 5]}
        type="house"
        label="TAX OFFICE"
        roofColor="#ff6347"
        dataType="tax"
        onFocus={onBuildingFocus}
      />

      <Building
        position={[23, 0, 5]}
        type="house"
        label="INVESTMENTS"
        roofColor="#32cd32"
        dataType="portfolio"
        onFocus={onBuildingFocus}
      />

      <Building
        position={[-15, 0, 20]}
        type="house"
        label="RISK MGMT"
        roofColor="#ff4500"
        dataType="risk"
        onFocus={onBuildingFocus}
      />

      {/* Village cottages */}
      <Building position={[-35, 0, -8]} type="cottage" roofColor="#cd5c5c" />
      <Building position={[-40, 0, -22]} type="cottage" roofColor="#4682b4" />
      <Building position={[35, 0, -8]} type="cottage" roofColor="#9370db" />
      <Building position={[40, 0, -22]} type="cottage" roofColor="#20b2aa" />
      <Building position={[-30, 0, 15]} type="cottage" roofColor="#daa520" />
      <Building position={[30, 0, 15]} type="cottage" roofColor="#ff69b4" />

      {/* Market stalls */}
      <Building position={[-10, 0, 2]} type="stall" roofColor="#ff69b4" scale={0.7} />
      <Building position={[10, 0, 2]} type="stall" roofColor="#00ced1" scale={0.7} />
      <Building position={[-5, 0, -3]} type="stall" roofColor="#9370db" scale={0.6} />
      <Building position={[5, 0, -3]} type="stall" roofColor="#ffa500" scale={0.6} />

      {/* Dense forests with improved distribution */}
      {/* Left forest cluster */}
      {Array.from({ length: 50 }).map((_, i) => {
        const angle = (i / 50) * Math.PI * 2
        const radius = 18 + Math.random() * 25
        const x = -55 + Math.cos(angle) * radius
        const z = -25 + Math.sin(angle) * radius
        const treeType = Math.random() > 0.55 ? 'pine' : 'deciduous'

        return (
          <Tree
            key={`left-${i}`}
            position={[x, 0, z]}
            type={treeType}
            season={currentSeason}
            scale={0.7 + Math.random() * 0.6}
          />
        )
      })}

      {/* Right forest cluster */}
      {Array.from({ length: 50 }).map((_, i) => {
        const angle = (i / 50) * Math.PI * 2
        const radius = 18 + Math.random() * 25
        const x = 55 + Math.cos(angle) * radius
        const z = -25 + Math.sin(angle) * radius
        const treeType = Math.random() > 0.55 ? 'pine' : 'deciduous'

        return (
          <Tree
            key={`right-${i}`}
            position={[x, 0, z]}
            type={treeType}
            season={currentSeason}
            scale={0.7 + Math.random() * 0.6}
          />
        )
      })}

      {/* Scattered trees around village */}
      {Array.from({ length: 40 }).map((_, i) => {
        const x = (Math.random() - 0.5) * 100
        const z = (Math.random() - 0.5) * 80

        // Skip trees too close to buildings and water
        if (Math.abs(x) < 30 && Math.abs(z) < 25) return null
        if (Math.abs(z - 40) < 25 && Math.abs(x) < 35) return null

        const treeType = Math.random() > 0.5 ? 'pine' : 'deciduous'

        return (
          <Tree
            key={`scattered-${i}`}
            position={[x, 0, z]}
            type={treeType}
            season={currentSeason}
            scale={0.5 + Math.random() * 0.8}
          />
        )
      })}

      {/* Walking Villagers - Financial team */}
      <Villager
        position={[5, 0, -5]}
        color="#dc143c"
        name="Sarah Chen"
        role="Portfolio Manager"
      />

      <Villager
        position={[-8, 0, -8]}
        color="#4169e1"
        name="Michael Brown"
        role="Analyst"
      />

      <Villager
        position={[12, 0, 3]}
        color="#32cd32"
        name="Emily Davis"
        role="Investment Advisor"
      />

      <Villager
        position={[-10, 0, 8]}
        color="#ff6347"
        name="David Wilson"
        role="Tax Specialist"
      />

      <Villager
        position={[0, 0, -15]}
        color="#9370db"
        name="Lisa Anderson"
        role="Risk Manager"
      />

      <Villager
        position={[15, 0, -10]}
        color="#ffd700"
        name="James Lee"
        role="Wealth Consultant"
      />

      {/* Walking animals - Enhanced herd */}
      <Animal type="cow" position={[30, 0, 18]} />
      <Animal type="cow" position={[33, 0, 21]} />
      <Animal type="cow" position={[28, 0, 23]} />
      <Animal type="cow" position={[35, 0, 19]} />

      <Animal type="sheep" position={[-30, 0, 18]} />
      <Animal type="sheep" position={[-33, 0, 20]} />
      <Animal type="sheep" position={[-28, 0, 22]} />
      <Animal type="sheep" position={[-32, 0, 16]} />

      <Animal type="chicken" position={[-12, 0, 12]} />
      <Animal type="chicken" position={[-10, 0, 14]} />
      <Animal type="chicken" position={[-8, 0, 13]} />
      <Animal type="chicken" position={[10, 0, 12]} />
      <Animal type="chicken" position={[12, 0, 14]} />
      <Animal type="chicken" position={[11, 0, 16]} />

      {/* Dirt paths - Enhanced */}
      <mesh position={[0, 0.06, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[60, 4]} />
        <meshStandardMaterial color="#d2b48c" roughness={1} />
      </mesh>

      <mesh position={[0, 0.06, -12]} rotation={[-Math.PI / 2, 0, Math.PI / 2]} receiveShadow>
        <planeGeometry args={[50, 4]} />
        <meshStandardMaterial color="#d2b48c" roughness={1} />
      </mesh>

      <mesh position={[-20, 0.06, 5]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[30, 3.5]} />
        <meshStandardMaterial color="#d2b48c" roughness={1} />
      </mesh>

      <mesh position={[20, 0.06, 5]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[30, 3.5]} />
        <meshStandardMaterial color="#d2b48c" roughness={1} />
      </mesh>

      {/* Decorative elements - Fences */}
      {Array.from({ length: 20 }).map((_, i) => (
        <mesh
          key={`fence-${i}`}
          position={[25 + i * 1.5, 0.6, 15]}
          castShadow
        >
          <boxGeometry args={[0.1, 1.2, 0.1]} />
          <meshStandardMaterial color="#654321" roughness={0.95} />
        </mesh>
      ))}

      {/* Rocks scattered around */}
      {Array.from({ length: 30 }).map((_, i) => {
        const x = (Math.random() - 0.5) * 120
        const z = (Math.random() - 0.5) * 100
        const size = 0.3 + Math.random() * 0.5

        return (
          <mesh
            key={`rock-${i}`}
            position={[x, size / 2, z]}
            castShadow
            receiveShadow
          >
            <dodecahedronGeometry args={[size, 0]} />
            <meshStandardMaterial
              color="#8b8b8b"
              roughness={0.95}
              metalness={0}
              flatShading
            />
          </mesh>
        )
      })}

      {/* Camera Controls */}
      <OrbitControls
        enablePan={true}
        enableZoom={true}
        enableRotate={true}
        minDistance={15}
        maxDistance={140}
        maxPolarAngle={Math.PI / 2.2}
        target={[0, 0, 0]}
        dampingFactor={0.05}
        enableDamping={true}
      />

      {/* Post-processing effects */}
      <EffectComposer>
        <Bloom
          intensity={0.3}
          luminanceThreshold={0.9}
          luminanceSmoothing={0.9}
        />
        <SSAO
          samples={16}
          radius={5}
          intensity={30}
          luminanceInfluence={0.5}
        />
      </EffectComposer>
    </>
  )
}

export { WealthScene }


