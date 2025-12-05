'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { useState, useCallback, useEffect, useRef, useMemo } from 'react'
import Terrain from './Terrain'
import Champion3D from './Champion3D'
import Lighting from './Lighting'
import CameraController from './CameraController'
import Minimap3D from './Minimap3D'
import Projectiles from './Projectiles'
import AbilityBar from './AbilityBar'
import { useAbilities, AbilityState, initialAbilityState, Projectile, Chomper } from './AbilitySystem'
import { MapMinions, MinionData, createInitialMinions } from './Minions'

const MAP_SIZE = 200 // 3D units (scaled down from 3200)
const ATTACK_RANGE = 15 // Distance at which Jinx can attack
const ATTACK_COOLDOWN = 0.8 // Seconds between attacks
const DAMAGE_PER_HIT = 10

// Inner component that uses useFrame for ability and attack updates
function AbilityUpdater({
  updateCooldowns,
  updateProjectiles,
  updateChompers,
  updateAutoAttack,
}: {
  updateCooldowns: (delta: number) => void
  updateProjectiles: (delta: number) => void
  updateChompers: () => void
  updateAutoAttack: (delta: number) => void
}) {
  useFrame((_, delta) => {
    updateCooldowns(delta)
    updateProjectiles(delta)
    updateChompers()
    updateAutoAttack(delta)
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

  // Minion state
  const [minions, setMinions] = useState<MinionData[]>(() => createInitialMinions(MAP_SIZE))
  const [targetedMinionId, setTargetedMinionId] = useState<string | null>(null)
  const attackCooldownRef = useRef(0)
  const championPosRef = useRef(championPosition)

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

  // Keep champion position ref updated
  useEffect(() => {
    championPosRef.current = championPosition
  }, [championPosition])

  // Handle minion click - target the minion and walk toward it
  const handleMinionClick = useCallback((minionId: string, minionPosition: [number, number, number]) => {
    setTargetedMinionId(minionId)
    // Walk toward the minion
    setTargetPosition(minionPosition)
  }, [])

  // Auto-attack update function
  const updateAutoAttack = useCallback((delta: number) => {
    // Decrease attack cooldown
    if (attackCooldownRef.current > 0) {
      attackCooldownRef.current -= delta
    }

    // If we have a targeted minion, check if we can attack
    if (targetedMinionId) {
      const targetMinion = minions.find(m => m.id === targetedMinionId)

      if (!targetMinion || targetMinion.isDead || targetMinion.hp <= 0) {
        // Target is dead or doesn't exist, clear targeting
        setTargetedMinionId(null)
        return
      }

      // Calculate distance to target
      const dx = targetMinion.position[0] - championPosRef.current[0]
      const dz = targetMinion.position[2] - championPosRef.current[2]
      const distance = Math.sqrt(dx * dx + dz * dz)

      // If in range and cooldown is ready, attack
      if (distance <= ATTACK_RANGE && attackCooldownRef.current <= 0) {
        // Reset cooldown
        attackCooldownRef.current = ATTACK_COOLDOWN

        // Deal damage to the minion
        setMinions(prev => prev.map(m => {
          if (m.id === targetedMinionId) {
            const newHp = m.hp - DAMAGE_PER_HIT
            if (newHp <= 0) {
              // Minion dies - mark as dead after short delay for animation
              setTimeout(() => {
                setMinions(current => current.map(minion =>
                  minion.id === targetedMinionId
                    ? { ...minion, isDead: true }
                    : minion
                ))
                setTargetedMinionId(null)
              }, 500) // Wait for death animation
            }
            return { ...m, hp: newHp }
          }
          return m
        }))

        // Stop walking when attacking
        if (distance <= ATTACK_RANGE) {
          setTargetPosition(null)
        }
      } else if (distance > ATTACK_RANGE) {
        // Walk toward minion if out of range
        setTargetPosition(targetMinion.position)
      }
    }
  }, [targetedMinionId, minions])

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
    setTargetedMinionId(null) // Clear minion targeting when clicking ground
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
          mapSize={MAP_SIZE}
        />
        <Projectiles projectiles={projectiles} chompers={chompers} />
        <MapMinions
          mapSize={MAP_SIZE}
          minions={minions}
          onMinionClick={handleMinionClick}
        />
        {targetPosition && (
          <mesh position={targetPosition} rotation={[-Math.PI / 2, 0, 0]}>
            <ringGeometry args={[0.8, 1.2, 32]} />
            <meshBasicMaterial color="#00ff00" transparent opacity={0.7} />
          </mesh>
        )}
        {/* Target indicator for targeted minion */}
        {targetedMinionId && (() => {
          const targetMinion = minions.find(m => m.id === targetedMinionId)
          if (targetMinion && !targetMinion.isDead) {
            return (
              <mesh position={targetMinion.position} rotation={[-Math.PI / 2, 0, 0]}>
                <ringGeometry args={[3, 3.5, 32]} />
                <meshBasicMaterial color="#ff0000" transparent opacity={0.8} />
              </mesh>
            )
          }
          return null
        })()}
        <AbilityUpdater
          updateCooldowns={updateCooldowns}
          updateProjectiles={updateProjectiles}
          updateChompers={updateChompers}
          updateAutoAttack={updateAutoAttack}
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
