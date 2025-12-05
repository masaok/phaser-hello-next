'use client'

import dynamic from 'next/dynamic'

const Game = dynamic(() => import('./TheGame'), {
  ssr: false,
})

export default function MarioPage() {
  return (
    <div className="w-full h-screen bg-black">
      <Game />
    </div>
  )
}
