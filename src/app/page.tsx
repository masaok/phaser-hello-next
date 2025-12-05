'use client'

import dynamic from 'next/dynamic'
import { Suspense } from 'react'

const PhaserGame = dynamic(() => import('../games/PhaserGame'), {
  ssr: false,
})

function GameLoader() {
  return (
    <div className="w-[800px] h-[600px] bg-slate-800 rounded-lg flex items-center justify-center">
      <span className="text-slate-400">Loading game...</span>
    </div>
  )
}

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8">
      <h1 className="text-4xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
        Phaser + Next.js
      </h1>
      <Suspense fallback={<GameLoader />}>
        <PhaserGame />
      </Suspense>
      <p className="mt-6 text-slate-500 text-sm">
        Built with Phaser 3.90 and Next.js 16
      </p>
    </main>
  )
}
