'use client'

import { useRef, useState } from 'react'
import { useFrame, ThreeEvent } from '@react-three/fiber'
import { Billboard } from '@react-three/drei'
import * as THREE from 'three'

const MAX_HP = 50
const DAMAGE_PER_HIT = 10

interface MinionProps {
  position: [number, number, number]
  isBlue: boolean
  rotation?: number
  id: string
  onMinionClick?: (id: string, position: [number, number, number]) => void
  hp?: number
  onTakeDamage?: (id: string, newHp: number) => void
}

// HP Bar component for minions
function MinionHPBar({ hp, maxHp, isBlue }: { hp: number; maxHp: number; isBlue: boolean }) {
  const hpPercent = hp / maxHp
  const barColor = isBlue ? "#22aaff" : "#ff4444"
  const bgColor = "#333333"

  return (
    <Billboard position={[0, 2.2, 0]} follow={true} lockX={false} lockY={false} lockZ={false}>
      {/* Background */}
      <mesh position={[0, 0, -0.01]}>
        <planeGeometry args={[1.2, 0.15]} />
        <meshBasicMaterial color="#000000" />
      </mesh>
      <mesh position={[0, 0, 0]}>
        <planeGeometry args={[1.1, 0.1]} />
        <meshBasicMaterial color={bgColor} />
      </mesh>
      {/* HP fill */}
      <mesh position={[-0.55 + (hpPercent * 0.55), 0, 0.01]}>
        <planeGeometry args={[1.1 * hpPercent, 0.08]} />
        <meshBasicMaterial color={barColor} />
      </mesh>
    </Billboard>
  )
}

