'use client'

import dynamic from 'next/dynamic'

const Game = dynamic(() => import('./TheGame'), {
  ssr: false,
})

export default function LemmingsPage() {
  return (
    <div className="w-full h-screen bg-gray-900">
      <Game />
    </div>
  )
}
