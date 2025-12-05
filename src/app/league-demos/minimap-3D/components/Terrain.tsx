'use client'

import { useRef } from 'react'
import { ThreeEvent } from '@react-three/fiber'
import * as THREE from 'three'

interface TerrainProps {
  mapSize: number
  onGroundClick: (point: [number, number, number]) => void
}

export default function Terrain({ mapSize, onGroundClick }: TerrainProps) {
  const groundRef = useRef<THREE.Mesh>(null)
  const halfSize = mapSize / 2

  const handleClick = (e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation()
    const point = e.point
    onGroundClick([point.x, 0, point.z])
  }

  return (
    <group>
      {/* Base ground plane - jungle/grass color */}
      <mesh
        ref={groundRef}
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -0.1, 0]}
        receiveShadow
        onClick={handleClick}
      >
        <planeGeometry args={[mapSize, mapSize]} />
        <meshStandardMaterial color="#6a7a5a" />
      </mesh>

      {/* Void/edge areas */}
      <VoidEdges mapSize={mapSize} />

      {/* River */}
      <River mapSize={mapSize} />

      {/* Lanes */}
      <Lanes mapSize={mapSize} />

      {/* Bases */}
      <Base position={[-halfSize + 12, 0, halfSize - 12]} color="#3a5a6a" isBlue />
      <Base position={[halfSize - 12, 0, -halfSize + 12]} color="#5a4a4a" isBlue={false} />

      {/* Nexuses */}
      <Nexus position={[-halfSize + 12, 0, halfSize - 12]} color="#4488ff" />
      <Nexus position={[halfSize - 12, 0, -halfSize + 12]} color="#ff4444" />

      {/* Towers */}
      <Towers mapSize={mapSize} />

      {/* Objective pits */}
      <ObjectivePit position={[-30, 0, 10]} type="dragon" />
      <ObjectivePit position={[30, 0, -10]} type="baron" />

      {/* Bushes */}
      <Bushes mapSize={mapSize} />
    </group>
  )
}

function VoidEdges({ mapSize }: { mapSize: number }) {
  const halfSize = mapSize / 2
  const edgeSize = 10

  return (
    <group>
      {/* Cut corners to create diamond-ish shape */}
      {/* Top-left corner */}
      <mesh rotation={[-Math.PI / 2, 0, Math.PI / 4]} position={[-halfSize + 5, 0.01, -halfSize + 5]}>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial color="#1a2a3a" />
      </mesh>
      {/* Bottom-right corner */}
      <mesh rotation={[-Math.PI / 2, 0, Math.PI / 4]} position={[halfSize - 5, 0.01, halfSize - 5]}>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial color="#1a2a3a" />
      </mesh>
    </group>
  )
}

function River({ mapSize }: { mapSize: number }) {
  const halfSize = mapSize / 2

  // River runs diagonally from top-left area to bottom-right
  const riverWidth = 12
  const riverLength = mapSize * 0.7

  return (
    <group>
      <mesh
        rotation={[-Math.PI / 2, 0, Math.PI / 4]}
        position={[0, 0.02, 0]}
        receiveShadow
      >
        <planeGeometry args={[riverWidth, riverLength]} />
        <meshStandardMaterial
          color="#4a9aba"
          transparent
          opacity={0.9}
        />
      </mesh>

      {/* River highlights/waves */}
      <mesh
        rotation={[-Math.PI / 2, 0, Math.PI / 4]}
        position={[2, 0.03, -2]}
        receiveShadow
      >
        <planeGeometry args={[riverWidth * 0.6, riverLength * 0.8]} />
        <meshStandardMaterial
          color="#5abaca"
          transparent
          opacity={0.5}
        />
      </mesh>
    </group>
  )
}

function Lanes({ mapSize }: { mapSize: number }) {
  const halfSize = mapSize / 2
  const laneWidth = 8
  const laneColor = "#8a9a7a"

  return (
    <group>
      {/* Top lane - horizontal part */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, -halfSize + 6]} receiveShadow>
        <planeGeometry args={[mapSize - 30, laneWidth]} />
        <meshStandardMaterial color={laneColor} />
      </mesh>

      {/* Top lane - vertical part (left side) */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[-halfSize + 6, 0.01, 0]} receiveShadow>
        <planeGeometry args={[laneWidth, mapSize - 30]} />
        <meshStandardMaterial color={laneColor} />
      </mesh>

      {/* Bot lane - horizontal part */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, halfSize - 6]} receiveShadow>
        <planeGeometry args={[mapSize - 30, laneWidth]} />
        <meshStandardMaterial color={laneColor} />
      </mesh>

      {/* Bot lane - vertical part (right side) */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[halfSize - 6, 0.01, 0]} receiveShadow>
        <planeGeometry args={[laneWidth, mapSize - 30]} />
        <meshStandardMaterial color={laneColor} />
      </mesh>

      {/* Mid lane - diagonal */}
      <mesh rotation={[-Math.PI / 2, 0, Math.PI / 4]} position={[0, 0.01, 0]} receiveShadow>
        <planeGeometry args={[laneWidth, mapSize * 1.2]} />
        <meshStandardMaterial color={laneColor} />
      </mesh>
    </group>
  )
}

function Base({ position, color, isBlue }: { position: [number, number, number]; color: string; isBlue: boolean }) {
  return (
    <group position={position}>
      {/* Base platform */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.05, 0]} receiveShadow>
        <circleGeometry args={[18, 32]} />
        <meshStandardMaterial color={color} />
      </mesh>

      {/* Inner platform */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.1, 0]} receiveShadow>
        <circleGeometry args={[12, 32]} />
        <meshStandardMaterial color={isBlue ? "#4a6a7a" : "#6a5a5a"} />
      </mesh>
    </group>
  )
}