// ============================================
// MELEE MINION - Red/Blue hooded warrior with axe and shield
// ============================================
export function MeleeMinion({ position, isBlue, rotation = 0, id, onMinionClick, hp = MAX_HP }: MinionProps) {
  const groupRef = useRef<THREE.Group>(null)
  const animTime = useRef(Math.random() * Math.PI * 2)
  const currentRotation = useRef(rotation || Math.random() * Math.PI * 2)
  const [isDying, setIsDying] = useState(false)
  const deathProgress = useRef(0)

  // Wandering state
  const posX = useRef(position[0])
  const posZ = useRef(position[2])
  const moveDirection = useRef(Math.random() * Math.PI * 2)
  const moveTimer = useRef(Math.random() * 3) // Time until direction change
  const isPaused = useRef(false)
  const pauseTimer = useRef(0)

  // Team colors
  const hoodColor = isBlue ? "#2060a0" : "#a02020"
  const hoodDark = isBlue ? "#1a4a80" : "#801818"
  const metalLight = "#b0b0b0"
  const metalMid = "#808080"
  const woodColor = "#6a4a30"

  const MOVE_SPEED = 2 // Units per second
  const WANDER_RADIUS = 15 // Max distance from spawn

  // Handle click
  const handleClick = (e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation()
    if (onMinionClick && !isDying) {
      onMinionClick(id, [posX.current, 0, posZ.current])
    }
  }

  // Trigger death animation when HP reaches 0
  if (hp <= 0 && !isDying) {
    setIsDying(true)
  }

  useFrame((_, delta) => {
    if (!groupRef.current) return

    // Death animation
    if (isDying) {
      deathProgress.current += delta * 2
      const scale = Math.max(0, 1 - deathProgress.current)
      groupRef.current.scale.set(2.4 * scale, 2.4 * scale, 2.4 * scale)
      groupRef.current.position.y = position[1] - deathProgress.current * 2
      groupRef.current.rotation.x = deathProgress.current * 0.5
      return
    }

    animTime.current += delta * 2

    // Handle pausing
    if (isPaused.current) {
      pauseTimer.current -= delta
      if (pauseTimer.current <= 0) {
        isPaused.current = false
        moveDirection.current = Math.random() * Math.PI * 2
        moveTimer.current = 2 + Math.random() * 3
      }
    } else {
      // Move in current direction
      posX.current += Math.sin(moveDirection.current) * MOVE_SPEED * delta
      posZ.current += Math.cos(moveDirection.current) * MOVE_SPEED * delta

      // Keep within wander radius of spawn
      const dx = posX.current - position[0]
      const dz = posZ.current - position[2]
      const dist = Math.sqrt(dx * dx + dz * dz)
      if (dist > WANDER_RADIUS) {
        // Turn back toward spawn
        moveDirection.current = Math.atan2(-dx, -dz)
      }

      // Smoothly rotate to face movement direction
      const targetRot = moveDirection.current
      let rotDiff = targetRot - currentRotation.current
      if (rotDiff > Math.PI) rotDiff -= Math.PI * 2
      if (rotDiff < -Math.PI) rotDiff += Math.PI * 2
      currentRotation.current += rotDiff * delta * 3

      // Timer for direction change
      moveTimer.current -= delta
      if (moveTimer.current <= 0) {
        isPaused.current = true
        pauseTimer.current = 0.5 + Math.random() * 1.5
      }
    }

    // Apply position and rotation
    groupRef.current.position.x = posX.current
    groupRef.current.position.z = posZ.current
    groupRef.current.position.y = position[1] + Math.sin(animTime.current) * 0.08
    groupRef.current.rotation.y = currentRotation.current
  })

  // Don't render if death animation complete
  if (isDying && deathProgress.current >= 1) {
    return null
  }

  return (
    <group ref={groupRef} position={position} scale={[2.4, 2.4, 2.4]} onClick={handleClick}>
      {/* HP Bar */}
      {!isDying && <MinionHPBar hp={hp} maxHp={MAX_HP} isBlue={isBlue} />}

      {/* Hood main body */}
      <mesh position={[0, 0.9, 0]} castShadow>
        <sphereGeometry args={[0.35, 16, 16]} />
        <meshStandardMaterial color={hoodColor} />
      </mesh>

      {/* Hood point/top */}
      <mesh position={[0, 1.2, -0.1]} rotation={[0.3, 0, 0]} castShadow>
        <coneGeometry args={[0.2, 0.4, 8]} />
        <meshStandardMaterial color={hoodColor} />
      </mesh>

      {/* Hood back draping */}
      <mesh position={[0, 0.5, -0.2]} castShadow>
        <boxGeometry args={[0.5, 0.4, 0.1]} />
        <meshStandardMaterial color={hoodDark} />
      </mesh>

      {/* Helmet base plate */}
      <mesh position={[0, 0.85, 0.25]} rotation={[0.2, 0, 0]} castShadow>
        <boxGeometry args={[0.45, 0.45, 0.08]} />
        <meshStandardMaterial color={metalLight} metalness={0.7} roughness={0.3} />
      </mesh>

      {/* Eye hole - dark void */}
      <mesh position={[0, 0.85, 0.3]} castShadow>
        <boxGeometry args={[0.32, 0.32, 0.02]} />
        <meshStandardMaterial color="#0a0a0a" />
      </mesh>

      {/* Eyes - glowing */}
      <mesh position={[-0.08, 0.88, 0.32]} castShadow>
        <sphereGeometry args={[0.04, 8, 8]} />
        <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.8} />
      </mesh>
      <mesh position={[0.08, 0.88, 0.32]} castShadow>
        <sphereGeometry args={[0.04, 8, 8]} />
        <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.8} />
      </mesh>

      {/* Flame base and main */}
      <mesh position={[0, 1.35, 0]} castShadow>
        <sphereGeometry args={[0.08, 8, 8]} />
        <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.5} />
      </mesh>
      <mesh position={[0, 1.5, 0]} castShadow>
        <coneGeometry args={[0.06, 0.25, 6]} />
        <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.7} />
      </mesh>
      <pointLight position={[0, 1.45, 0]} color="#ffffff" intensity={2} distance={6} />

      {/* Torso/robe */}
      <mesh position={[0, 0.35, 0]} castShadow>
        <cylinderGeometry args={[0.25, 0.35, 0.5, 12]} />
        <meshStandardMaterial color={hoodColor} />
      </mesh>

      {/* Robe bottom flare */}
      <mesh position={[0, 0.05, 0]} castShadow>
        <cylinderGeometry args={[0.35, 0.4, 0.15, 12]} />
        <meshStandardMaterial color={hoodDark} />
      </mesh>

      {/* Belt */}
      <mesh position={[0, 0.25, 0]} castShadow>
        <cylinderGeometry args={[0.28, 0.28, 0.08, 10]} />
        <meshStandardMaterial color="#8a6a40" />
      </mesh>

      {/* Shoulder armor */}
      <mesh position={[-0.35, 0.55, 0]} rotation={[0, 0, -0.3]} castShadow>
        <boxGeometry args={[0.2, 0.15, 0.18]} />
        <meshStandardMaterial color={metalLight} metalness={0.7} roughness={0.3} />
      </mesh>
      <mesh position={[0.35, 0.55, 0]} rotation={[0, 0, 0.3]} castShadow>
        <boxGeometry args={[0.2, 0.15, 0.18]} />
        <meshStandardMaterial color={metalLight} metalness={0.7} roughness={0.3} />
      </mesh>

      {/* Arms */}
      <group position={[-0.35, 0.4, 0.1]} rotation={[0.5, 0, -0.3]}>
        <mesh position={[0, 0, 0]} castShadow>
          <capsuleGeometry args={[0.08, 0.25, 6, 8]} />
          <meshStandardMaterial color={hoodDark} />
        </mesh>
        <mesh position={[0, -0.18, 0]} castShadow>
          <sphereGeometry args={[0.1, 8, 8]} />
          <meshStandardMaterial color="#3a2a20" />
        </mesh>
      </group>
      <group position={[0.35, 0.4, 0.15]} rotation={[0.3, 0, 0.4]}>
        <mesh position={[0, 0, 0]} castShadow>
          <capsuleGeometry args={[0.08, 0.25, 6, 8]} />
          <meshStandardMaterial color={hoodDark} />
        </mesh>
        <mesh position={[0, -0.18, 0]} castShadow>
          <sphereGeometry args={[0.1, 8, 8]} />
          <meshStandardMaterial color="#3a2a20" />
        </mesh>
      </group>

      {/* Axe */}
      <group position={[-0.5, 0.8, 0.3]} rotation={[0.3, 0.2, -0.8]}>
        <mesh position={[0, 0, 0]} castShadow>
          <cylinderGeometry args={[0.03, 0.035, 0.7, 6]} />
          <meshStandardMaterial color={woodColor} />
        </mesh>
        <mesh position={[0, 0.32, 0.18]} castShadow>
          <boxGeometry args={[0.04, 0.25, 0.15]} />
          <meshStandardMaterial color={metalLight} metalness={0.8} roughness={0.2} />
        </mesh>
      </group>

      {/* Shield */}
      <group position={[0.55, 0.45, 0.2]} rotation={[0.2, -0.5, 0.3]}>
        <mesh position={[0, 0, 0]} castShadow>
          <boxGeometry args={[0.35, 0.45, 0.06]} />
          <meshStandardMaterial color={metalMid} metalness={0.6} roughness={0.4} />
        </mesh>
        <mesh position={[0, 0, 0.05]} castShadow>
          <boxGeometry args={[0.15, 0.2, 0.02]} />
          <meshStandardMaterial color={isBlue ? "#3080c0" : "#c03030"} />
        </mesh>
      </group>

      {/* Shadow base */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, 0]}>
        <circleGeometry args={[0.4, 12]} />
        <meshStandardMaterial color="#1a1a1a" transparent opacity={0.5} />
      </mesh>
    </group>
  )
}

