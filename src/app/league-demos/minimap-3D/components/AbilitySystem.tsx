'use client'

import { useCallback, useEffect, useRef } from 'react'

// Jinx ability definitions
export interface Ability {
  key: string
  name: string
  cooldown: number // seconds
  manaCost: number
  currentCooldown: number
  description: string
}

export interface AbilityState {
  q: Ability
  w: Ability
  e: Ability
  r: Ability
  mana: number
  maxMana: number
  health: number
  maxHealth: number
  // Q-specific state
  usingRockets: boolean // false = minigun, true = rockets
}

export const initialAbilityState: AbilityState = {
  q: {
    key: 'Q',
    name: 'Switcheroo!',
    cooldown: 0.5,
    manaCost: 0, // Rockets cost mana per attack, toggle is free
    currentCooldown: 0,
    description: 'Toggle between Minigun and Rocket Launcher',
  },
  w: {
    key: 'W',
    name: 'Zap!',
    cooldown: 8,
    manaCost: 50,
    currentCooldown: 0,
    description: 'Fire a shock blast that damages and slows the first enemy hit',
  },
  e: {
    key: 'E',
    name: 'Flame Chompers!',
    cooldown: 12,
    manaCost: 70,
    currentCooldown: 0,
    description: 'Throw out 3 chompers that root enemies who step on them',
  },
  r: {
    key: 'R',
    name: 'Super Mega Death Rocket!',
    cooldown: 60,
    manaCost: 100,
    currentCooldown: 0,
    description: 'Fire a global rocket that explodes on the first enemy champion hit',
  },
  mana: 300,
  maxMana: 300,
  health: 610,
  maxHealth: 610,
  usingRockets: false,
}

// Projectile types for ability effects
export interface Projectile {
  id: string
  type: 'zap' | 'rocket' | 'chomper'
  position: [number, number, number]
  direction: [number, number, number]
  speed: number
  createdAt: number
  maxDistance?: number
  distanceTraveled?: number
}

export interface Chomper {
  id: string
  position: [number, number, number]
  createdAt: number
  duration: number // seconds until it expires
  triggered: boolean
}

interface UseAbilitiesProps {
  championPosition: [number, number, number]
  championRotation: number
  onCastAbility?: (ability: string) => void
}

