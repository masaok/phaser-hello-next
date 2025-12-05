'use client'

import { useRef, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

interface Champion3DProps {
  position: [number, number, number]
  targetPosition: [number, number, number] | null
  onPositionUpdate: (pos: [number, number, number]) => void
  onReachedTarget: () => void
  onRotationUpdate?: (rotation: number) => void
  usingRockets?: boolean
  health?: number
  maxHealth?: number
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
}: Champion3DProps) {
  const groupRef = useRef<THREE.Group>(null)
  const currentPosition = useRef<THREE.Vector3>(new THREE.Vector3(...position))
  const currentRotation = useRef(0)
  const walkCycle = useRef(0)
  const isMoving = useRef(false)

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

        // Move toward target
        direction.normalize()
        const moveAmount = Math.min(MOVE_SPEED * delta, distance)
        current.add(direction.multiplyScalar(moveAmount))

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

        // Walk animation
        walkCycle.current += delta * 10

        // Update group position
        groupRef.current.position.copy(current)
        groupRef.current.rotation.y = currentRotation.current

        // Notify parent of position update
        onPositionUpdate([current.x, current.y, current.z])
      } else {
        isMoving.current = false
        walkCycle.current = 0
        onReachedTarget()
      }
    } else {
      isMoving.current = false
      walkCycle.current = 0
    }

    // Apply walk animation to legs
    if (groupRef.current) {
      const leftLeg = groupRef.current.getObjectByName('leftLeg')
      const rightLeg = groupRef.current.getObjectByName('rightLeg')

      if (leftLeg && rightLeg) {
        if (isMoving.current) {
          leftLeg.rotation.x = Math.sin(walkCycle.current) * 0.5
          rightLeg.rotation.x = Math.sin(walkCycle.current + Math.PI) * 0.5
        } else {
          leftLeg.rotation.x = 0
          rightLeg.rotation.x = 0
        }
      }

      // Slight body bob when walking
      const body = groupRef.current.getObjectByName('body')
      if (body && isMoving.current) {
        body.position.y = 1.5 + Math.abs(Math.sin(walkCycle.current * 2)) * 0.1
      }
    }
  })

  return (
    <group ref={groupRef} position={position} scale={[2, 2, 2]}>
      {/* Health bar */}
      <group position={[0, 4.5, 0]}>
        {/* Background */}
        <mesh>
          <planeGeometry args={[2.5, 0.3]} />
          <meshBasicMaterial color="#333333" />
        </mesh>
        {/* Health fill */}
        <mesh position={[-1.2 + (health / maxHealth) * 1.2, 0, 0.01]}>
          <planeGeometry args={[2.4 * (health / maxHealth), 0.2]} />
          <meshBasicMaterial color={health / maxHealth > 0.5 ? "#00ff00" : health / maxHealth > 0.25 ? "#ffff00" : "#ff0000"} />
        </mesh>
      </group>

      {/* Character body */}
      <group name="body" position={[0, 1.5, 0]}>
        {/* Torso - pink top */}
        <mesh position={[0, 0.3, 0]} castShadow>
          <boxGeometry args={[0.8, 0.8, 0.5]} />
          <meshStandardMaterial color="#ff69b4" />
        </mesh>

        {/* Head */}
        <mesh position={[0, 1, 0]} castShadow>
          <boxGeometry args={[0.5, 0.5, 0.5]} />
          <meshStandardMaterial color="#ffdbac" />
        </mesh>

        {/* Hair - blue braids */}
        <mesh position={[0, 1.3, 0]} castShadow>
          <boxGeometry args={[0.7, 0.3, 0.6]} />
          <meshStandardMaterial color="#00bfff" />
        </mesh>

        {/* Left braid */}
        <mesh position={[-0.4, 0.5, 0]} castShadow>
          <boxGeometry args={[0.15, 1.2, 0.15]} />
          <meshStandardMaterial color="#00bfff" />
        </mesh>

        {/* Right braid */}
        <mesh position={[0.4, 0.5, 0]} castShadow>
          <boxGeometry args={[0.15, 1.2, 0.15]} />
          <meshStandardMaterial color="#00bfff" />
        </mesh>

        {/* Eyes */}
        <mesh position={[-0.1, 1, 0.26]} castShadow>
          <boxGeometry args={[0.1, 0.15, 0.02]} />
          <meshStandardMaterial color="#ff1493" emissive="#ff1493" emissiveIntensity={0.3} />
        </mesh>
        <mesh position={[0.1, 1, 0.26]} castShadow>
          <boxGeometry args={[0.1, 0.15, 0.02]} />
          <meshStandardMaterial color="#ff1493" emissive="#ff1493" emissiveIntensity={0.3} />
        </mesh>

        {/* Weapon - Pow-Pow (Minigun) or Fishbones (Rocket Launcher) */}
        {!usingRockets ? (
          // Minigun
          <group>
            <mesh position={[0.6, 0.3, 0.2]} rotation={[0, 0, -0.3]} castShadow>
              <boxGeometry args={[0.8, 0.2, 0.2]} />
              <meshStandardMaterial color="#666666" />
            </mesh>
            <mesh position={[0.9, 0.35, 0.2]} rotation={[0, 0, -0.3]} castShadow>
              <cylinderGeometry args={[0.08, 0.08, 0.5, 8]} />
              <meshStandardMaterial color="#888888" />
            </mesh>
            {/* Minigun barrels */}
            {[0, 0.1, -0.1].map((offset, i) => (
              <mesh key={i} position={[1.1, 0.35 + offset, 0.2 + (i === 0 ? 0 : i === 1 ? 0.08 : -0.08)]} rotation={[0, 0, Math.PI / 2]} castShadow>
                <cylinderGeometry args={[0.03, 0.03, 0.3, 6]} />
                <meshStandardMaterial color="#444444" />
              </mesh>
            ))}
          </group>
        ) : (
          // Rocket Launcher (Fishbones)
          <group>
            <mesh position={[0.5, 0.3, 0.2]} rotation={[0, 0, -0.2]} castShadow>
              <boxGeometry args={[1.2, 0.35, 0.35]} />
              <meshStandardMaterial color="#ff6600" />
            </mesh>
            {/* Shark mouth decoration */}
            <mesh position={[1.0, 0.25, 0.2]} rotation={[0, 0, -0.2]} castShadow>
              <coneGeometry args={[0.2, 0.4, 4]} />
              <meshStandardMaterial color="#ff4444" />
            </mesh>
            {/* Rocket tube */}
            <mesh position={[0.9, 0.4, 0.2]} rotation={[0, 0, Math.PI / 2]} castShadow>
              <cylinderGeometry args={[0.15, 0.12, 0.5, 8]} />
              <meshStandardMaterial color="#cc4400" />
            </mesh>
            {/* Glow effect */}
            <pointLight position={[1.0, 0.3, 0.2]} color="#ff6600" intensity={2} distance={3} />
          </group>
        )}
      </group>

      {/* Left leg */}
      <group name="leftLeg" position={[-0.2, 0.5, 0]}>
        <mesh position={[0, 0, 0]} castShadow>
          <boxGeometry args={[0.25, 0.8, 0.25]} />
          <meshStandardMaterial color="#4a4a8a" />
        </mesh>
        {/* Boot */}
        <mesh position={[0, -0.45, 0.05]} castShadow>
          <boxGeometry args={[0.3, 0.2, 0.35]} />
          <meshStandardMaterial color="#2a2a4a" />
        </mesh>
      </group>

      {/* Right leg */}
      <group name="rightLeg" position={[0.2, 0.5, 0]}>
        <mesh position={[0, 0, 0]} castShadow>
          <boxGeometry args={[0.25, 0.8, 0.25]} />
          <meshStandardMaterial color="#4a4a8a" />
        </mesh>
        {/* Boot */}
        <mesh position={[0, -0.45, 0.05]} castShadow>
          <boxGeometry args={[0.3, 0.2, 0.35]} />
          <meshStandardMaterial color="#2a2a4a" />
        </mesh>
      </group>

      {/* Selection circle */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.05, 0]}>
        <ringGeometry args={[1.2, 1.4, 32]} />
        <meshBasicMaterial color="#00bfff" transparent opacity={0.6} />
      </mesh>
    </group>
  )
}
