'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { useState, useCallback, useEffect, useRef } from 'react'
import Terrain from './Terrain'
import Champion3D from './Champion3D'
import Lighting from './Lighting'
import CameraController from './CameraController'
import Minimap3D from './Minimap3D'
import Projectiles from './Projectiles'
import AbilityBar from './AbilityBar'
import { useAbilities, AbilityState, initialAbilityState, Projectile, Chomper } from './AbilitySystem'

const MAP_SIZE = 200 // 3D units (scaled down from 3200)

// Inner component that uses useFrame for ability updates
function AbilityUpdater({
  updateCooldowns,
  updateProjectiles,
  updateChompers,
}: {
  updateCooldowns: (delta: number) => void
  updateProjectiles: (delta: number) => void
  updateChompers: () => void
}) {
  useFrame((_, delta) => {
    updateCooldowns(delta)
    updateProjectiles(delta)
    updateChompers()
  })
  return null
}

export default function Game3D() {
  const [championPosition, setChampionPosition] = useState<[number, number, number]>([
    -MAP_SIZE / 2 + 15, // Start at blue base
    0,
    MAP_SIZE / 2 - 15,
  ])
  const [targetPosition, setTargetPosition] = useState<[number, number, number] | null>(null)
  const [viewport, setViewport] = useState<{ x: number; z: number; width: number; height: number } | undefined>()
  const [championRotation, setChampionRotation] = useState(0)
  const [abilityState, setAbilityState] = useState<AbilityState>(initialAbilityState)
  const [projectiles, setProjectiles] = useState<Projectile[]>([])
  const [chompers, setChompers] = useState<Chomper[]>([])

  // Create ability handlers
  const {
    stateRef,
    projectilesRef,
    chompersRef,
    castQ,
    castW,
    castE,
    castR,
    updateCooldowns,
    updateProjectiles,
    updateChompers,
  } = useAbilities({
    championPosition,
    championRotation,
  })

  // Sync refs to state for UI
  useEffect(() => {
    const interval = setInterval(() => {
      setAbilityState({ ...stateRef.current })
      setProjectiles([...projectilesRef.current])
      setChompers([...chompersRef.current])
    }, 50) // Update UI at 20fps
    return () => clearInterval(interval)
  }, [stateRef, projectilesRef, chompersRef])

  // Keyboard controls for abilities
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase()

      switch (key) {
        case 'q':
          castQ()
          break
        case 'w':
          castW()
          break
        case 'e':
          castE()
          break
        case 'r':
          castR()
          break
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [castQ, castW, castE, castR])

  const handleGroundClick = useCallback((point: [number, number, number]) => {
    setTargetPosition(point)
  }, [])

  const handleChampionReachedTarget = useCallback(() => {
    setTargetPosition(null)
  }, [])

  const handleChampionPositionUpdate = useCallback((pos: [number, number, number]) => {
    setChampionPosition(pos)
  }, [])

  const handleRotationUpdate = useCallback((rotation: number) => {
    setChampionRotation(rotation)
  }, [])

  return (
    <div className="w-full h-full relative">
      <Canvas
        shadows
        camera={{
          position: [0, 150, 100],
          fov: 45,
          near: 1,
          far: 1000,
        }}
        style={{ background: '#1a2a3a' }}
      >
        <Lighting />
        <CameraController championPosition={championPosition} onViewportChange={setViewport} />
        <Terrain mapSize={MAP_SIZE} onGroundClick={handleGroundClick} />
        <Champion3D
          position={championPosition}
          targetPosition={targetPosition}
          onPositionUpdate={handleChampionPositionUpdate}
          onReachedTarget={handleChampionReachedTarget}
          onRotationUpdate={handleRotationUpdate}
          usingRockets={abilityState.usingRockets}
          health={abilityState.health}
          maxHealth={abilityState.maxHealth}
        />
        <Projectiles projectiles={projectiles} chompers={chompers} />
        {targetPosition && (
          <mesh position={targetPosition} rotation={[-Math.PI / 2, 0, 0]}>
            <ringGeometry args={[0.8, 1.2, 32]} />
            <meshBasicMaterial color="#00ff00" transparent opacity={0.7} />
          </mesh>
        )}
        <AbilityUpdater
          updateCooldowns={updateCooldowns}
          updateProjectiles={updateProjectiles}
          updateChompers={updateChompers}
        />
      </Canvas>
      <Minimap3D
        championPosition={championPosition}
        mapSize={MAP_SIZE}
        viewport={viewport}
      />
      <AbilityBar abilityState={abilityState} />
    </div>
  )
}
