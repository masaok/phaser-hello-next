'use client'

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { Projectile, Chomper } from './AbilitySystem'

interface ProjectilesProps {
  projectiles: Projectile[]
  chompers: Chomper[]
}

export default function Projectiles({ projectiles, chompers }: ProjectilesProps) {
  return (
    <group>
      {projectiles.map(proj => {
        if (proj.type === 'zap') {
          return <ZapProjectile key={proj.id} projectile={proj} />
        } else if (proj.type === 'rocket') {
          return <RocketProjectile key={proj.id} projectile={proj} />
        }
        return null
      })}
      {chompers.map(chomper => (
        <ChomperTrap key={chomper.id} chomper={chomper} />
      ))}
    </group>
  )
}

function ZapProjectile({ projectile }: { projectile: Projectile }) {
  const groupRef = useRef<THREE.Group>(null)
  const glowRef = useRef<THREE.Mesh>(null)

  useFrame((_, delta) => {
    if (glowRef.current) {
      // Pulsing glow effect
      const scale = 1 + Math.sin(Date.now() * 0.02) * 0.2
      glowRef.current.scale.setScalar(scale)
    }
  })

  // Calculate rotation from direction
  const angle = Math.atan2(projectile.direction[0], projectile.direction[2])

  return (
    <group
      ref={groupRef}
      position={projectile.position}
      rotation={[0, angle, 0]}
    >
      {/* Core beam */}
      <mesh rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.3, 0.3, 4, 8]} />
        <meshStandardMaterial
          color="#00ffff"
          emissive="#00ffff"
          emissiveIntensity={2}
        />
      </mesh>

      {/* Outer glow */}
      <mesh ref={glowRef} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.6, 0.6, 4.5, 8]} />
        <meshBasicMaterial
          color="#00ffff"
          transparent
          opacity={0.3}
        />
      </mesh>

      {/* Trail particles */}
      <mesh position={[-2, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.2, 0.4, 2, 8]} />
        <meshBasicMaterial
          color="#0088ff"
          transparent
          opacity={0.5}
        />
      </mesh>

      {/* Point light for glow effect */}
      <pointLight color="#00ffff" intensity={5} distance={10} />
    </group>
  )
}

function RocketProjectile({ projectile }: { projectile: Projectile }) {
  const groupRef = useRef<THREE.Group>(null)
  const flameRef = useRef<THREE.Mesh>(null)

  useFrame((_, delta) => {
    if (groupRef.current) {
      // Slight wobble for dramatic effect
      groupRef.current.rotation.z = Math.sin(Date.now() * 0.01) * 0.05
    }
    if (flameRef.current) {
      // Flickering flame
      const scale = 1 + Math.random() * 0.3
      flameRef.current.scale.set(scale, 1 + Math.random() * 0.5, scale)
    }
  })

  const angle = Math.atan2(projectile.direction[0], projectile.direction[2])

  // Scale up as it travels (rocket grows!)
  const travelScale = 1 + (projectile.distanceTraveled || 0) * 0.01
  const scale = Math.min(travelScale, 3)

  return (
    <group
      ref={groupRef}
      position={projectile.position}
      rotation={[0, angle, 0]}
      scale={[scale, scale, scale]}
    >
      {/* Rocket body */}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 1, 0]}>
        <cylinderGeometry args={[0.8, 0.5, 5, 8]} />
        <meshStandardMaterial color="#ff6600" />
      </mesh>

      {/* Rocket nose */}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 1, 2.5]}>
        <coneGeometry args={[0.8, 2, 8]} />
        <meshStandardMaterial color="#ff4444" />
      </mesh>

      {/* Fins */}
      {[0, Math.PI / 2, Math.PI, Math.PI * 1.5].map((rot, i) => (
        <mesh
          key={i}
          position={[Math.sin(rot) * 0.8, 1, -2]}
          rotation={[0, rot, 0]}
        >
          <boxGeometry args={[0.1, 1.2, 1.5]} />
          <meshStandardMaterial color="#cc3333" />
        </mesh>
      ))}

      {/* Flame trail */}
      <mesh ref={flameRef} rotation={[Math.PI / 2, 0, 0]} position={[0, 1, -3]}>
        <coneGeometry args={[0.7, 3, 8]} />
        <meshStandardMaterial
          color="#ffff00"
          emissive="#ff6600"
          emissiveIntensity={2}
        />
      </mesh>

      {/* Inner flame */}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 1, -2.5]}>
        <coneGeometry args={[0.4, 2, 8]} />
        <meshStandardMaterial
          color="#ffffff"
          emissive="#ffff00"
          emissiveIntensity={3}
        />
      </mesh>

      {/* Glow */}
      <pointLight color="#ff6600" intensity={10 * scale} distance={20} />
    </group>
  )
}

function ChomperTrap({ chomper }: { chomper: Chomper }) {
  const groupRef = useRef<THREE.Group>(null)
  const jawRef = useRef<THREE.Group>(null)

  useFrame(() => {
    if (jawRef.current && !chomper.triggered) {
      // Snapping animation
      const snap = Math.sin(Date.now() * 0.005) * 0.3
      jawRef.current.rotation.x = snap
    }
  })

  const elapsed = (Date.now() - chomper.createdAt) / 1000
  const remainingTime = chomper.duration - elapsed
  const opacity = Math.min(1, remainingTime) // Fade out in last second

  return (
    <group ref={groupRef} position={chomper.position}>
      {/* Base */}
      <mesh position={[0, 0.2, 0]}>
        <cylinderGeometry args={[1.2, 1.5, 0.4, 8]} />
        <meshStandardMaterial
          color="#ff1493"
          emissive="#ff1493"
          emissiveIntensity={0.5}
          transparent
          opacity={opacity}
        />
      </mesh>

      {/* Jaws */}
      <group ref={jawRef}>
        {/* Upper teeth */}
        {[-0.6, 0, 0.6].map((x, i) => (
          <mesh key={`upper-${i}`} position={[x, 0.8, 0]}>
            <coneGeometry args={[0.2, 0.6, 4]} />
            <meshStandardMaterial
              color="#ffffff"
              transparent
              opacity={opacity}
            />
          </mesh>
        ))}

        {/* Lower teeth (pointing up) */}
        {[-0.3, 0.3].map((x, i) => (
          <mesh key={`lower-${i}`} position={[x, 0.5, 0]} rotation={[Math.PI, 0, 0]}>
            <coneGeometry args={[0.15, 0.5, 4]} />
            <meshStandardMaterial
              color="#ffffff"
              transparent
              opacity={opacity}
            />
          </mesh>
        ))}
      </group>

      {/* Glow ring */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.1, 0]}>
        <ringGeometry args={[1.3, 1.6, 32]} />
        <meshBasicMaterial
          color="#ff1493"
          transparent
          opacity={opacity * 0.5}
        />
      </mesh>

      {/* Warning light */}
      <pointLight
        color="#ff1493"
        intensity={3 * opacity}
        distance={8}
      />
    </group>
  )
}
