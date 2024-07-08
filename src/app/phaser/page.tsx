'use client'

import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'

// import { WalkGame } from '@/games/WalkGame'

// This fixes "Error: HTMLVideoElement is not defined"
const PhaserLogoGame = dynamic(() => import('../../games/PhaserLogoGame'), {
  ssr: false,
})

export default function HelloPage() {
  useEffect(() => {
    function handleResize() {
      // Reload the page
      window.location.reload()
    }

    // Add resize event listener
    window.addEventListener('resize', handleResize)

    // Remove event listener on cleanup
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <div className="container">
      <main>
        <PhaserLogoGame />
      </main>
    </div>
  )
}
