'use client'

import { useThree, useFrame } from '@react-three/fiber'
import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'

interface CameraControllerProps {
  championPosition: [number, number, number]
}

// LoL-style camera angle (56 degrees from horizontal)
const CAMERA_ANGLE = 56 * (Math.PI / 180)
const MIN_ZOOM = 30
const MAX_ZOOM = 200
const DEFAULT_ZOOM = 50
const PAN_SPEED = 0.5
const EDGE_PAN_ZONE = 50 // pixels from screen edge
const EDGE_PAN_SPEED = 100

export default function CameraController({ championPosition, onViewportChange }: CameraControllerProps & { onViewportChange?: (viewport: { x: number; z: number; width: number; height: number }) => void }) {
  const { camera, gl } = useThree()
  const [zoom, setZoom] = useState(DEFAULT_ZOOM)
  const [cameraTarget, setCameraTarget] = useState<[number, number, number]>([0, 0, 0])
  const [isFollowing, setIsFollowing] = useState(true)
  const keysPressed = useRef<Set<string>>(new Set())

  // Set up camera position based on zoom and angle
  useEffect(() => {
    const distance = zoom / Math.tan(CAMERA_ANGLE)
    const targetX = isFollowing ? championPosition[0] : cameraTarget[0]
    const targetZ = isFollowing ? championPosition[2] : cameraTarget[2]

    camera.position.set(targetX, zoom, targetZ + distance)
    camera.lookAt(targetX, 0, targetZ)

    // Calculate visible viewport on the ground plane
    // Use the camera's FOV and aspect ratio to determine visible area
    if (onViewportChange) {
      const aspectRatio = gl.domElement.clientWidth / gl.domElement.clientHeight
      const fov = (camera as THREE.PerspectiveCamera).fov * (Math.PI / 180)

      // Calculate visible height at ground level
      const visibleHeight = 2 * zoom * Math.tan(fov / 2)
      const visibleWidth = visibleHeight * aspectRatio

      onViewportChange({
        x: targetX,
        z: targetZ,
        width: visibleWidth,
        height: visibleHeight,
      })
    }
  }, [camera, gl, zoom, championPosition, cameraTarget, isFollowing, onViewportChange])

  // Mouse wheel zoom
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault()
      setZoom(prev => {
        const newZoom = prev + e.deltaY * 0.1
        return Math.max(MIN_ZOOM, Math.min(MAX_ZOOM, newZoom))
      })
    }

    const canvas = gl.domElement
    canvas.addEventListener('wheel', handleWheel, { passive: false })
    return () => canvas.removeEventListener('wheel', handleWheel)
  }, [gl])

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      keysPressed.current.add(e.key.toLowerCase())

      // Spacebar to toggle camera lock
      if (e.key === ' ') {
        setIsFollowing(prev => !prev)
        if (!isFollowing) {
          setCameraTarget([championPosition[0], 0, championPosition[2]])
        }
      }
    }

    const handleKeyUp = (e: KeyboardEvent) => {
      keysPressed.current.delete(e.key.toLowerCase())
    }

    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
    }
  }, [championPosition, isFollowing])

  // Update camera based on keyboard input
  useFrame((_, delta) => {
    if (isFollowing) return

    let dx = 0
    let dz = 0

    if (keysPressed.current.has('w') || keysPressed.current.has('arrowup')) {
      dz -= PAN_SPEED * delta * 60
    }
    if (keysPressed.current.has('s') || keysPressed.current.has('arrowdown')) {
      dz += PAN_SPEED * delta * 60
    }
    if (keysPressed.current.has('a') || keysPressed.current.has('arrowleft')) {
      dx -= PAN_SPEED * delta * 60
    }
    if (keysPressed.current.has('d') || keysPressed.current.has('arrowright')) {
      dx += PAN_SPEED * delta * 60
    }

    if (dx !== 0 || dz !== 0) {
      setCameraTarget(prev => [
        Math.max(-100, Math.min(100, prev[0] + dx)),
        prev[1],
        Math.max(-100, Math.min(100, prev[2] + dz)),
      ])
    }
  })

  // Edge panning with mouse
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isFollowing) return

      const { clientX, clientY } = e
      const { innerWidth, innerHeight } = window

      let dx = 0
      let dz = 0

      if (clientX < EDGE_PAN_ZONE) {
        dx = -EDGE_PAN_SPEED * 0.001
      } else if (clientX > innerWidth - EDGE_PAN_ZONE) {
        dx = EDGE_PAN_SPEED * 0.001
      }

      if (clientY < EDGE_PAN_ZONE) {
        dz = -EDGE_PAN_SPEED * 0.001
      } else if (clientY > innerHeight - EDGE_PAN_ZONE) {
        dz = EDGE_PAN_SPEED * 0.001
      }

      if (dx !== 0 || dz !== 0) {
        setCameraTarget(prev => [
          Math.max(-100, Math.min(100, prev[0] + dx)),
          prev[1],
          Math.max(-100, Math.min(100, prev[2] + dz)),
        ])
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [isFollowing])

  return null
}