// ============================================
// CASTER MINION - Blue/Red robed mage with crystal staff
// ============================================
export function CasterMinion({ position, isBlue, rotation = 0, id, onMinionClick, hp = MAX_HP }: MinionProps) {
  const groupRef = useRef<THREE.Group>(null)
  const animTime = useRef(Math.random() * Math.PI * 2)
  const crystalRef = useRef<THREE.Mesh>(null)
  const currentRotation = useRef(rotation || Math.random() * Math.PI * 2)
  const [isDying, setIsDying] = useState(false)
  const deathProgress = useRef(0)

  // Wandering state
  const posX = useRef(position[0])
  const posZ = useRef(position[2])
  const moveDirection = useRef(Math.random() * Math.PI * 2)
  const moveTimer = useRef(Math.random() * 3)
  const isPaused = useRef(false)
  const pauseTimer = useRef(0)

  // Team colors
  const robeColor = isBlue ? "#2080c0" : "#c02040"
  const robeDark = isBlue ? "#1860a0" : "#a01830"
  const crystalColor = isBlue ? "#00d8ff" : "#ff4080"
  const metalLight = "#b0b0b0"
  const metalMid = "#808080"

  const MOVE_SPEED = 1.5 // Casters move slower
  const WANDER_RADIUS = 12

  // Handle click
  const handleClick = (e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation()
    if (onMinionClick && !isDying) {
      onMinionClick(id, [posX.current, 0, posZ.current])
    }
  }

  // Trigger death animation when HP reaches 0
  if (hp <= 0 && !isDying) {
    setIsDying(true)
  }

  useFrame((_, delta) => {
    if (!groupRef.current) return

    // Death animation
    if (isDying) {
      deathProgress.current += delta * 2
      const scale = Math.max(0, 1 - deathProgress.current)
      groupRef.current.scale.set(2.4 * scale, 2.4 * scale, 2.4 * scale)
      groupRef.current.position.y = position[1] - deathProgress.current * 2
      groupRef.current.rotation.x = deathProgress.current * 0.5
      return
    }

    animTime.current += delta * 2

    // Handle pausing
    if (isPaused.current) {
      pauseTimer.current -= delta
      if (pauseTimer.current <= 0) {
        isPaused.current = false
        moveDirection.current = Math.random() * Math.PI * 2
        moveTimer.current = 2 + Math.random() * 4
      }
    } else {
      posX.current += Math.sin(moveDirection.current) * MOVE_SPEED * delta
      posZ.current += Math.cos(moveDirection.current) * MOVE_SPEED * delta

      const dx = posX.current - position[0]
      const dz = posZ.current - position[2]
      const dist = Math.sqrt(dx * dx + dz * dz)
      if (dist > WANDER_RADIUS) {
        moveDirection.current = Math.atan2(-dx, -dz)
      }

      const targetRot = moveDirection.current
      let rotDiff = targetRot - currentRotation.current
      if (rotDiff > Math.PI) rotDiff -= Math.PI * 2
      if (rotDiff < -Math.PI) rotDiff += Math.PI * 2
      currentRotation.current += rotDiff * delta * 3

      moveTimer.current -= delta
      if (moveTimer.current <= 0) {
        isPaused.current = true
        pauseTimer.current = 1 + Math.random() * 2
      }
    }

    groupRef.current.position.x = posX.current
    groupRef.current.position.z = posZ.current
    groupRef.current.position.y = position[1] + Math.sin(animTime.current) * 0.08
    groupRef.current.rotation.y = currentRotation.current

    // Slow crystal rotation
    if (crystalRef.current) {
      crystalRef.current.rotation.y += delta * 1.5
    }
  })

  // Don't render if death animation complete
  if (isDying && deathProgress.current >= 1) {
    return null
  }

  return (
    <group ref={groupRef} position={position} scale={[2.4, 2.4, 2.4]} onClick={handleClick}>
      {/* HP Bar */}
      {!isDying && <MinionHPBar hp={hp} maxHp={MAX_HP} isBlue={isBlue} />}

      {/* Hood main */}
      <mesh position={[0, 0.95, 0]} castShadow>
        <sphereGeometry args={[0.3, 16, 16]} />
        <meshStandardMaterial color={robeColor} />
      </mesh>

      {/* Hood top point */}
      <mesh position={[0, 1.15, -0.05]} rotation={[0.2, 0, 0]} castShadow>
        <coneGeometry args={[0.18, 0.35, 8]} />
        <meshStandardMaterial color={robeColor} />
      </mesh>

      {/* Helmet faceplate */}
      <mesh position={[0, 0.9, 0.2]} rotation={[0.15, 0, 0]} castShadow>
        <boxGeometry args={[0.38, 0.38, 0.06]} />
        <meshStandardMaterial color={metalLight} metalness={0.7} roughness={0.3} />
      </mesh>

      {/* Eye void */}
      <mesh position={[0, 0.92, 0.24]} castShadow>
        <boxGeometry args={[0.28, 0.2, 0.02]} />
        <meshStandardMaterial color="#0a0a0a" />
      </mesh>

      {/* Eyes */}
      <mesh position={[-0.06, 0.93, 0.26]} castShadow>
        <sphereGeometry args={[0.03, 8, 8]} />
        <meshStandardMaterial color={crystalColor} emissive={crystalColor} emissiveIntensity={0.8} />
      </mesh>
      <mesh position={[0.06, 0.93, 0.26]} castShadow>
        <sphereGeometry args={[0.03, 8, 8]} />
        <meshStandardMaterial color={crystalColor} emissive={crystalColor} emissiveIntensity={0.8} />
      </mesh>

      {/* Torso */}
      <mesh position={[0, 0.45, 0]} castShadow>
        <cylinderGeometry args={[0.22, 0.28, 0.5, 12]} />
        <meshStandardMaterial color={robeColor} />
      </mesh>

      {/* Robe skirt */}
      <mesh position={[0, 0.12, 0]} castShadow>
        <cylinderGeometry args={[0.28, 0.38, 0.35, 12]} />
        <meshStandardMaterial color={robeDark} />
      </mesh>

      {/* Belt */}
      <mesh position={[0, 0.32, 0]} castShadow>
        <cylinderGeometry args={[0.25, 0.25, 0.06, 10]} />
        <meshStandardMaterial color="#6a5030" />
      </mesh>

      {/* Shoulder pads */}
      <mesh position={[-0.3, 0.6, 0]} rotation={[0, 0, -0.4]} castShadow>
        <boxGeometry args={[0.18, 0.12, 0.16]} />
        <meshStandardMaterial color={metalLight} metalness={0.7} roughness={0.3} />
      </mesh>
      <mesh position={[0.3, 0.6, 0]} rotation={[0, 0, 0.4]} castShadow>
        <boxGeometry args={[0.18, 0.12, 0.16]} />
        <meshStandardMaterial color={metalLight} metalness={0.7} roughness={0.3} />
      </mesh>

      {/* Crystal shoulder gems */}
      <mesh position={[-0.32, 0.6, 0.1]} castShadow>
        <octahedronGeometry args={[0.05, 0]} />
        <meshStandardMaterial color={crystalColor} emissive={crystalColor} emissiveIntensity={0.4} />
      </mesh>
      <mesh position={[0.32, 0.6, 0.1]} castShadow>
        <octahedronGeometry args={[0.05, 0]} />
        <meshStandardMaterial color={crystalColor} emissive={crystalColor} emissiveIntensity={0.4} />
      </mesh>

      {/* Arms */}
      <group position={[-0.32, 0.45, 0.1]} rotation={[0.8, 0, -0.2]}>
        <mesh position={[0, 0, 0]} castShadow>
          <capsuleGeometry args={[0.07, 0.22, 6, 8]} />
          <meshStandardMaterial color={robeDark} />
        </mesh>
        <mesh position={[0, -0.16, 0]} castShadow>
          <sphereGeometry args={[0.08, 8, 8]} />
          <meshStandardMaterial color="#4a3a30" />
        </mesh>
      </group>
      <group position={[0.32, 0.45, 0.12]} rotation={[0.4, 0, 0.3]}>
        <mesh position={[0, 0, 0]} castShadow>
          <capsuleGeometry args={[0.07, 0.22, 6, 8]} />
          <meshStandardMaterial color={robeDark} />
        </mesh>
        <mesh position={[0, -0.16, 0]} castShadow>
          <sphereGeometry args={[0.08, 8, 8]} />
          <meshStandardMaterial color="#4a3a30" />
        </mesh>
      </group>

      {/* Staff */}
      <group position={[-0.45, 0.6, 0.25]} rotation={[0.2, 0.1, -0.15]}>
        <mesh position={[0, 0, 0]} castShadow>
          <cylinderGeometry args={[0.025, 0.03, 0.9, 6]} />
          <meshStandardMaterial color="#5a4030" />
        </mesh>
        <mesh position={[0, 0.42, 0]} castShadow>
          <cylinderGeometry args={[0.05, 0.035, 0.08, 6]} />
          <meshStandardMaterial color={metalMid} metalness={0.7} roughness={0.3} />
        </mesh>
        <mesh ref={crystalRef} position={[0, 0.58, 0]} castShadow>
          <octahedronGeometry args={[0.1, 0]} />
          <meshStandardMaterial color={crystalColor} emissive={crystalColor} emissiveIntensity={0.6} transparent opacity={0.9} />
        </mesh>
        <pointLight position={[0, 0.58, 0]} color={crystalColor} intensity={3} distance={8} />
      </group>

      {/* Shadow base */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, 0]}>
        <circleGeometry args={[0.35, 12]} />
        <meshStandardMaterial color="#1a1a1a" transparent opacity={0.5} />
      </mesh>
    </group>
  )
}

