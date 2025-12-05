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
      {/* Base ground plane - lush jungle/grass green */}
      <mesh
        ref={groundRef}
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -0.1, 0]}
        receiveShadow
        onClick={handleClick}
      >
        <planeGeometry args={[mapSize, mapSize]} />
        <meshStandardMaterial color="#4a6a3a" />
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
  const laneColor = "#7a6a50" // Dirt/brown path color

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
      {/* Detailed fountain/spawn platform */}
      <Fountain isBlue={isBlue} />
    </group>
  )
}

// Detailed League of Legends style fountain/spawn area
function Fountain({ isBlue }: { isBlue: boolean }) {
  // Color palettes for blue and red side - more gray/concrete tones
  const stoneLight = isBlue ? "#9a9a9a" : "#9a9090"
  const stoneMid = isBlue ? "#787878" : "#787070"
  const stoneDark = isBlue ? "#555555" : "#554a4a"
  const stoneAccent = isBlue ? "#606870" : "#686060"
  const glowColor = isBlue ? "#4488ff" : "#ff4444"

  const numRadialSegments = 16 // Number of "pizza slice" segments
  const numRings = 5 // Number of concentric rings/tiers

  return (
    <group>
      {/* ============================================ */}
      {/* =========== OUTER STEPS/TIERS ============= */}
      {/* ============================================ */}

      {/* Outermost ring - stepped tiers going up */}
      {[...Array(numRings)].map((_, ringIdx) => {
        const outerRadius = 20 - ringIdx * 2.5
        const innerRadius = outerRadius - 2.2
        const height = 0.1 + ringIdx * 0.25
        const ringColor = ringIdx % 2 === 0 ? stoneMid : stoneLight

        return (
          <group key={`ring-${ringIdx}`}>
            {/* Ring base */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, height, 0]} receiveShadow castShadow>
              <ringGeometry args={[innerRadius, outerRadius, 48]} />
              <meshStandardMaterial color={ringColor} />
            </mesh>

            {/* Ring edge/lip */}
            <mesh position={[0, height + 0.1, 0]} receiveShadow castShadow>
              <torusGeometry args={[outerRadius - 0.1, 0.15, 8, 48]} />
              <meshStandardMaterial color={stoneDark} />
            </mesh>
          </group>
        )
      })}

      {/* ============================================ */}
      {/* ========== RADIAL STONE SEGMENTS ========== */}
      {/* ============================================ */}

      {/* Radial divider lines - like wagon wheel spokes */}
      {[...Array(numRadialSegments)].map((_, i) => {
        const angle = (i / numRadialSegments) * Math.PI * 2
        const length = 18
        const startRadius = 3

        return (
          <group key={`radial-${i}`}>
            {/* Main radial line */}
            <mesh
              position={[
                Math.cos(angle) * (startRadius + length / 2),
                0.6,
                Math.sin(angle) * (startRadius + length / 2)
              ]}
              rotation={[0, -angle + Math.PI / 2, 0]}
              receiveShadow
              castShadow
            >
              <boxGeometry args={[0.3, 0.25, length]} />
              <meshStandardMaterial color={stoneDark} />
            </mesh>

            {/* Decorative stone caps at intervals */}
            {[0.3, 0.5, 0.7, 0.9].map((t, j) => {
              const r = startRadius + length * t
              return (
                <mesh
                  key={`cap-${i}-${j}`}
                  position={[Math.cos(angle) * r, 0.8, Math.sin(angle) * r]}
                  castShadow
                >
                  <cylinderGeometry args={[0.4, 0.5, 0.3, 8]} />
                  <meshStandardMaterial color={stoneAccent} />
                </mesh>
              )
            })}
          </group>
        )
      })}

      {/* ============================================ */}
      {/* ======== CONCENTRIC RING PATTERNS ========= */}
      {/* ============================================ */}

      {/* Stone segments between radial lines - detailed floor pattern */}
      {[...Array(numRadialSegments)].map((_, segIdx) => {
        const angle1 = (segIdx / numRadialSegments) * Math.PI * 2
        const angle2 = ((segIdx + 1) / numRadialSegments) * Math.PI * 2
        const midAngle = (angle1 + angle2) / 2

        return (
          <group key={`seg-${segIdx}`}>
            {/* Inner segment stones */}
            {[...Array(4)].map((_, ringIdx) => {
              const innerR = 4 + ringIdx * 3.5
              const outerR = innerR + 3
              const midR = (innerR + outerR) / 2
              const stoneColor = (segIdx + ringIdx) % 2 === 0 ? stoneLight : stoneMid

              return (
                <mesh
                  key={`stone-${segIdx}-${ringIdx}`}
                  position={[Math.cos(midAngle) * midR, 0.55 + ringIdx * 0.08, Math.sin(midAngle) * midR]}
                  rotation={[-Math.PI / 2, 0, midAngle]}
                  receiveShadow
                >
                  <planeGeometry args={[2.8, (outerR - innerR) * 0.9]} />
                  <meshStandardMaterial color={stoneColor} />
                </mesh>
              )
            })}
          </group>
        )
      })}

      {/* ============================================ */}
      {/* ============ CENTER PLATFORM ============== */}
      {/* ============================================ */}

      {/* Central raised platform */}
      <mesh position={[0, 0.8, 0]} receiveShadow castShadow>
        <cylinderGeometry args={[4, 4.5, 0.6, 32]} />
        <meshStandardMaterial color={stoneDark} />
      </mesh>

      {/* Central decorative ring */}
      <mesh position={[0, 1.15, 0]} receiveShadow castShadow>
        <torusGeometry args={[3.5, 0.25, 12, 32]} />
        <meshStandardMaterial color={stoneAccent} />
      </mesh>

      {/* Inner center floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 1.2, 0]} receiveShadow>
        <circleGeometry args={[3.3, 32]} />
        <meshStandardMaterial color={stoneLight} />
      </mesh>

      {/* Center decorative pattern - interlocking stones */}
      {[...Array(8)].map((_, i) => {
        const angle = (i / 8) * Math.PI * 2
        const r = 2
        return (
          <mesh
            key={`center-stone-${i}`}
            position={[Math.cos(angle) * r, 1.22, Math.sin(angle) * r]}
            rotation={[-Math.PI / 2, 0, angle]}
            receiveShadow
          >
            <planeGeometry args={[1.2, 1.2]} />
            <meshStandardMaterial color={i % 2 === 0 ? stoneMid : stoneLight} />
          </mesh>
        )
      })}

      {/* Center emblem/design */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 1.25, 0]} receiveShadow>
        <ringGeometry args={[0.5, 1.2, 6]} />
        <meshStandardMaterial color={stoneDark} />
      </mesh>

      {/* ============================================ */}
      {/* ============ OUTER EDGE DETAILS =========== */}
      {/* ============================================ */}

      {/* Outer wall/barrier - semicircular amphitheater style */}
      {[...Array(24)].map((_, i) => {
        // Create wall segments for back half (away from map center)
        const startAngle = isBlue ? Math.PI * 0.7 : Math.PI * 1.7
        const endAngle = isBlue ? Math.PI * 1.3 : Math.PI * 0.3
        const angleRange = isBlue ? Math.PI * 0.6 : Math.PI * 0.6
        const angle = startAngle + (i / 24) * angleRange * 2 - angleRange
        const r = 22

        return (
          <group key={`wall-${i}`}>
            {/* Wall pillar */}
            <mesh
              position={[Math.cos(angle) * r, 1.5, Math.sin(angle) * r]}
              castShadow
            >
              <boxGeometry args={[1.5, 3, 0.8]} />
              <meshStandardMaterial color={stoneDark} />
            </mesh>

            {/* Pillar top */}
            <mesh
              position={[Math.cos(angle) * r, 3.2, Math.sin(angle) * r]}
              castShadow
            >
              <boxGeometry args={[1.8, 0.4, 1]} />
              <meshStandardMaterial color={stoneAccent} />
            </mesh>
          </group>
        )
      })}

      {/* ============================================ */}
      {/* ============= DECORATIVE STONES =========== */}
      {/* ============================================ */}

      {/* Scattered decorative stones around edges */}
      {[...Array(12)].map((_, i) => {
        // Use deterministic pseudo-random based on index
        const seed = i * 0.618033988749895 // Golden ratio for nice distribution
        const angle = (i / 12) * Math.PI * 2 + (seed % 0.2)
        const r = 19 + ((i * 7) % 20) / 10
        const size = 0.4 + ((i * 3) % 10) / 30

        return (
          <mesh
            key={`deco-stone-${i}`}
            position={[Math.cos(angle) * r, size / 2 + 0.3, Math.sin(angle) * r]}
            rotation={[(i * 0.1) % 0.3, (i * 0.5) % Math.PI, (i * 0.15) % 0.3]}
            castShadow
          >
            <dodecahedronGeometry args={[size, 0]} />
            <meshStandardMaterial color={stoneMid} />
          </mesh>
        )
      })}

      {/* ============================================ */}
      {/* ================ GLOW EFFECTS ============= */}
      {/* ============================================ */}

      {/* Healing aura on the ground */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.15, 0]} receiveShadow>
        <circleGeometry args={[15, 48]} />
        <meshStandardMaterial
          color={glowColor}
          transparent
          opacity={0.15}
          emissive={glowColor}
          emissiveIntensity={0.3}
        />
      </mesh>

      {/* Pulsing center glow */}
      <pointLight
        position={[0, 2, 0]}
        color={glowColor}
        intensity={8}
        distance={25}
      />

      {/* Ambient glow ring */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 1.3, 0]}>
        <ringGeometry args={[2.5, 3, 32]} />
        <meshStandardMaterial
          color={glowColor}
          emissive={glowColor}
          emissiveIntensity={0.5}
          transparent
          opacity={0.4}
        />
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
