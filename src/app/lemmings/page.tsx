'use client'

import dynamic from 'next/dynamic'
import Link from 'next/link'

const Game = dynamic(() => import('./TheGame'), {
  ssr: false,
})

export default function LemmingsPage() {
  return (
    <div className="relative w-full h-screen bg-gray-900">
      <Link
        href="/"
        className="absolute top-4 left-4 z-10 px-4 py-2 bg-red-600 hover:bg-red-500 text-white font-bold rounded-lg transition-colors"
      >
        Exit
      </Link>
      <Game />
    </div>
  )
}
