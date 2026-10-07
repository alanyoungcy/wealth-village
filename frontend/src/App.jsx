import { Suspense, useState, useRef } from 'react'
import { Canvas } from '@react-three/fiber'
import WealthScene from './components/WealthScene'
import DashboardUI from './components/DashboardUI'
import BuildingDashboard from './components/BuildingDashboard'
import './App.css'

function App() {
  const [season, setSeason] = useState('summer')
  const [focusedBuilding, setFocusedBuilding] = useState(null)
  const cameraRef = useRef()

  const handleBuildingFocus = (position, label, dataType) => {
    setFocusedBuilding({ position, label, dataType })
  }

  const handleCloseDashboard = () => {
    setFocusedBuilding(null)
  }

  return (
    <div style={{ width: '100vw', height: '100vh', position: 'relative', overflow: 'hidden' }}>
      {/* 3D Canvas - Enhanced village world */}
      <Canvas
        camera={{ position: [50, 35, 50], fov: 50 }}
        style={{ background: '#87CEEB' }}
        shadows
        gl={{
          antialias: true,
          alpha: false,
          powerPreference: 'high-performance'
        }}
      >
        <Suspense fallback={null}>
          <WealthScene season={season} onBuildingFocus={handleBuildingFocus} />
        </Suspense>
      </Canvas>

      {/* Season Toggle Button */}
      <button
        onClick={() => setSeason(s => s === 'summer' ? 'autumn' : 'summer')}
        style={{
          position: 'absolute',
          top: '20px',
          right: '20px',
          padding: '15px 30px',
          fontSize: '16px',
          fontWeight: 'bold',
          backgroundColor: season === 'summer' ? '#10b981' : '#f59e0b',
          color: 'white',
          border: 'none',
          borderRadius: '12px',
          cursor: 'pointer',
          boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
          zIndex: 1000,
          transition: 'all 0.3s ease',
          textTransform: 'uppercase',
          letterSpacing: '1px'
        }}
        onMouseEnter={(e) => {
          e.target.style.transform = 'scale(1.05)'
        }}
        onMouseLeave={(e) => {
          e.target.style.transform = 'scale(1)'
        }}
      >
        {season === 'summer' ? '🌞 Summer' : '🍂 Autumn'}
      </button>

      {/* Dashboard UI Overlay - Main panels */}
      {!focusedBuilding && <DashboardUI />}

      {/* Focused Building Dashboard */}
      {focusedBuilding && (
        <BuildingDashboard
          building={focusedBuilding}
          onClose={handleCloseDashboard}
        />
      )}

      {/* Navigation Instructions */}
      <div style={{
        position: 'absolute',
        bottom: '20px',
        left: '20px',
        backgroundColor: 'rgba(0,0,0,0.8)',
        color: 'white',
        padding: '15px 20px',
        borderRadius: '12px',
        fontSize: '14px',
        zIndex: 1000,
        backdropFilter: 'blur(10px)',
        border: '2px solid rgba(255,255,255,0.1)'
      }}>
        <div style={{ marginBottom: '8px', fontSize: '16px', fontWeight: 'bold' }}>
          🎮 Controls
        </div>
        <div>• <strong>Left Click + Drag</strong>: Rotate camera</div>
        <div>• <strong>Right Click + Drag</strong>: Pan around</div>
        <div>• <strong>Scroll Wheel</strong>: Zoom in/out</div>
        <div>• <strong>Click Buildings</strong>: View detailed info</div>
        <div style={{ marginTop: '8px', color: '#10b981' }}>
          ✨ Explore the village and discover all services!
        </div>
      </div>

      {/* Info badge */}
      <div style={{
        position: 'absolute',
        top: '20px',
        left: '20px',
        backgroundColor: 'rgba(0,0,0,0.8)',
        color: 'white',
        padding: '12px 20px',
        borderRadius: '12px',
        fontSize: '14px',
        zIndex: 1000,
        backdropFilter: 'blur(10px)',
        border: '2px solid rgba(255,215,0,0.3)'
      }}>
        <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#ffd700' }}>
          🏰 Virtual Wealth Village
        </div>
        <div style={{ fontSize: '12px', color: '#d1d5db', marginTop: '4px' }}>
          6 Walking Villagers • 14 Animals • 140+ Trees
        </div>
      </div>
    </div>
  )
}

export default App