// ============================================
// CANNON MINION - Rides in wheeled cannon cart
// ============================================
export function CannonMinion({ position, isBlue, rotation = 0, id, onMinionClick, hp = MAX_HP }: MinionProps) {
  const groupRef = useRef<THREE.Group>(null)
  const animTime = useRef(Math.random() * Math.PI * 2)
  const currentRotation = useRef(rotation || Math.random() * Math.PI * 2)
  const [isDying, setIsDying] = useState(false)
  const deathProgress = useRef(0)

  // Wandering state
  const posX = useRef(position[0])
  const posZ = useRef(position[2])
  const moveDirection = useRef(Math.random() * Math.PI * 2)
  const moveTimer = useRef(Math.random() * 3)
  const isPaused = useRef(false)
  const pauseTimer = useRef(0)

  // Team colors
  const capeColor = isBlue ? "#2060a0" : "#a02020"
  const skinColor = "#8ab0c8"
  const metalMid = "#505860"
  const metalDark = "#383c42"

  const MOVE_SPEED = 1 // Cannons move slowest
  const WANDER_RADIUS = 10

  // Handle click
  const handleClick = (e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation()
    if (onMinionClick && !isDying) {
      onMinionClick(id, [posX.current, 0, posZ.current])
    }
  }

  // Trigger death animation when HP reaches 0
  if (hp <= 0 && !isDying) {
    setIsDying(true)
  }

  useFrame((_, delta) => {
    if (!groupRef.current) return

    // Death animation
    if (isDying) {
      deathProgress.current += delta * 2
      const scale = Math.max(0, 1 - deathProgress.current)
      groupRef.current.scale.set(2.7 * scale, 2.7 * scale, 2.7 * scale)
      groupRef.current.position.y = position[1] - deathProgress.current * 2
      groupRef.current.rotation.x = deathProgress.current * 0.5
      return
    }

    animTime.current += delta * 1.5

    // Handle pausing
    if (isPaused.current) {
      pauseTimer.current -= delta
      if (pauseTimer.current <= 0) {
        isPaused.current = false
        moveDirection.current = Math.random() * Math.PI * 2
        moveTimer.current = 3 + Math.random() * 4
      }
    } else {
      posX.current += Math.sin(moveDirection.current) * MOVE_SPEED * delta
      posZ.current += Math.cos(moveDirection.current) * MOVE_SPEED * delta

      const dx = posX.current - position[0]
      const dz = posZ.current - position[2]
      const dist = Math.sqrt(dx * dx + dz * dz)
      if (dist > WANDER_RADIUS) {
        moveDirection.current = Math.atan2(-dx, -dz)
      }

      const targetRot = moveDirection.current
      let rotDiff = targetRot - currentRotation.current
      if (rotDiff > Math.PI) rotDiff -= Math.PI * 2
      if (rotDiff < -Math.PI) rotDiff += Math.PI * 2
      currentRotation.current += rotDiff * delta * 2 // Slower rotation for cart

      moveTimer.current -= delta
      if (moveTimer.current <= 0) {
        isPaused.current = true
        pauseTimer.current = 1.5 + Math.random() * 2.5
      }
    }

    groupRef.current.position.x = posX.current
    groupRef.current.position.z = posZ.current
    groupRef.current.rotation.y = currentRotation.current
    // Very subtle cart wobble
    groupRef.current.rotation.z = Math.sin(animTime.current) * 0.015
  })

  // Don't render if death animation complete
  if (isDying && deathProgress.current >= 1) {
    return null
  }

  return (
    <group ref={groupRef} position={position} scale={[2.7, 2.7, 2.7]} onClick={handleClick}>
      {/* HP Bar */}
      {!isDying && <MinionHPBar hp={hp} maxHp={MAX_HP} isBlue={isBlue} />}

      {/* Cart body */}
      <mesh position={[0, 0.35, 0]} castShadow>
        <boxGeometry args={[0.8, 0.3, 0.6]} />
        <meshStandardMaterial color={metalMid} metalness={0.5} roughness={0.5} />
      </mesh>

      {/* Wheels */}
      <mesh position={[-0.5, 0.2, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
        <cylinderGeometry args={[0.22, 0.22, 0.1, 12]} />
        <meshStandardMaterial color={metalDark} metalness={0.5} roughness={0.5} />
      </mesh>
      <mesh position={[0.5, 0.2, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
        <cylinderGeometry args={[0.22, 0.22, 0.1, 12]} />
        <meshStandardMaterial color={metalDark} metalness={0.5} roughness={0.5} />
      </mesh>

      {/* Axle */}
      <mesh rotation={[0, 0, Math.PI / 2]} position={[0, 0.2, 0]} castShadow>
        <cylinderGeometry args={[0.03, 0.03, 1.1, 6]} />
        <meshStandardMaterial color={metalDark} metalness={0.5} roughness={0.5} />
      </mesh>

      {/* Cannon */}
      <group position={[0, 0.45, 0.35]} rotation={[-0.15, 0, 0]}>
        <mesh position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]} castShadow>
          <cylinderGeometry args={[0.15, 0.18, 0.25, 10]} />
          <meshStandardMaterial color={metalDark} metalness={0.5} roughness={0.5} />
        </mesh>
        <mesh position={[0, 0, 0.35]} rotation={[Math.PI / 2, 0, 0]} castShadow>
          <cylinderGeometry args={[0.12, 0.15, 0.5, 10]} />
          <meshStandardMaterial color={metalMid} metalness={0.5} roughness={0.5} />
        </mesh>
        <mesh position={[0, 0, 0.6]} rotation={[Math.PI / 2, 0, 0]} castShadow>
          <cylinderGeometry args={[0.08, 0.1, 0.08, 8]} />
          <meshStandardMaterial color="#1a1a1a" />
        </mesh>
      </group>

      {/* Operator */}
      <group position={[0, 0.6, -0.15]}>
        <mesh position={[0, 0.45, 0]} castShadow>
          <sphereGeometry args={[0.18, 12, 12]} />
          <meshStandardMaterial color={skinColor} />
        </mesh>
        <mesh position={[0, 0.52, 0]} castShadow>
          <sphereGeometry args={[0.2, 12, 12, 0, Math.PI * 2, 0, Math.PI / 2]} />
          <meshStandardMaterial color={metalMid} metalness={0.6} roughness={0.4} />
        </mesh>
        <mesh position={[0, 0.6, -0.05]} rotation={[0.3, 0, 0]} castShadow>
          <boxGeometry args={[0.04, 0.15, 0.2]} />
          <meshStandardMaterial color={capeColor} />
        </mesh>
        <mesh position={[0, 0.15, 0]} castShadow>
          <cylinderGeometry args={[0.15, 0.18, 0.35, 10]} />
          <meshStandardMaterial color={metalDark} metalness={0.5} roughness={0.5} />
        </mesh>
        <mesh position={[0, 0.25, -0.15]} castShadow>
          <boxGeometry args={[0.35, 0.4, 0.05]} />
          <meshStandardMaterial color={capeColor} />
        </mesh>
        {/* Eyes */}
        <mesh position={[-0.06, 0.46, 0.16]} castShadow>
          <sphereGeometry args={[0.015, 6, 6]} />
          <meshStandardMaterial color={isBlue ? "#4488ff" : "#ff4444"} emissive={isBlue ? "#4488ff" : "#ff4444"} emissiveIntensity={0.6} />
        </mesh>
        <mesh position={[0.06, 0.46, 0.16]} castShadow>
          <sphereGeometry args={[0.015, 6, 6]} />
          <meshStandardMaterial color={isBlue ? "#4488ff" : "#ff4444"} emissive={isBlue ? "#4488ff" : "#ff4444"} emissiveIntensity={0.6} />
        </mesh>
      </group>

      {/* Shadow base */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, 0]}>
        <circleGeometry args={[0.55, 12]} />
        <meshStandardMaterial color="#1a1a1a" transparent opacity={0.5} />
      </mesh>
    </group>
  )
}

// ============================================
// MINION DATA TYPES
// ============================================
export interface MinionData {
  id: string
  type: 'melee' | 'caster' | 'cannon'
  position: [number, number, number]
  isBlue: boolean
  hp: number
  isDead: boolean
}

// ============================================
// MINION SPAWNER - Places minions around map
// ============================================
interface MinionsProps {
  mapSize: number
  minions: MinionData[]
  onMinionClick: (id: string, position: [number, number, number]) => void
}

export function MapMinions({ minions, onMinionClick }: MinionsProps) {
  return (
    <group>
      {minions.map((minion) => {
        if (minion.isDead) return null

        switch (minion.type) {
          case 'melee':
            return (
              <MeleeMinion
                key={minion.id}
                id={minion.id}
                position={minion.position}
                isBlue={minion.isBlue}
                hp={minion.hp}
                onMinionClick={onMinionClick}
              />
            )
          case 'caster':
            return (
              <CasterMinion
                key={minion.id}
                id={minion.id}
                position={minion.position}
                isBlue={minion.isBlue}
                hp={minion.hp}
                onMinionClick={onMinionClick}
              />
            )
          case 'cannon':
            return (
              <CannonMinion
                key={minion.id}
                id={minion.id}
                position={minion.position}
                isBlue={minion.isBlue}
                hp={minion.hp}
                onMinionClick={onMinionClick}
              />
            )
        }
      })}
    </group>
  )
}

// Helper function to create initial minion data
export function createInitialMinions(mapSize: number): MinionData[] {
  const halfSize = mapSize / 2
  const minions: MinionData[] = []

  // Blue team melee minions
  const blueMeleePositions: [number, number, number][] = [
    [-halfSize + 30, 0, halfSize - 30],
    [-halfSize + 40, 0, 20],
    [-20, 0, halfSize - 25],
  ]
  blueMeleePositions.forEach((pos, i) => {
    minions.push({
      id: `blue-melee-${i}`,
      type: 'melee',
      position: pos,
      isBlue: true,
      hp: MAX_HP,
      isDead: false,
    })
  })

  // Blue team caster minions
  const blueCasterPositions: [number, number, number][] = [
    [-halfSize + 32, 0, halfSize - 35],
    [-halfSize + 42, 0, 15],
  ]
  blueCasterPositions.forEach((pos, i) => {
    minions.push({
      id: `blue-caster-${i}`,
      type: 'caster',
      position: pos,
      isBlue: true,
      hp: MAX_HP,
      isDead: false,
    })
  })

  // Blue team cannon minions
  const blueCannonPositions: [number, number, number][] = [
    [-halfSize + 28, 0, halfSize - 38],
  ]
  blueCannonPositions.forEach((pos, i) => {
    minions.push({
      id: `blue-cannon-${i}`,
      type: 'cannon',
      position: pos,
      isBlue: true,
      hp: MAX_HP,
      isDead: false,
    })
  })

  // Red team melee minions
  const redMeleePositions: [number, number, number][] = [
    [halfSize - 30, 0, -halfSize + 30],
    [halfSize - 40, 0, -20],
    [20, 0, -halfSize + 25],
  ]
  redMeleePositions.forEach((pos, i) => {
    minions.push({
      id: `red-melee-${i}`,
      type: 'melee',
      position: pos,
      isBlue: false,
      hp: MAX_HP,
      isDead: false,
    })
  })

  // Red team caster minions
  const redCasterPositions: [number, number, number][] = [
    [halfSize - 32, 0, -halfSize + 35],
    [halfSize - 42, 0, -15],
  ]
  redCasterPositions.forEach((pos, i) => {
    minions.push({
      id: `red-caster-${i}`,
      type: 'caster',
      position: pos,
      isBlue: false,
      hp: MAX_HP,
      isDead: false,
    })
  })

  // Red team cannon minions
  const redCannonPositions: [number, number, number][] = [
    [halfSize - 28, 0, -halfSize + 38],
  ]
  redCannonPositions.forEach((pos, i) => {
    minions.push({
      id: `red-cannon-${i}`,
      type: 'cannon',
      position: pos,
      isBlue: false,
      hp: MAX_HP,
      isDead: false,
    })
  })

  return minions
}
