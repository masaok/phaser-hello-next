'use client'

import dynamic from 'next/dynamic'
import Link from 'next/link'

const Game3D = dynamic(() => import('./components/Game3D'), {
  ssr: false,
})

export default function Minimap3DPage() {
  return (
    <div className="fixed inset-0 overflow-hidden bg-gray-900">
      <Link
        href="/league-demos"
        className="absolute top-4 left-4 z-10 px-4 py-2 bg-gray-700/80 hover:bg-gray-600 text-white font-bold rounded-lg transition-colors backdrop-blur-sm"
      >
        ← Back
      </Link>
      <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10 text-white text-center pointer-events-none">
        <h1 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-cyan-400">
          Jinx - 3D Demo
        </h1>
        <p className="text-gray-400 text-sm">
          Click to move • Scroll to zoom • Space/Y to lock camera • Q/W/E/R for abilities
        </p>
      </div>
      <Game3D />
    </div>
  )
}