export function useAbilities({ championPosition, championRotation, onCastAbility }: UseAbilitiesProps) {
  const stateRef = useRef<AbilityState>(initialAbilityState)
  const projectilesRef = useRef<Projectile[]>([])
  const chompersRef = useRef<Chomper[]>([])
  const lastUpdateRef = useRef<number>(Date.now())

  // Update cooldowns
  const updateCooldowns = useCallback((delta: number) => {
    const state = stateRef.current

    if (state.q.currentCooldown > 0) {
      state.q.currentCooldown = Math.max(0, state.q.currentCooldown - delta)
    }
    if (state.w.currentCooldown > 0) {
      state.w.currentCooldown = Math.max(0, state.w.currentCooldown - delta)
    }
    if (state.e.currentCooldown > 0) {
      state.e.currentCooldown = Math.max(0, state.e.currentCooldown - delta)
    }
    if (state.r.currentCooldown > 0) {
      state.r.currentCooldown = Math.max(0, state.r.currentCooldown - delta)
    }

    // Regenerate mana slowly
    if (state.mana < state.maxMana) {
      state.mana = Math.min(state.maxMana, state.mana + 5 * delta)
    }
  }, [])

  // Cast Q - Switcheroo
  const castQ = useCallback(() => {
    const state = stateRef.current
    if (state.q.currentCooldown > 0) return false

    state.usingRockets = !state.usingRockets
    state.q.currentCooldown = state.q.cooldown
    onCastAbility?.('q')
    return true
  }, [onCastAbility])

  // Cast W - Zap
  const castW = useCallback((targetDirection?: [number, number, number]) => {
    const state = stateRef.current
    if (state.w.currentCooldown > 0 || state.mana < state.w.manaCost) return false

    state.mana -= state.w.manaCost
    state.w.currentCooldown = state.w.cooldown

    // Create zap projectile
    const direction = targetDirection || [
      Math.sin(championRotation),
      0,
      Math.cos(championRotation),
    ]

    const projectile: Projectile = {
      id: `zap-${Date.now()}`,
      type: 'zap',
      position: [...championPosition],
      direction: direction as [number, number, number],
      speed: 80,
      createdAt: Date.now(),
      maxDistance: 100,
      distanceTraveled: 0,
    }

    projectilesRef.current.push(projectile)
    onCastAbility?.('w')
    return true
  }, [championPosition, championRotation, onCastAbility])

  // Cast E - Flame Chompers
  const castE = useCallback((targetPosition?: [number, number, number]) => {
    const state = stateRef.current
    if (state.e.currentCooldown > 0 || state.mana < state.e.manaCost) return false

    state.mana -= state.e.manaCost
    state.e.currentCooldown = state.e.cooldown

    // Place 3 chompers in a line
    const basePos = targetPosition || championPosition
    const direction = [Math.sin(championRotation), 0, Math.cos(championRotation)]

    for (let i = 0; i < 3; i++) {
      const offset = (i - 1) * 3 // -3, 0, 3
      const perpX = Math.cos(championRotation) * offset
      const perpZ = -Math.sin(championRotation) * offset

      const chomper: Chomper = {
        id: `chomper-${Date.now()}-${i}`,
        position: [
          basePos[0] + direction[0] * 8 + perpX,
          0.5,
          basePos[2] + direction[2] * 8 + perpZ,
        ],
        createdAt: Date.now(),
        duration: 5,
        triggered: false,
      }

      chompersRef.current.push(chomper)
    }

    onCastAbility?.('e')
    return true
  }, [championPosition, championRotation, onCastAbility])

  // Cast R - Super Mega Death Rocket
  const castR = useCallback((targetDirection?: [number, number, number]) => {
    const state = stateRef.current
    if (state.r.currentCooldown > 0 || state.mana < state.r.manaCost) return false

    state.mana -= state.r.manaCost
    state.r.currentCooldown = state.r.cooldown

    const direction = targetDirection || [
      Math.sin(championRotation),
      0,
      Math.cos(championRotation),
    ]

    const projectile: Projectile = {
      id: `rocket-${Date.now()}`,
      type: 'rocket',
      position: [...championPosition],
      direction: direction as [number, number, number],
      speed: 40, // Slower but more powerful
      createdAt: Date.now(),
      maxDistance: 500, // Global range
      distanceTraveled: 0,
    }

    projectilesRef.current.push(projectile)
    onCastAbility?.('r')
    return true
  }, [championPosition, championRotation, onCastAbility])

  // Update projectiles
  const updateProjectiles = useCallback((delta: number) => {
    projectilesRef.current = projectilesRef.current.filter(proj => {
      // Move projectile
      proj.position[0] += proj.direction[0] * proj.speed * delta
      proj.position[2] += proj.direction[2] * proj.speed * delta
      proj.distanceTraveled = (proj.distanceTraveled || 0) + proj.speed * delta

      // Remove if traveled max distance
      if (proj.maxDistance && proj.distanceTraveled >= proj.maxDistance) {
        return false
      }

      // Remove if out of bounds
      if (Math.abs(proj.position[0]) > 150 || Math.abs(proj.position[2]) > 150) {
        return false
      }

      return true
    })
  }, [])

  // Update chompers
  const updateChompers = useCallback(() => {
    const now = Date.now()
    chompersRef.current = chompersRef.current.filter(chomper => {
      const elapsed = (now - chomper.createdAt) / 1000
      return elapsed < chomper.duration
    })
  }, [])

  return {
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
  }
}
