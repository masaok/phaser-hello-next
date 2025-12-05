'use client'

import dynamic from 'next/dynamic'
import Link from 'next/link'

const Game = dynamic(() => import('./TheGame'), {
  ssr: false,
})

export default function MinimapDemoPage() {
  return (
    <div className="relative w-full h-screen bg-gray-900">
      <Link
        href="/league-demos"
        className="absolute top-4 left-4 z-10 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white font-bold rounded-lg transition-colors"
      >
        ← Back
      </Link>
      <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10 text-white text-center">
        <h1 className="text-xl font-bold">Minimap Demo</h1>
        <p className="text-gray-400 text-sm">Click anywhere to move around the large map</p>
      </div>
      <Game />
    </div>
  )
}
