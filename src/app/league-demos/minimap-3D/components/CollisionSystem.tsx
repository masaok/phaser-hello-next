'use client'

// Collision detection system for the map
// Defines barriers that Jinx cannot walk through

export interface CircleCollider {
  type: 'circle'
  x: number
  z: number
  radius: number
}

export interface BoxCollider {
  type: 'box'
  x: number
  z: number
  width: number
  depth: number
  rotation?: number // radians
}

export type Collider = CircleCollider | BoxCollider

// Generate all collision barriers for the map
export function getMapColliders(mapSize: number): Collider[] {
  const halfSize = mapSize / 2
  const colliders: Collider[] = []

  // ============================================
  // TOWERS - circular colliders
  // ============================================

  // Blue side towers
  const blueTowers: [number, number][] = [
    [-halfSize + 20, halfSize - 35],
    [-halfSize + 20, halfSize - 55],
    [-halfSize + 20, 0],
    [-halfSize + 35, halfSize - 20],
    [-halfSize + 55, halfSize - 20],
    [0, halfSize - 20],
    [-40, 40],
    [-25, 25],
  ]

  // Red side towers
  const redTowers: [number, number][] = [
    [halfSize - 20, -halfSize + 35],
    [halfSize - 20, -halfSize + 55],
    [halfSize - 20, 0],
    [halfSize - 35, -halfSize + 20],
    [halfSize - 55, -halfSize + 20],
    [0, -halfSize + 20],
    [40, -40],
    [25, -25],
  ]

  // Add tower colliders (radius 2.5 to account for tower base)
  for (const [x, z] of [...blueTowers, ...redTowers]) {
    colliders.push({ type: 'circle', x, z, radius: 3 })
  }

  // ============================================
  // NEXUSES - larger circular colliders
  // ============================================

  // Blue nexus
  colliders.push({
    type: 'circle',
    x: -halfSize + 12,
    z: halfSize - 12,
    radius: 6,
  })

  // Red nexus
  colliders.push({
    type: 'circle',
    x: halfSize - 12,
    z: -halfSize + 12,
    radius: 6,
  })

  // ============================================
  // OBJECTIVE PITS - circular colliders with walls
  // ============================================

  // Dragon pit rim
  colliders.push({ type: 'circle', x: -30, z: 10, radius: 10 })

  // Baron pit rim
  colliders.push({ type: 'circle', x: 30, z: -10, radius: 10 })

  // ============================================
  // MAP EDGE BARRIERS - prevent going off map
  // ============================================

  // Top edge
  colliders.push({
    type: 'box',
    x: 0,
    z: -halfSize - 5,
    width: mapSize + 20,
    depth: 10,
  })

  // Bottom edge
  colliders.push({
    type: 'box',
    x: 0,
    z: halfSize + 5,
    width: mapSize + 20,
    depth: 10,
  })

  // Left edge
  colliders.push({
    type: 'box',
    x: -halfSize - 5,
    z: 0,
    width: 10,
    depth: mapSize + 20,
  })

  // Right edge
  colliders.push({
    type: 'box',
    x: halfSize + 5,
    z: 0,
    width: 10,
    depth: mapSize + 20,
  })

  // ============================================
  // JUNGLE WALLS - natural barriers
  // ============================================

  // Blue side jungle wall (upper area)
  colliders.push({
    type: 'box',
    x: -halfSize + 45,
    z: -15,
    width: 30,
    depth: 8,
    rotation: Math.PI / 6,
  })

  // Red side jungle wall (lower area)
  colliders.push({
    type: 'box',
    x: halfSize - 45,
    z: 15,
    width: 30,
    depth: 8,
    rotation: Math.PI / 6,
  })

  // River crossing barrier walls
  colliders.push({
    type: 'box',
    x: -20,
    z: -25,
    width: 15,
    depth: 6,
    rotation: -Math.PI / 4,
  })

  colliders.push({
    type: 'box',
    x: 20,
    z: 25,
    width: 15,
    depth: 6,
    rotation: -Math.PI / 4,
  })

  // ============================================
  // FOUNTAIN WALLS - semicircle barriers at spawn
  // ============================================

  // Blue fountain back wall (approximate with boxes)
  for (let i = 0; i < 8; i++) {
    const angle = Math.PI * 0.7 + (i / 8) * Math.PI * 0.6
    const r = 24
    const x = -halfSize + 12 + Math.cos(angle) * r
    const z = halfSize - 12 + Math.sin(angle) * r
    colliders.push({
      type: 'box',
      x,
      z,
      width: 4,
      depth: 2,
      rotation: angle + Math.PI / 2,
    })
  }

  // Red fountain back wall
  for (let i = 0; i < 8; i++) {
    const angle = Math.PI * 1.7 + (i / 8) * Math.PI * 0.6
    const r = 24
    const x = halfSize - 12 + Math.cos(angle) * r
    const z = -halfSize + 12 + Math.sin(angle) * r
    colliders.push({
      type: 'box',
      x,
      z,
      width: 4,
      depth: 2,
      rotation: angle + Math.PI / 2,
    })
  }

  return colliders
}

// Check if a point collides with any collider
export function checkCollision(
  x: number,
  z: number,
  colliders: Collider[],
  characterRadius: number = 1.5
): boolean {
  for (const collider of colliders) {
    if (collider.type === 'circle') {
      const dx = x - collider.x
      const dz = z - collider.z
      const distance = Math.sqrt(dx * dx + dz * dz)
      if (distance < collider.radius + characterRadius) {
        return true
      }
    } else if (collider.type === 'box') {
      // Transform point to box local space
      const cos = Math.cos(-(collider.rotation || 0))
      const sin = Math.sin(-(collider.rotation || 0))
      const localX = (x - collider.x) * cos - (z - collider.z) * sin
      const localZ = (x - collider.x) * sin + (z - collider.z) * cos

      // Check AABB collision
      const halfWidth = collider.width / 2 + characterRadius
      const halfDepth = collider.depth / 2 + characterRadius

      if (
        Math.abs(localX) < halfWidth &&
        Math.abs(localZ) < halfDepth
      ) {
        return true
      }
    }
  }
  return false
}

// Find the closest valid position when blocked by a collider
export function resolveCollision(
  currentX: number,
  currentZ: number,
  targetX: number,
  targetZ: number,
  colliders: Collider[],
  characterRadius: number = 1.5
): [number, number] {
  // If no collision at target, return target
  if (!checkCollision(targetX, targetZ, colliders, characterRadius)) {
    return [targetX, targetZ]
  }

  // Binary search to find the farthest valid position along the path
  let validX = currentX
  let validZ = currentZ
  const steps = 10

  for (let i = 1; i <= steps; i++) {
    const t = i / steps
    const testX = currentX + (targetX - currentX) * t
    const testZ = currentZ + (targetZ - currentZ) * t

    if (checkCollision(testX, testZ, colliders, characterRadius)) {
      break
    }
    validX = testX
    validZ = testZ
  }

  // Try sliding along walls
  const dx = targetX - currentX
  const dz = targetZ - currentZ

  // Try moving only in X
  if (!checkCollision(targetX, currentZ, colliders, characterRadius)) {
    return [targetX, currentZ]
  }

  // Try moving only in Z
  if (!checkCollision(currentX, targetZ, colliders, characterRadius)) {
    return [currentX, targetZ]
  }

  return [validX, validZ]
}