function Nexus({ position, color }: { position: [number, number, number]; color: string }) {
  return (
    <group position={position}>
      {/* Nexus crystal */}
      <mesh position={[0, 4, 0]} castShadow>
        <octahedronGeometry args={[3, 0]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.5}
        />
      </mesh>

      {/* Nexus base */}
      <mesh position={[0, 0.5, 0]} castShadow>
        <cylinderGeometry args={[4, 5, 1, 8]} />
        <meshStandardMaterial color="#4a4a5a" />
      </mesh>
    </group>
  )
}

function Towers({ mapSize }: { mapSize: number }) {
  const halfSize = mapSize / 2

  const blueTowers = [
    [-halfSize + 20, 0, halfSize - 35],
    [-halfSize + 20, 0, halfSize - 55],
    [-halfSize + 20, 0, 0],
    [-halfSize + 35, 0, halfSize - 20],
    [-halfSize + 55, 0, halfSize - 20],
    [0, 0, halfSize - 20],
    [-40, 0, 40],
    [-25, 0, 25],
  ]

  const redTowers = [
    [halfSize - 20, 0, -halfSize + 35],
    [halfSize - 20, 0, -halfSize + 55],
    [halfSize - 20, 0, 0],
    [halfSize - 35, 0, -halfSize + 20],
    [halfSize - 55, 0, -halfSize + 20],
    [0, 0, -halfSize + 20],
    [40, 0, -40],
    [25, 0, -25],
  ]

  return (
    <group>
      {blueTowers.map((pos, i) => (
        <Tower key={`blue-${i}`} position={pos as [number, number, number]} color="#4488ff" />
      ))}
      {redTowers.map((pos, i) => (
        <Tower key={`red-${i}`} position={pos as [number, number, number]} color="#ff4444" />
      ))}
    </group>
  )
}

function Tower({ position, color }: { position: [number, number, number]; color: string }) {
  return (
    <group position={position}>
      {/* Tower base */}
      <mesh position={[0, 1, 0]} castShadow>
        <cylinderGeometry args={[1.5, 2, 2, 8]} />
        <meshStandardMaterial color="#4a4a5a" />
      </mesh>

      {/* Tower body */}
      <mesh position={[0, 4, 0]} castShadow>
        <cylinderGeometry args={[1, 1.5, 4, 8]} />
        <meshStandardMaterial color="#5a5a6a" />
      </mesh>

      {/* Tower top crystal */}
      <mesh position={[0, 7, 0]} castShadow>
        <octahedronGeometry args={[1, 0]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.8}
        />
      </mesh>
    </group>
  )
}

function ObjectivePit({ position, type }: { position: [number, number, number]; type: 'dragon' | 'baron' }) {
  const color = type === 'dragon' ? '#4a6a8a' : '#6a4a6a'
  const creatureColor = type === 'dragon' ? '#8844aa' : '#aa44aa'

  return (
    <group position={position}>
      {/* Pit depression */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]}>
        <circleGeometry args={[8, 32]} />
        <meshStandardMaterial color={color} />
      </mesh>

      {/* Pit rim */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.1, 0]}>
        <ringGeometry args={[7, 9, 32]} />
        <meshStandardMaterial color="#3a4a5a" />
      </mesh>

      {/* Creature placeholder */}
      <mesh position={[0, 2, 0]} castShadow>
        <sphereGeometry args={[2, 16, 16]} />
        <meshStandardMaterial
          color={creatureColor}
          emissive={creatureColor}
          emissiveIntensity={0.3}
        />
      </mesh>
    </group>
  )
}

function Bushes({ mapSize }: { mapSize: number }) {
  const halfSize = mapSize / 2

  const bushPositions: [number, number, number][] = [
    // River bushes
    [-15, 0, 5],
    [15, 0, -5],
    [-35, 0, 15],
    [35, 0, -15],
    // Lane bushes
    [-halfSize + 15, 0, -20],
    [-halfSize + 15, 0, 20],
    [halfSize - 15, 0, -20],
    [halfSize - 15, 0, 20],
    [-20, 0, -halfSize + 15],
    [20, 0, -halfSize + 15],
    [-20, 0, halfSize - 15],
    [20, 0, halfSize - 15],
    // Jungle bushes
    [-45, 0, 45],
    [-55, 0, 35],
    [45, 0, -45],
    [55, 0, -35],
  ]

  return (
    <group>
      {bushPositions.map((pos, i) => (
        <Bush key={i} position={pos} />
      ))}
    </group>
  )
}

function Bush({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      <mesh position={[0, 0.8, 0]} castShadow>
        <sphereGeometry args={[2, 8, 8]} />
        <meshStandardMaterial color="#2a5a3a" transparent opacity={0.9} />
      </mesh>
      <mesh position={[-1, 0.6, 0.5]} castShadow>
        <sphereGeometry args={[1.5, 8, 8]} />
        <meshStandardMaterial color="#3a6a4a" transparent opacity={0.9} />
      </mesh>
      <mesh position={[1, 0.6, -0.5]} castShadow>
        <sphereGeometry args={[1.5, 8, 8]} />
        <meshStandardMaterial color="#3a6a4a" transparent opacity={0.9} />
      </mesh>
    </group>
  )
}
