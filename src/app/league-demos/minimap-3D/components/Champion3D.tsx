'use client'

import { useRef, useEffect, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Billboard } from '@react-three/drei'
import * as THREE from 'three'
import JinxModel, { JinxLegs } from './JinxModel'
import { getMapColliders } from './CollisionSystem'
import { MinionData } from './Minions'

interface Champion3DProps {
  position: [number, number, number]
  targetPosition: [number, number, number] | null
  onPositionUpdate: (pos: [number, number, number]) => void
  onReachedTarget: () => void
  onRotationUpdate?: (rotation: number) => void
  usingRockets?: boolean
  health?: number
  maxHealth?: number
  mapSize?: number
  isShooting?: boolean
  targetedMinionId?: string | null
  minions?: MinionData[]
}

const MOVE_SPEED = 30 // units per second
const ROTATION_SPEED = 10 // radians per second

export default function Champion3D({
  position,
  targetPosition,
  onPositionUpdate,
  onReachedTarget,
  onRotationUpdate,
  usingRockets = false,
  health = 610,
  maxHealth = 610,
  mapSize = 200,
  isShooting = false,
  targetedMinionId = null,
  minions = [],
}: Champion3DProps) {
  const groupRef = useRef<THREE.Group>(null)
  const currentPosition = useRef<THREE.Vector3>(new THREE.Vector3(...position))
  const currentRotation = useRef(0)
  const animCycle = useRef(0)
  const idleTime = useRef(0)
  const isMoving = useRef(false)

  // Get map colliders (memoized)
  const colliders = useMemo(() => getMapColliders(mapSize), [mapSize])

  // Update position when external position changes
  useEffect(() => {
    currentPosition.current.set(...position)
  }, [position])

  useFrame((_, delta) => {
    if (!groupRef.current) return

    if (targetPosition) {
      const target = new THREE.Vector3(...targetPosition)
      const current = currentPosition.current
      const direction = target.clone().sub(current)
      const distance = direction.length()

      if (distance > 0.5) {
        isMoving.current = true
        idleTime.current = 0 // Reset idle time when moving

        // Calculate intended next position
        direction.normalize()
        const moveAmount = Math.min(MOVE_SPEED * delta, distance)
        const intendedX = current.x + direction.x * moveAmount
        const intendedZ = current.z + direction.z * moveAmount

        // TEMPORARILY DISABLED: Collision detection
        // const [resolvedX, resolvedZ] = resolveCollision(
        //   current.x,
        //   current.z,
        //   intendedX,
        //   intendedZ,
        //   colliders,
        //   2.0 // Character radius for collision
        // )

        // Update position directly (no collision)
        current.x = intendedX
        current.z = intendedZ

        // Update rotation to face movement direction
        const targetRotation = Math.atan2(direction.x, direction.z)
        const rotationDiff = targetRotation - currentRotation.current

        // Smooth rotation
        let adjustedDiff = rotationDiff
        if (adjustedDiff > Math.PI) adjustedDiff -= Math.PI * 2
        if (adjustedDiff < -Math.PI) adjustedDiff += Math.PI * 2

        currentRotation.current += adjustedDiff * Math.min(1, ROTATION_SPEED * delta)

        // Notify parent of rotation update
        onRotationUpdate?.(currentRotation.current)

        // Running animation - faster cycle for running
        animCycle.current += delta * 12

        // Update group position
        groupRef.current.position.copy(current)
        groupRef.current.rotation.y = currentRotation.current

        // Notify parent of position update
        onPositionUpdate([current.x, current.y, current.z])
      } else {
        isMoving.current = false
        onReachedTarget()
      }
    } else {
      isMoving.current = false
    }

    // Increment idle time when not moving
    if (!isMoving.current) {
      idleTime.current += delta
      // Slowly decay animation cycle for smooth transition to idle
      animCycle.current *= 0.9
    }

    // Face target minion when shooting
    if (isShooting && targetedMinionId) {
      const targetMinion = minions.find(m => m.id === targetedMinionId)
      if (targetMinion && groupRef.current) {
        const dx = targetMinion.position[0] - currentPosition.current.x
        const dz = targetMinion.position[2] - currentPosition.current.z
        const targetRotation = Math.atan2(dx, dz)
        currentRotation.current = targetRotation
        groupRef.current.rotation.y = currentRotation.current
      }
    }

    // Apply animations to body parts
    if (groupRef.current) {
      const leftLeg = groupRef.current.getObjectByName('leftLeg')
      const rightLeg = groupRef.current.getObjectByName('rightLeg')
      const leftArm = groupRef.current.getObjectByName('leftArm')
      const rightArm = groupRef.current.getObjectByName('rightArm')
      const body = groupRef.current.getObjectByName('body')

      if (isShooting) {
        // SHOOTING STANCE - stable stance, arms raised for aiming
        if (leftLeg && rightLeg) {
          // Wide stable stance
          leftLeg.rotation.x = -0.1
          rightLeg.rotation.x = 0.2
          leftLeg.rotation.z = -0.15
          rightLeg.rotation.z = 0.15
        }

        if (leftArm && rightArm) {
          // Arms raised and extended forward for aiming
          rightArm.rotation.x = -0.8 // Gun arm raised
          rightArm.rotation.z = 0.2
          leftArm.rotation.x = -0.5 // Support arm
          leftArm.rotation.z = -0.3
        }

        if (body) {
          body.position.y = 1.4 // Slightly lower stance
          body.rotation.x = 0.15 // Lean forward
          body.rotation.z = 0
          body.rotation.y = 0
        }
      } else if (isMoving.current) {
        // RUNNING ANIMATION
        const runCycle = animCycle.current

        // Leg swing - larger amplitude for running
        if (leftLeg && rightLeg) {
          leftLeg.rotation.x = Math.sin(runCycle) * 0.7
          rightLeg.rotation.x = Math.sin(runCycle + Math.PI) * 0.7
          leftLeg.rotation.z = 0
          rightLeg.rotation.z = 0
        }

        // Arm swing - opposite to legs for natural running
        if (leftArm && rightArm) {
          leftArm.rotation.x = Math.sin(runCycle + Math.PI) * 0.5
          rightArm.rotation.x = Math.sin(runCycle) * 0.5
          leftArm.rotation.z = 0.1
          rightArm.rotation.z = -0.1
        }

        // Body animations while running
        if (body) {
          // Vertical bounce
          body.position.y = 1.5 + Math.abs(Math.sin(runCycle * 2)) * 0.15
          // Slight forward lean
          body.rotation.x = 0.1
          // Subtle side-to-side sway
          body.rotation.z = Math.sin(runCycle) * 0.05
        }
      } else {
        // IDLE ANIMATION - subtle breathing and sway
        const breathCycle = idleTime.current * 1.5 // Slow breathing
        const swayCycle = idleTime.current * 0.8 // Even slower sway

        // Legs return to neutral with slight weight shift
        if (leftLeg && rightLeg) {
          leftLeg.rotation.x = Math.sin(swayCycle) * 0.02
          rightLeg.rotation.x = Math.sin(swayCycle + Math.PI) * 0.02
          leftLeg.rotation.z = 0
          rightLeg.rotation.z = 0
        }

        // Arms have subtle idle movement
        if (leftArm && rightArm) {
          leftArm.rotation.x = Math.sin(breathCycle * 0.7) * 0.03
          rightArm.rotation.x = Math.sin(breathCycle * 0.7 + 0.5) * 0.03
          // Slight outward sway
          leftArm.rotation.z = 0.1 + Math.sin(swayCycle) * 0.02
          rightArm.rotation.z = -0.1 - Math.sin(swayCycle) * 0.02
        }

        // Body breathing and sway
        if (body) {
          // Breathing - subtle vertical movement
          body.position.y = 1.5 + Math.sin(breathCycle) * 0.03
          // Return to upright
          body.rotation.x = Math.sin(swayCycle * 0.5) * 0.02
          // Weight shift side to side
          body.rotation.z = Math.sin(swayCycle) * 0.03
          // Subtle head/body turn
          body.rotation.y = Math.sin(swayCycle * 0.3) * 0.05
        }
      }
    }
  })

  return (
    <group ref={groupRef} position={position} scale={[2, 2, 2]}>
      {/* Health bar - Billboard to always face camera (LoL style) */}
      <Billboard position={[0, 4.5, 0]} follow={true} lockX={false} lockY={false} lockZ={false}>
        {/* Level indicator box on left */}
        <mesh position={[-1.55, 0, 0]}>
          <planeGeometry args={[0.28, 0.28]} />
          <meshBasicMaterial color="#1a1a1a" />
        </mesh>
        <mesh position={[-1.55, 0, 0.01]}>
          <planeGeometry args={[0.22, 0.22]} />
          <meshBasicMaterial color="#0a0a0a" />
        </mesh>

        {/* Outer black border */}
        <mesh position={[0.05, 0, -0.02]}>
          <planeGeometry args={[2.9, 0.22]} />
          <meshBasicMaterial color="#000000" />
        </mesh>

        {/* Inner dark background */}
        <mesh position={[0.05, 0, -0.01]}>
          <planeGeometry args={[2.8, 0.16]} />
          <meshBasicMaterial color="#1a1a1a" />
        </mesh>

        {/* Health fill - bright green like LoL */}
        <mesh position={[-1.35 + (health / maxHealth) * 1.4, 0, 0]}>
          <planeGeometry args={[2.8 * (health / maxHealth), 0.12]} />
          <meshBasicMaterial color={health / maxHealth > 0.5 ? "#22cc22" : health / maxHealth > 0.25 ? "#cccc00" : "#cc2222"} />
        </mesh>

        {/* Health fill top highlight for 3D effect */}
        <mesh position={[-1.35 + (health / maxHealth) * 1.4, 0.03, 0.005]}>
          <planeGeometry args={[2.8 * (health / maxHealth), 0.04]} />
          <meshBasicMaterial color={health / maxHealth > 0.5 ? "#66ff66" : health / maxHealth > 0.25 ? "#ffff66" : "#ff6666"} />
        </mesh>

        {/* Tick marks - black vertical lines dividing into segments */}
        {[...Array(9)].map((_, i) => (
          <mesh key={i} position={[-1.35 + (i + 1) * 0.28, 0, 0.01]}>
            <planeGeometry args={[0.025, 0.16]} />
            <meshBasicMaterial color="#000000" />
          </mesh>
        ))}
      </Billboard>

      {/* High-poly Jinx character body */}
      <group name="body" position={[0, 1.5, 0]}>
        <JinxModel usingRockets={usingRockets} />
      </group>

      {/* Legs - separate for animation */}
      <JinxLegs />

      {/* Selection circle */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.05, 0]}>
        <ringGeometry args={[1.2, 1.4, 32]} />
        <meshBasicMaterial color="#00bfff" transparent opacity={0.6} />
      </mesh>
    </group>
  )
}
