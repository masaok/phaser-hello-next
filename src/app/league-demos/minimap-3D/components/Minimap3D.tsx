'use client'

interface Minimap3DProps {
  championPosition: [number, number, number]
  mapSize: number
  viewport?: { x: number; z: number; width: number; height: number }
}

const MINIMAP_SIZE = 200
const MINIMAP_MARGIN = 16

export default function Minimap3D({ championPosition, mapSize, viewport }: Minimap3DProps) {
  const halfMap = mapSize / 2

  // Convert 3D world position to minimap position
  // World: x goes left to right, z goes top to bottom (in 3D space)
  // Minimap: origin top-left, x goes right, y goes down
  const normalizedX = (championPosition[0] + halfMap) / mapSize
  const normalizedY = (championPosition[2] + halfMap) / mapSize

  const minimapX = normalizedX * MINIMAP_SIZE
  const minimapY = normalizedY * MINIMAP_SIZE

  // Calculate viewport rectangle on minimap
  const viewportRect = viewport ? {
    x: ((viewport.x + halfMap) / mapSize) * MINIMAP_SIZE - (viewport.width / mapSize) * MINIMAP_SIZE / 2,
    y: ((viewport.z + halfMap) / mapSize) * MINIMAP_SIZE - (viewport.height / mapSize) * MINIMAP_SIZE / 2,
    width: (viewport.width / mapSize) * MINIMAP_SIZE,
    height: (viewport.height / mapSize) * MINIMAP_SIZE,
  } : null

  return (
    <div
      className="absolute pointer-events-none"
      style={{
        right: MINIMAP_MARGIN,
        bottom: MINIMAP_MARGIN,
        width: MINIMAP_SIZE,
        height: MINIMAP_SIZE,
      }}
    >
      {/* Minimap background */}
      <div
        className="absolute inset-0 rounded"
        style={{
          background: 'linear-gradient(135deg, #3a5a4a 0%, #5a7a6a 50%, #4a6a5a 100%)',
          border: '2px solid #c9aa71',
        }}
      >
        {/* River diagonal */}
        <div
          className="absolute"
          style={{
            width: '140%',
            height: 12,
            background: 'linear-gradient(90deg, #4a9aba 0%, #5abaca 50%, #4a9aba 100%)',
            top: '50%',
            left: '-20%',
            transform: 'rotate(45deg) translateY(-50%)',
            transformOrigin: 'center',
            opacity: 0.9,
          }}
        />

        {/* Lanes */}
        {/* Top lane */}
        <div
          className="absolute bg-[#8a9a7a]"
          style={{ top: 8, left: 20, right: 20, height: 8 }}
        />
        <div
          className="absolute bg-[#8a9a7a]"
          style={{ top: 8, left: 8, width: 8, height: 170 }}
        />

        {/* Bot lane */}
        <div
          className="absolute bg-[#8a9a7a]"
          style={{ bottom: 8, left: 20, right: 20, height: 8 }}
        />
        <div
          className="absolute bg-[#8a9a7a]"
          style={{ top: 20, right: 8, width: 8, height: 170 }}
        />

        {/* Mid lane */}
        <div
          className="absolute bg-[#8a9a7a]"
          style={{
            width: '120%',
            height: 8,
            top: '50%',
            left: '-10%',
            transform: 'rotate(45deg) translateY(-50%)',
            transformOrigin: 'center',
          }}
        />

        {/* Blue base (bottom-left) */}
        <div
          className="absolute rounded-full"
          style={{
            width: 24,
            height: 24,
            bottom: 12,
            left: 12,
            background: 'radial-gradient(circle, #4488ff 0%, #3366cc 70%, #2244aa 100%)',
            boxShadow: '0 0 8px #4488ff',
          }}
        />

        {/* Red base (top-right) */}
        <div
          className="absolute rounded-full"
          style={{
            width: 24,
            height: 24,
            top: 12,
            right: 12,
            background: 'radial-gradient(circle, #ff4444 0%, #cc3333 70%, #aa2222 100%)',
            boxShadow: '0 0 8px #ff4444',
          }}
        />

        {/* Dragon pit */}
        <div
          className="absolute rounded-full"
          style={{
            width: 14,
            height: 14,
            top: '55%',
            left: '35%',
            background: 'radial-gradient(circle, #8844aa 0%, #663388 100%)',
            border: '1px solid #aa66cc',
          }}
        />

        {/* Baron pit */}
        <div
          className="absolute rounded-full"
          style={{
            width: 14,
            height: 14,
            top: '40%',
            left: '60%',
            background: 'radial-gradient(circle, #aa44aa 0%, #883388 100%)',
            border: '1px solid #cc66cc',
          }}
        />

        {/* Viewport rectangle */}
        {viewportRect && (
          <div
            className="absolute"
            style={{
              left: viewportRect.x,
              top: viewportRect.y,
              width: viewportRect.width,
              height: viewportRect.height,
              border: '2px solid rgba(255, 255, 255, 0.8)',
              boxShadow: '0 0 4px rgba(255, 255, 255, 0.5)',
              transition: 'left 0.05s, top 0.05s, width 0.1s, height 0.1s',
            }}
          />
        )}

        {/* Champion marker */}
        <div
          className="absolute rounded-full"
          style={{
            width: 12,
            height: 12,
            left: minimapX - 6,
            top: minimapY - 6,
            background: 'radial-gradient(circle, #00ffff 0%, #00bfff 70%)',
            border: '2px solid #ffffff',
            boxShadow: '0 0 6px #00ffff',
            transition: 'left 0.05s, top 0.05s',
          }}
        />
      </div>

      {/* Label */}
      <div
        className="absolute text-center text-xs font-medium"
        style={{
          width: MINIMAP_SIZE,
          top: -20,
          left: 0,
          color: '#c9aa71',
        }}
      >
        MINIMAP
      </div>
    </div>
  )
}
